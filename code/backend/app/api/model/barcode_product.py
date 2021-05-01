from app.api.model.model import Model


class BarcodeProduct(Model):
    def __init__(self, json):
        self.productName = None
        self.productCode = None
        self.keyProductID = None
        self.price = 0
        self.imageList = None
        super().__init__(json)
