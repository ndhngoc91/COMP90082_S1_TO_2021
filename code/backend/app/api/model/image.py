from api.model.model import Model


class Image(Model):
    def __init__(self, json=None, pk=None):
        self.id = 0
        self.fileName = None
        self.smallImageLocation = None
        self.mediumImageLocation = 0
        self.largeImageLocation = None
        self.threeDModelLocation = None
        self.is3DModelType = 'N'
        # Foreign Key for product.
        self.productId = None
        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'images'

    @staticmethod
    def fields_mapping():
        return {
            'id': 'id',
            'fileName': 'fileName',
            'smallImageLocation': 'smallImageLocation',
            'mediumImageLocation': 'mediumImageLocation',
            'largeImageLocation': 'largeImageLocation',
            'threeDModelLocation': 'threeDModelLocation',
            'is3DModelType': 'is3DModelType',
            'productId': 'productId'
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'smallImageLocation': self.smallImageLocation
        }
