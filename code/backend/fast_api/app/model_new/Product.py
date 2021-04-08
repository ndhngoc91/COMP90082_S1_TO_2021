# from app.Model.SellUnit import SellUnit
# from typing import List, Optional
#
# from pydantic import BaseModel
#
#
# class ProductBase(BaseModel):
#     title: str
#     description: Optional[str] = None
#
#
# class ProductCreate(ProductBase):
#     pass
#
#
# class Product(ProductBase):
#     id: int = 0
#     barcode: str = None
#     barcodeInner: str = None
#     description1: str = None
#     description2: str = None
#     description3: str = None
#     description4: str = None
#     height: float = 0
#     internalID: str = None
#     brand: str = None
#     depth: float = 0
#     weight: float = 0
#     volume: float = 0
#     isKitted: enumerate("Y", "N")
#     isPriceTaxInclusive: enumerate("Y", "N")
#     productCondition: str = None
#     keyProductID: str = None
#     keySellUnitID: str = None
#     keyTaxcodeID: str = None
#     kitProductsSetPrice: str = None
#     name: str = None
#     productCode: str = None
#     productName: str = None
#     productSearchCode: str = None
#     averageCost: float = 0
#     drop: str = None
#     packQuantity: = 0
#     sellUnits: str = None
#     stockLowQuantity: float = 0
#     stockQuantity: float = 0
#     width: float = 0
#     categoryList: Category  # store category object
#     priceList: Price  # store price object
#     sellUnitsIdList: SellUnit  # sell the SellUnitIds (new table)
#     imageList: List[Image]  # List to store the images associated with the product
#     supplierOrganizationId: str = None
#     price: str = None
#
#     class Config:
#         orm_mode = True
