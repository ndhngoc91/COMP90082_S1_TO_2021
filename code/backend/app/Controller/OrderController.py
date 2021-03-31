from app.Exception.exceptions import LackRequiredData, IncorrectDataType
from app.Model.OrderDetail import OrderDetail
from app.Service import OrderService as order_service
from app.Util import AuthUtil as authUtil
from app.Util.Validation import lack_keys
from flask import (
    Blueprint,
    redirect,
    request,
    jsonify,
    url_for
)
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)
order = Blueprint('order', __name__)


@order.route('/api/history', methods=['GET', 'POST'])
def retrieve_order_history():

    session_id = request.args.get('session_id')
    return jsonify(order_service.get_order_history(session_id))


@order.route('/api/orders', methods=['POST'])
def submit_order():
    root_data = request.get_json()
    # Check necessary keys on root
    required = ['customer_id', 'delivery_addr_id', 'billing_addr_id', 'lines', 'session_key']
    lacked = lack_keys(root_data, required)
    if lacked:
        raise LackRequiredData(lacked)

    lines_data = root_data.get('lines')
    if type(lines_data) is not list:
        raise IncorrectDataType('lines')
    # Check necessary keys in lines
    required = ['product_id', 'quantity']
    for line in lines_data:
        lacked = lack_keys(line, required, prefix='lines')
        if lacked:
            raise LackRequiredData(lacked)

    instructions = root_data.get('instructions', '')
    # Save the order (Submit to SQUIZZ and Store into DB)
    result_order = order_service.save_order(
        root_data['session_key'],
        root_data['customer_id'],
        root_data['delivery_addr_id'],
        root_data['billing_addr_id'],
        lines_data,
        instructions
    )

    # Line obj is OrderDetail obj
    return result_order.json(), 201


@order.route('/api/order/<order_id>', methods=['GET'])
def get_order(order_id):
    res = order_service.get_order(order_id).json()
    return res, 200
