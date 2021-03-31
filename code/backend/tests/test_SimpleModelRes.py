from app.Resource.SimpleModelResource import SimpleModelResource as SR
from app.Resource.SimpleModelResource import NotFound, AlreadyExists, ViolateFKConstraint
from app.Model.Customer import Customer as C
from app.Model.Address import Address as Addr
import pytest

new_customer_id = 0
new_address_id = 0
current_customer_number = len(SR().list_all(C))

"""
Run this Test as a whole, do not run them separately
"""


def test_create():
    global new_customer_id, new_address_id
    sr = SR()

    new_customer = C({
        'customer_code': 'Test1',
        'title': 'Miss',
        'organization_desc': 'holySAS',
        'first_name': 'b1LL',
        'last_name': 'ZX',
        'phone': '0123456789',
        'email': '233456@123.com'
    })

    new_address = Addr({
        'contact': '9876541230',
        'address_line1': 'Unit 5',
        'address_line2': 'Ss Ave, Caulfield, VIC',
        'postcode': 'VIC0000',
        'region': 'Victoria',
        'country': 'Australia'
    })

    cust_result = sr.insert(new_customer)
    new_customer_id = new_customer.id
    new_address.customer_id = new_customer_id
    addr_result = sr.insert(new_address)
    new_address_id = new_address.id

    assert cust_result.id == new_customer_id
    assert cust_result.last_name == 'ZX'
    assert addr_result.id == new_address_id
    assert addr_result.customer_id == new_address.customer_id == new_customer_id
    assert addr_result.postcode == 'VIC0000'
    with pytest.raises(AlreadyExists):
        sr.insert(new_customer)

    # Violate referential integrity
    bad_address = Addr({
        'customer_id': 0,
        'contact': '9876541230',
        'address_line1': 'Unit 5',
        'address_line2': 'Ss Ave, Caulfield, VIC',
        'postcode': 'VIC0000',
        'region': 'Victoria',
        'country': 'Australia'
    })

    with pytest.raises(ViolateFKConstraint):
        sr.insert(bad_address)


def test_get_all():
    ret_objs = SR().list_all(C)

    assert len(ret_objs) == 1 + current_customer_number
    assert ret_objs[-1].customer_code == 'Test1'


def test_get_one_by_id():
    ret_obj = SR().get_one_by_id(C(pk=new_customer_id))

    assert ret_obj.id == new_customer_id
    assert ret_obj.customer_code == 'Test1'
    with pytest.raises(NotFound):
        SR().get_one_by_id(C(pk=0))


def test_update():
    customer = SR().get_one_by_id(C(pk=new_customer_id))
    customer.title = 'Mrs'
    customer.customer_code = 'TestNew'
    SR().update(customer)
    updated_customer = SR().get_one_by_id(C(pk=new_customer_id))

    assert updated_customer.title == 'Mrs'
    assert updated_customer.customer_code == 'TestNew'
    assert updated_customer.phone == '0123456789'
    with pytest.raises(NotFound):
        SR().get_one_by_id(C(pk=0))


def test_delete():
    del_obj = C(pk=new_customer_id)
    SR().delete(del_obj)

    assert len(SR().list_all(C)) == current_customer_number
    with pytest.raises(NotFound):
        SR().get_one_by_id(del_obj)
    with pytest.raises(NotFound):
        SR().get_one_by_id(C(pk=0))
    with pytest.raises(NotFound):
        SR().get_one_by_id(Addr(pk=new_address_id))
