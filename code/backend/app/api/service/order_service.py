from app.api.exception.exceptions import SquizzException
from app.api.model.order import Order
from app.api.model.organization import Organization
from app.api.model.address import Address
from app.api.model.customer import Customer
from app.api.model.order_detail import OrderDetail
from app.api.model.product import Product
from app.api.model.session import Session
from app.api.util import auth_util
from app.api.resource.order_resource import OrderResource
from app.api.resource.simple_model_resource import SimpleModelResource
from app.api.resource.product_resource import ProductResource


def get_order_history(session_id) -> dict:
    try:
        order_resource = OrderResource()
        result = order_resource.get_order_history(session_id)
    except Exception:
        result = {
            'status': 'failure',
            'data': None,
            'message': "Invalid session, please login again"
        }

    return result


def save_order(org_id, session_key, customer_id, delivery_addr_id, billing_addr_id, lines, instructions=""):
    # Retrieve objs
    sess = SimpleModelResource().find_one(Session({'sessionKey': session_key}))
    org = SimpleModelResource().get_one_by_id(Organization(pk=sess.orgId))
    cust = SimpleModelResource().get_one_by_id(Customer(pk=customer_id))
    deli = SimpleModelResource().get_one_by_id(Address(pk=delivery_addr_id))
    bill = SimpleModelResource().get_one_by_id(Address(pk=billing_addr_id))
    # Lines Info
    details_list = []
    for line in lines:
        product = SimpleModelResource().get_one_by_id(Product(pk=line['product_id']))
        ProductResource().assign_price_and_images_to_product([product])
        details = OrderDetail({
            'lineType': 'PRODUCT',
            'keyProductID': product.keyProductID,
            'productName': product.name,
            'quantity': line['quantity'],
            'unitPrice': product.price,
            'productCode': product.productCode,
            'productId': product.id
        })
        details_list.append(details)

    # Post Order to SQUIZZ to get tax info
    connection = auth_util.build_connection(org_id=org_id)
    result_code, tax_lines = connection.submit_order(org, cust, details_list)
    if result_code != 'SERVER_SUCCESS':
        raise SquizzException(f'Post order to SQUIZZ failed, code: {result_code}')
    # Assign tax info into order lines
    for idx, line in enumerate(details_list):
        tax_info = tax_lines[idx]
        line.priceTotalExTax = tax_info['priceTotalExTax']
        line.priceTotalIncTax = tax_info['priceTotalIncTax']
        line.totalPrice = line.priceTotalIncTax

    # Save order and order lines
    return OrderResource().create_order(org, cust, deli, bill, details_list, result_code, instructions)


def get_order(order_id):
    order = SimpleModelResource().get_one_by_id(Order(pk=order_id))
    lines = SimpleModelResource().find_all(OrderDetail({'orderId': order_id}))
    order.lines = lines
    return order
