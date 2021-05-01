from api.model.model import Model


class Address(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.customer_id = None
        self.contact = None
        self.organization = None
        self.email = None
        self.fax = None
        self.address_line1 = None
        self.address_line2 = None
        self.address_line3 = None
        self.postcode = None
        self.region = None
        self.country = None

        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'addresses'

    @staticmethod
    def unique_fields():
        return 'id'

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
            'customer_id': 'customer_id',
            'contact': 'deliveryContact',
            'deliveryContact': 'contact',
            'organization': 'deliveryOrgName',
            'deliveryOrgName': 'organization',
            'email': 'deliveryEmail',
            'deliveryEmail': 'email',
            'fax': 'deliveryFax',
            'deliveryFax': 'fax',
            'address_line1': 'deliveryAddress1',
            'deliveryAddress1': 'address_line1',
            'address_line2': 'deliveryAddress2',
            'deliveryAddress2': 'address_line2',
            'address_line3': 'deliveryAddress3',
            'deliveryAddress3': 'address_line3',
            'postcode': 'deliveryPostcode',
            'deliveryPostcode': 'postcode',
            'region': 'deliveryRegionName',
            'deliveryRegionName': 'region',
            'country': 'deliveryCountryName',
            'deliveryCountryName': 'country'
        }
