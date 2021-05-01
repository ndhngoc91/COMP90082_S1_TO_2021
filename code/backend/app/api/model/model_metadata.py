from api.model.model import Model


class ModelMetadata(Model):
    def __init__(self, json):
        self.id = None
        self.productId = None
        self.productCode = None
        self.metaJsonString = None
        super().__init__(json)
