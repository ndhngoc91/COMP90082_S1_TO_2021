from app.exception.exceptions import SquizzException
from app.model.order import Order
from app.model.organization import Organization
from app.model.address import Address
from app.model.customer import Customer
from app.model.order_detail import OrderDetail
from app.model.product import Product
from app.model.session import Session
from app.util import auth_util as authUtil
from app.resource.order_resource import OrderResource as OR
from app.resource.simple_model_resource import SimpleModelResource as SR
from app.resource.product_resource import ProductResource as PR


def get_order_history(session_id) -> dict:
    try:
        order_resource = OR()
        result = order_resource.get_order_history(session_id)
    except Exception:
        result = {
            'status': 'failure',
            'data': None,
            'message': "Invalid session, please login again"
        }

    return result


def save_order(session_key, customer_id, delivery_addr_id, billing_addr_id, lines, instructions=""):
    # Retrieve objs
    sess = SR().find_one(Session({'sessionKey': session_key}))
    org = SR().get_one_by_id(Organization(pk=sess.orgId))
    cust = SR().get_one_by_id(Customer(pk=customer_id))
    deli = SR().get_one_by_id(Address(pk=delivery_addr_id))
    bill = SR().get_one_by_id(Address(pk=billing_addr_id))
    # Lines Info
    details_list = []
    for line in lines:
        product = SR().get_one_by_id(Product(pk=line['product_id']))
        PR().assign_price_and_images_to_product([product])
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
    connection = authUtil.build_connection()
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
    return OR().create_order(org, cust, deli, bill, details_list, result_code, instructions)


def get_order(order_id):
    order = SR().get_one_by_id(Order(pk=order_id))
    lines = SR().find_all(OrderDetail({'orderId': order_id}))
    order.lines = lines
    return order
