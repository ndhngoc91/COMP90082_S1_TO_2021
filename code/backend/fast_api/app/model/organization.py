from app.model.model import Model


class Organization(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.orgId = None
        self.apiOrgKey = None
        self.apiOrgPassword = None
        self.supplierOrgId = None
        self.accountCode = None
        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'organizations'

    @staticmethod
    def fields_mapping():
        return {
            'id': 'id',
            'orgId': 'organizationId',
            'organizationId': 'orgId',
            'apiOrgKey': 'apiOrganizationKey',
            'apiOrganizationKey': 'apiOrgKey',
            'apiOrgPassword': 'apiOrganizationPassword',
            'apiOrganizationPassword': 'apiOrgPassword',
            'accountCode': 'accountCode',
            'supplierOrgId': 'supplierOrganizationId',
            'supplierOrganizationId': 'supplierOrgId'
        }
