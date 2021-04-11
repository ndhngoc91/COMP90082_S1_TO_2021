from app.model.model import Model


class Session(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.sessionKey = None
        self.orgId = None
        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'sessions'

    @staticmethod
    def fields_mapping():
        return {
            'id': 'id',
            'sessionKey': 'sessionKey',
            'orgId': 'organizationId',
            'organizationId': 'orgId'
        }
