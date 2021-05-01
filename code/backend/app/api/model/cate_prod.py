from api.model.model import Model


class CateProd(Model):
    def __init__(self, json=None, pk=None):
        self.id = None
        self.categoryId = None
        self.productId = None

        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'categoryproducts'

    @staticmethod
    def fields_mapping():
        return {
            'id': 'id',
            'categoryId': 'categoryId',
            'productId': 'productId'
        }
