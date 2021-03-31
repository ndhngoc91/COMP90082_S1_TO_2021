from app.Model.Address import Address
from app.Model.Customer import Customer
from app.Service import CustomerService as cs
from app.Service.ProductService import restore_prices as sync_products_prices
from app.Exception.exceptions import LackRequiredData
from app.Util.Validation import lack_keys
from app.Util import AuthUtil as authUtil
from flask import (
    Blueprint,
    redirect,
    request,
    jsonify,
    url_for
)

cust = Blueprint('customer', __name__)


# TODO auth decorator (make session validation a decorator)
@cust.route('/api/switch_customer', methods=['POST'])
def switch_customer():
    data = request.get_json()
    # Check necessary keys
    required = ['customer_id']
    lacked = lack_keys(data, required)

    if lacked:
        raise LackRequiredData(lacked)

    cust_id = data.get('customer_id')
    customer = cs.get_one_customer(cust_id)

    sync_products_prices(customer.customer_code)
    return jsonify({'message': 'Switch customer successfully'}), 200


@cust.route('/api/customers', methods=['GET'])
def list_customers():
    all_customers = cs.list_all_customers()
    return jsonify([c.__dict__ for c in all_customers]), 200


@cust.route('/api/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    cust_data = data.get('customer')
    addr_data = data.get('address')

    # Check customer necessary keys
    cust_required = ['customer_code', 'title', 'first_name', 'last_name']
    cust_lacked = lack_keys(cust_data, cust_required, prefix='customer')

    if cust_lacked:
        raise LackRequiredData(cust_lacked)
    # Check customer_code
    cust_code = cust_data['customer_code']
    if cust_code not in cs.customer_codes:
        return jsonify({'message': f'Provided customer code {cust_code} does not exist'}), 404

    if cust_code not in cs.list_unused_customer_codes():
        return jsonify({'message': f'Provided customer code {cust_code} is already used'}), 409

    new_customer = Customer(cust_data)

    # Create customer only
    if addr_data is None:
        cs.create_customer(new_customer)
        return jsonify({"customer": new_customer.__dict__}), 201

    # Create customer with address
    addr_data = data['address']
    addr_required = ['contact', 'address_line1', 'address_line2', 'postcode', 'country']
    addr_lacked = lack_keys(addr_data, addr_required, prefix='address')
    if addr_lacked:
        raise LackRequiredData(addr_lacked)

    new_address = Address(addr_data)
    cs.create_customer(new_customer, new_address)
    return jsonify({'customer': new_customer.__dict__, 'address': new_address.__dict__}), 201


@cust.route('/api/customer/<customer_id>', methods=['GET'])
def get_customer(customer_id):
    return cs.get_one_customer(customer_id).json(), 200


@cust.route('/api/customer/<customer_id>', methods=['PUT'])
def update_customer(customer_id):
    data = request.get_json()
    if 'id' in data:
        del data['id']

    customer = cs.get_one_customer(customer_id)
    for key, value in data.items():
        if key in customer.__dict__:
            customer.__dict__[key] = value

    cs.update_customer(customer)
    return customer.json(), 200


@cust.route('/api/customer/<customer_id>', methods=['DELETE'])
def del_customer(customer_id):
    cs.delete_customer(customer_id)
    return jsonify({'message': f'Customer {customer_id} deleted'}), 200


@cust.route('/api/customer_codes', methods=['GET'])
def list_customers_codes():
    params = request.args
    used = params.get('used')
    if used is None:
        return jsonify(list(cs.customer_codes)), 200
    elif int(used) == 1:
        return jsonify(list(cs.list_used_customer_codes())), 200
    else:
        return jsonify(list(cs.list_unused_customer_codes())), 200


@cust.route('/api/customer/<customer_id>/addresses', methods=['POST'])
def create_address(customer_id):
    data = request.get_json()
    required = ['contact', 'address_line1', 'address_line2', 'postcode', 'country']
    lacked = lack_keys(data, required)
    if lacked:
        raise LackRequiredData(lacked)

    new_address = Address(data)
    cs.create_customer_address(customer_id, new_address)
    return new_address.json(), 201


@cust.route('/api/customer/<customer_id>/addresses', methods=['GET'])
def list_addresses(customer_id):
    cust_addresses = cs.list_customer_addresses(customer_id)
    return jsonify([addr.__dict__ for addr in cust_addresses]), 200


@cust.route('/api/customer/<customer_id>/addresses/<address_id>', methods=['PUT'])
def update_address(customer_id, address_id):
    data = request.get_json()
    if 'id' in data:
        del data['id']

    if 'customer_id' in data:
        del data['customer_id']

    address = cs.get_one_address(customer_id, address_id)
    for key, value in data.items():
        if key in address.__dict__:
            address.__dict__[key] = value

    cs.update_address(address)
    return address.json(), 200


@cust.route('/api/customer/<customer_id>/address/<address_id>', methods=['DELETE'])
def del_address(customer_id, address_id):
    cs.delete_address(customer_id, address_id)
    return jsonify({'message': f'Address {address_id} deleted'})
