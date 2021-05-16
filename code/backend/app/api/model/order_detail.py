from app.api.model.model import Model

class OrderDetail(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.order_id = None
        self.package_id = None
        self.user_id = None
        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'order_details'

    @staticmethod
    def fields_mapping():
        return {
            "id": "id",
            "order_id": "order_id",
            "package_id": "package_id",
            "user_id": "user_id"
        }
