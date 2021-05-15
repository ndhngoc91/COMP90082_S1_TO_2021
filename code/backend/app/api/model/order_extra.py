from app.api.model.model import Model

class OrderExtra(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.order_details_id = None
        self.extra_id = None
        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'order_extras'

    @staticmethod
    def fields_mapping():
        return {
            "id": "id",
            "order_details_id": "order_details_id",
            "extra_id": "extra_id",
        }
