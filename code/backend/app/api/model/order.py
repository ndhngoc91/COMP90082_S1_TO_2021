from api.model.model import Model


class Order(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.keyPurchaseOrderID = None
        self.organizationId = None
        self.keySupplierAccountID = None
        self.createdDate = None
        self.instructions = None
        self.deliveryOrgName = None
        self.deliveryContact = None
        self.deliveryEmail = None
        self.deliveryAddress1 = None
        self.deliveryAddress2 = None
        self.deliveryAddress3 = None
        self.deliveryRegionName = None
        self.deliveryCountryName = None
        self.deliveryPostcode = None
        self.billingContact = None
        self.billingOrgName = None
        self.billingEmail = None
        self.billingAddress1 = None
        self.billingAddress2 = None
        self.billingAddress3 = None
        self.billingRegionName = None
        self.billingCountryName = None
        self.billingPostcode = None
        self.isDropship = None
        self.lines = None  # store order detail object
        self.session_id = None
        self.billStatus = None
        self.customer_id = None
        super().__init__(json, pk)
        if self.createdDate is not None:
            self.createdDate = self.createdDate.strftime("%Y-%m-%d  %H:%M:%S")

    @staticmethod
    def table_name():
        return 'orders'

    @staticmethod
    def fields_mapping():
        return {
            'id': 'id',
            'organizationId': 'organizationId',
            'createdDate': 'createdOnDate',
            'createdOnDate': 'createdDate',
            'instructions': 'instructions',
            'deliveryOrgName': 'deliveryOrganizationName',
            'deliveryOrganizationName': 'deliveryOrgName',
            'deliveryContact': 'deliveryContact',
            'deliveryEmail': 'deliveryEmail',
            'deliveryAddress1': 'deliveryAddress1',
            'deliveryAddress2': 'deliveryAddress2',
            'deliveryAddress3': 'deliveryAddress3',
            'deliveryRegionName': 'deliveryRegionName',
            'deliveryCountryName': 'deliveryCountryName',
            'deliveryPostcode': 'deliveryPostcode',
            'billingOrgName': 'billingOrganizationName',
            'billingOrganizationName': 'billingOrgName',
            'billingContact': 'billingContact',
            'billingEmail': 'billingEmail',
            'billingAddress1': 'billingAddress1',
            'billingAddress2': 'billingAddress2',
            'billingAddress3': 'billingAddress3',
            'billingRegionName': 'billingRegionName',
            'billingCountryName': 'billingCountryName',
            'billingPostcode': 'billingPostcode',
            'isDropship': 'isDropship',
            'billStatus': 'billStatus',
            'customer_id': 'customer_id'
        }

    def json(self):
        if self.lines is not None:
            lines = [line.__dict__ for line in self.lines]
            self.lines = lines

        return super().json()
