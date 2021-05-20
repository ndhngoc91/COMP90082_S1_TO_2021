import logging
import datetime

from app.api.resource.simple_model_resource import SimpleModelResource as SR
from app.api.model.order import Order
from app.api.model.order_detail import OrderDetail
from app.api.model.order_extra import OrderExtra

from typing import List


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class OrderResource(SR):
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
                    logger.error(
                        f'Could not retrieve order details for order ID {order_id}')

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

    def create_order(self, packages: List[Order]):
        """Create an order for the provided customer"""
        new_order = Order()

        new_order.user_id = packages[0].user_id
        new_order.start_date = packages[0].start_date
        new_order.end_date = packages[0].end_date
        new_order.description = None
        new_order.is_drop_ship = "N"
        new_order.is_pending = "Y"

        order_id_query = "SELECT max(id) from orders"
        order_detail_id_query = "SELECT max(id) from order_details"

        # Create Order
        sr = SR()
        failed_to_store = []

        try:
            sr.insert(new_order, True)

            order_id = self.run_query(
                order_id_query,
                [],
                True)[0]["max(id)"]
        except Exception as e:
            failed_to_store.append("error: " + str(e))
            return failed_to_store

        # create order detail
        new_order_detail = OrderDetail()
        new_order_extra = OrderExtra()
        details_id = []
        for package in packages:
            new_order_detail.order_id = order_id
            new_order_detail.package_id = package.package_id
            new_order_detail.user_id = package.user_id
            try:
                sr.insert(new_order_detail, True)
            except Exception as e:
                failed_to_store.append("error: " + str(e))
                return failed_to_store
            order_details_id = self.run_query(
                order_detail_id_query,
                [],
                True)[0]["max(id)"]
            details_id.append(order_details_id)

            # create order extra
            for extra in package.extras:

                new_order_extra.order_details_id = order_details_id
                new_order_extra.extra_id = extra
                try:
                    sr.insert(new_order_extra, True)
                except Exception as e:
                    failed_to_store.append("error: " + str(e))
                    return failed_to_store

        result = {
            'status': "success",
            'message': "successfully stored packages",
            'data': {
                'failed': failed_to_store
            },
            'inserted_order_id': details_id

        }
        return result
