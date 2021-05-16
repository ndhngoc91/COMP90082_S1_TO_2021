from app.api.model.model import Model


class Order(Model):
    def __init__(self, json=None, pk=None):
        # order id
        self.id = None
        self.user_id = None
        self.start_date = None
        self.end_date = None
        self.description = None
        self.is_drop_ship = None
        self.is_pending = None

        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'orders'

    @staticmethod
    def fields_mapping():
        return {
            # order id
            "id": "id",
            "user_id": "user_id",
            "start_date": "start_date",
            "end_date": "end_date",
            "description": "description",
            "is_drop_ship": "is_drop_ship",
            "is_pending": "is_pending"

        }
