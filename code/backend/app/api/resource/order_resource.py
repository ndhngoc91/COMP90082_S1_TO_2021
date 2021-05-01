import logging
import datetime
from api.model.address import Address
from api.model.customer import Customer
from api.model.organization import Organization
from api.resource.database_base import DatabaseBase
from api.resource.simple_model_resource import SimpleModelResource as SR
from api.model.order import Order
from api.model.order_detail import OrderDetail

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class OrderResource(DatabaseBase):
    """
    A subclass of DatabaseBase, responsible for handling database
    operations regarding orders

    These operations include:
        - Storing a purchase made on SQUIZZ in the database
        - Retrieving order history
    """

    def __init__(self):
        super().__init__()

    def get_order_history(self, session_id):
        """
        This method will return all order records from the database

        Args:
            session_id: session ID of current authenticated user
        """
        # Search the user organization ID based on session ID from sessions table
        organizationId = None
        search_query = """SELECT organizations.id AS org_id 
                          FROM sessions INNER JOIN organizations
                          ON organizations.Id = sessions.OrganizationId
                          WHERE sessionKey=%s"""
        try:
            result = self.run_query(search_query, [session_id], False)
            if result:
                organizationId = result[0]['org_id']

        except Exception as e:
            self.connection.rollback()
            logger.error(f'Could not find session with ID {session_id}', e)
            result = {
                'status': 'error',
                'orders': None,
                'message': 'Invalid session, please try login again'
            }
            return result

        # Retrieve the organization's previous 50 orders
        search_query = """SELECT * FROM orders WHERE organizationId = %s
                          ORDER BY createdOnDate DESC LIMIT 50"""

        values = [organizationId]
        try:
            # For each order, get associated order detail records
            orders = self.run_query(search_query, values, False)
            for order in orders:
                order_id = order['id']
                search_query = "SELECT * FROM orderdetails WHERE OrderId = %s"
                values = [order_id]
                try:
                    order_details = self.run_query(search_query, values, False)
                    order['lines'] = order_details
                except Exception as e:
                    logger.error(f'Could not retrieve order details for order ID {order_id}')

            result = {
                'status': 'success',
                'message': 'Successfully retrieved order history',
                'orders': orders
            }
        except:
            logger.error('Could not retrieve order history')
            result = {
                'status': 'error',
                'orders': None,
                'message': 'Exception occurred when retrieving order history'
            }

        return result

    def create_order(self, org: Organization, customer: Customer, delivery: Address, billing: Address,
                     order_details_list: [OrderDetail], status, instructions=""):
        """Create an order for the provided customer"""
        new_order = Order()
        new_order.organizationId = org.id
        new_order.createdDate = datetime.datetime.now().strftime("%Y-%m-%d  %H:%M:%S"),
        new_order.instructions = instructions
        new_order.deliveryOrgName = delivery.organization
        new_order.deliveryContact = delivery.contact
        new_order.deliveryEmail = delivery.email
        new_order.deliveryAddress1 = delivery.address_line1
        new_order.deliveryAddress2 = delivery.address_line2
        new_order.deliveryAddress3 = delivery.address_line3
        new_order.deliveryRegionName = delivery.region
        new_order.deliveryCountryName = delivery.country
        new_order.deliveryPostcode = delivery.postcode
        new_order.billingContact = billing.contact
        new_order.billingOrgName = billing.organization
        new_order.billingEmail = billing.email
        new_order.billingAddress1 = billing.address_line1
        new_order.billingAddress2 = billing.address_line2
        new_order.billingAddress3 = billing.address_line3
        new_order.billingRegionName = billing.region
        new_order.billingCountryName = billing.country
        new_order.billingPostcode = billing.postcode
        new_order.billStatus = status
        new_order.customer_id = customer.id

        # Create Order and Related Order lines
        sr = SR()
        try:
            sr.insert(new_order, False)
            for line in order_details_list:
                line.orderId = new_order.id
                sr.insert(line, False)

        except Exception as e:
            sr.connection.rollback()
            sr.cursor.close()
            raise e
        else:
            sr.connection.commit()
            sr.cursor.close()
            new_order.lines = order_details_list
            return new_order
