from api.model.model import Model


class Customer(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.customer_code = None
        self.title = None
        self.first_name = None
        self.last_name = None
        self.phone = None
        self.email = None
        self.nationality_code = None
        self.organization_desc = None

        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'customers'

    @staticmethod
    def unique_fields():
        return 'id, customer_code'

    @staticmethod
    def fields_mapping():
        """
        model field mapping
        eg. if customer.a_bc maps abc in customers tables
            then write two kv pairs in the mapping dictionary
            { "a_bc": "abc", "abc": "a_bc", ... }
            otherwise write one kv pair for each field

        """
        return {
            'id': 'id',
            'customer_code': 'customer_code',
            'title': 'title',
            'first_name': 'first_name',
            'last_name': 'last_name',
            'phone': 'phone',
            'email': 'email',
            'nationality_code': 'nationality_code',
            'organization_desc': 'organization_desc'
        }
