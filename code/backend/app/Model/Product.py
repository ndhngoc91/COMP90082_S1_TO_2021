from app.Model.Model import Model


class Product(Model):
    def __init__(self, json=None, pk=None):
        self.id = 0
        self.barcode = None
        self.barcodeInner = None
        self.description1 = None
        self.description2 = None
        self.description3 = None
        self.description4 = None
        self.height = 0
        self.internalID = None
        self.brand = None
        self.depth = 0
        self.weight = 0
        self.volume = 0
        self.isKitted = None
        self.isPriceTaxInclusive = None
        self.productCondition = None
        self.keyProductID = None
        self.keySellUnitID = None
        self.keyTaxcodeID = None
        self.kitProductsSetPrice = None
        self.name = None
        self.productCode = None
        self.productName = None
        self.productSearchCode = None
        self.averageCost = None
        self.drop = None
        self.packQuantity = None
        self.sellUnits = None
        self.stockLowQuantity = 0
        self.stockQuantity = 0
        self.width = 0
        self.categoryList = None  # store category object
        self.priceList = None  # store price object
        self.sellUnitsIdList = None  # sell the SellUnitIds (new table)
        self.imageList = []  # List to store the images associated with the product
        self.supplierOrganizationId = None
        self.price = None
        super().__init__(json, pk)

    @staticmethod
    def table_name():
        return 'products'

    @staticmethod
    def fields_mapping():
        return {
            'id': 'id',
            'barcode': 'barcode',
            'barcodeInner': 'barcodeInner',
            'description1': 'description1',
            'description2': 'description2',
            'description3': 'description3',
            'description4': 'description4',
            'height': 'height',
            'internalId': 'internalID',
            'internalID': 'internalId',
            'brand': 'brand',
            'depth': 'depth',
            'weight': 'weight',
            'width': 'width',
            'volume': 'volume',
            'isKitted': 'isKitted',
            'isPriceTaxInclusive': 'isPriceTaxInclusive',
            'productCondition': 'productCondition',
            'keyProductID': 'keyProductId',
            'keyProductId': 'keyProductID',
            'keySellUnitID': 'keySellUnitID',
            'keyTaxcodeId': 'keyTaxcodeID',
            'keyTaxcodeID': 'keyTaxcodeId',
            'kitProductsSetPrice': 'kitProductsSetPrice',
            'productCode': 'productCode',
            'name': 'productName',
            'productName': 'name',
            'productSearchCode': 'productSearchCode',
            'averageCost': 'averageCost',
            'drop': 'productDrop',
            'productDrop': 'drop',
            'packQuantity': 'packQuantity',
            'selfLowQuantity': 'selfLowQuantity',
            'stockLowQuantity': 'stockLowQuantity',
            'stockQuantity': 'stockQuantity',
            'supplierOrganizationId': 'supplierOrganizationId'
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'barcode': self.barcode,
            'name': self.name,
            'productCode': self.productCode,
            'price': self.price,
            'image': [image.__dict__ for image in self.imageList]
        }

    def json(self):
        if self.imageList is not None:
            self.imageList = [image.__dict__ for image in self.imageList]

        return super().json()
