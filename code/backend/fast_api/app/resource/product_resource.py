import logging
from collections import defaultdict

import math
from app import config
from app.exception.exceptions import OtherException, PaginationError
from app.resource.database_base import DatabaseBase
from app.resource.simple_model_resource import SimpleModelResource as SR
from app.model.price import Price
from app.model.product import Product
from app.model.image import Image
from typing import List

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class ProductResource(DatabaseBase):
    """
    A subclass of DatabaseBase, responsible for handling database
    operations regarding products

    These operations include:
        - Product insertion
        - Product price insertion
        - Retrieving product details for a given barcode
        - Retrieveing product details for a given Product ID
        - Batch synchronizing product data from the SQUIZZ platform
        - Batch synchronizing product prices from the SQUIZZ platform
    """

    def __init__(self):
        super().__init__()

    # Insert the products in the 'Products' table. Used when Importing the data from the SQUIZZ organization / supplier
    def store_products(self, product_list: List[Product]):

        insert_query = """INSERT INTO products (KeyProductId, Barcode, BarcodeInner, Description1, Description2, Description3, Description4, 
                           InternalId, Brand, Height, Depth, Width, Weight, Volume, ProductCondition, IsPriceTaxInclusive, IsKitted, KeyTaxcodeId,
                           StockQuantity, ProductName, KitProductsSetPrice, ProductCode, ProductSearchCode, StockLowQuantity, AverageCost, ProductDrop,
                           PackQuantity, SupplierOrganizationId, KeySellUnitID)                       
                           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

        failed_to_store = []

        for product in product_list:
            try:
                values = [
                    product.keyProductID,
                    product.barcode,
                    product.barcodeInner,
                    product.description1,
                    product.description2,
                    product.description3,
                    product.description4,
                    product.internalID,
                    product.brand,
                    product.height,
                    product.depth,
                    product.width,
                    product.weight,
                    product.volume,
                    product.productCondition,
                    product.isPriceTaxInclusive,
                    product.isKitted,
                    product.keyTaxcodeID,
                    product.stockQuantity,
                    product.name,
                    product.kitProductsSetPrice,
                    product.productCode,
                    product.productSearchCode,
                    product.stockLowQuantity,
                    product.averageCost,
                    product.drop,
                    product.packQuantity,
                    config.SUPPLIER_ORG_ID,
                    product.keySellUnitID
                ]

                self.run_query(insert_query, values, True)

            except Exception as e:
                logger.error("exception %s", e)
                failed_to_store.append(product.keyProductID + "error: " + str(e))

        logger.info('completed store_products')
        result = {
            'status': "success",
            'message': "successfully stored products",
            'data': {
                'failed': failed_to_store
            },
        }

        return result

    # Insert the products prices in the 'Prices' table. Used when Importing the data from
    # the SQUIZZ organization / supplier
    # todo: (For SQ-Koala) we can't just add prices, we need to know the customer as well for which we are
    #  adding the price for now its only for single record (only 1 customer).
    def store_prices(self, price_list: List[Price]):
        insert_query = """INSERT INTO prices (KeyProductId, keySellUnitID, Price, ReferenceId, 
                          ReferenceType, ProductId) 
                          VALUES (%s, %s, %s, %s, %s, %s)"""

        # Get the Product from the Products table, as we need to insert the record ID
        # when adding the data to Price Table
        search_query = "SELECT * FROM products WHERE keyProductID=%s"

        failed_to_store = []

        for price in price_list:
            # First, search in the product table to check whether this product exists.
            # If not, skip this record and continue. Otherwise, it may cause foreign key
            # constraint issue
            product_record = None
            try:
                product_record = self.run_query(search_query, price.keyProductID, False)
            except Exception as e:
                logger.error('Exception occurred when searching for product record in store_product_level method. %s',
                             e)

            if product_record is not None:
                # Since we already checked the existence of the product, we could do the insertion.
                try:
                    values = [
                        price.keyProductID,
                        price.keySellUnitID,
                        price.price,
                        price.referenceID,
                        price.referenceType,
                        product_record[0]['id']
                    ]
                    self.run_query(insert_query, values, True)
                except Exception as e:
                    logger.error("Exception", e)
                    failed_to_store.append(price.keyProductID + "error: " + str(e))
            else:
                failed_to_store.append(price.keyProductID + " error:" + " product does not exist")

        logger.info('completed store_prices')
        result = {
            'status': 'success',
            'message': 'successfully stored product prices',
            'data': {
                'failed': failed_to_store
            }
        }
        return result

    def get_product_by_barcode(self, barcode):

        search_query = """SELECT products.id, products.barcode, products.productName, products.keyTaxcodeID,
                          products.productCode, prices.keyProductID, prices.price 
                          FROM products JOIN prices ON products.id = prices.Productid 
                          WHERE products.Barcode = %s"""
        values = [barcode]
        product_record = self.run_query(search_query, values, False)
        if product_record is None:
            return None
        return product_record[0]

    def get_product_by_product_code(self, productCode):
        search_query = """SELECT products.id, products.barcode, products.productCode, products.productName,
                          prices.keyProductID, prices.price, products.description1, products.description2, products.keyTaxcodeID, products.stockQuantity
                          FROM products JOIN prices ON products.id = prices.productId
                          WHERE products.productCode = %s"""
        values = [productCode]
        product_record = self.run_query(search_query, values, False)
        if product_record is None:
            return None
        return product_record[0]

    def get_product_id_by_product_code(self, productCode):
        search_query = """SELECT id 
                          FROM products
                          WHERE productCode = %s"""
        values = [productCode]
        product_record = self.run_query(search_query, values, False)
        logger.debug(product_record)
        if product_record is None:
            return None
        return product_record[0]['id']

    def search_product_id_by_product_code(self, productCode):
        search_query = """SELECT id 
                          FROM products
                          WHERE productCode like %s"""
        values = '%' + productCode + '%'
        product_record = self.run_query(search_query, values, False)
        if product_record is None:
            return None
        return product_record

    def get_product_images_by_id(self, productId):
        if isinstance(productId, list):
            search_image_query = """Select * From images where productId IN %s """
            values = [str(tuple(productId))]
        else:
            search_image_query = """Select * From images where productId = %s """
            values = [productId]
        image_records = self.run_query(search_image_query, values, False)
        return image_records

    # This method is used to update the products that are stored in the database. Updated product infromation is fetched
    # from the SQUIZZ API.
    def update_products(self, product_list: List[Product]):
        """
        Takes as input the retrieved product data from SQUIZZ API, then
        synchronises the data with the current records stored in the database.
        If they are not identical, it will update the product information
        to the latest one.

        Args:
            product_list: list of Product objects created from data retrieved from SQUIZZ API
        """
        value_not_inserted = 0
        value_inserted = 0

        # the primary keys of the product table is 'id' which is automatically generated by local database, can not
        # included in the json_value. Therefore, we use the 'keyProductID' to do the query
        failed_to_store = []
        for product in product_list:
            search_query = "SELECT * FROM products WHERE keyProductID = %s"
            result = None
            try:
                # Will always return 1 result as the there is a uniqueness constraint on the KeyProductId column
                search_result = self.run_query(search_query, product.keyProductID, False)
                result = search_result[0]
            except Exception as e:
                value_not_inserted += 1
                logger.error('Exception occurred when searching for record in update product session', e)
                failed_to_store.append(product.keyProductID + " error:" + " product does not exist")

            if not result:
                logger.error('Got no corresponding record, insert a new record.')

                # Pass the result to the Store_product method and it will add the entry to the database
                self.store_products([product])
                value_inserted += 1
            else:
                latest_record = [
                    product.barcode,
                    product.barcodeInner,
                    product.description1,
                    product.description2,
                    product.description3,
                    product.description4,
                    product.internalID,
                    product.brand,
                    product.height,
                    product.depth,
                    product.width,
                    product.weight,
                    product.volume,
                    product.productCondition,
                    product.isPriceTaxInclusive,
                    product.isKitted,
                    product.keyTaxcodeID,
                    product.stockQuantity,
                    product.name,
                    product.kitProductsSetPrice,
                    product.productCode,
                    product.productSearchCode,
                    product.stockLowQuantity,
                    product.averageCost,
                    product.drop,
                    product.packQuantity,
                    config.SUPPLIER_ORG_ID,
                    product.keySellUnitID,
                    product.keyProductID
                ]

                # We are going to update entire product. Since, we are not using ORM, this is ideal way
                # needs to be updated or not. So to avoid loss of data, just update the entire record
                # Since the Id is not auto-incremented, we won't update that, but update other things.
                update_query = """ UPDATE products SET Barcode = %s, BarcodeInner = %s, Description1  = %s, 
                                    Description2 = %s, Description3 = %s, Description4 = %s, InternalId = %s, Brand = %s, 
                                    Height = %s, Depth = %s, Width = %s, Weight = %s, Volume = %s, ProductCondition = %s, 
                                    IsPriceTaxInclusive = %s, IsKitted = %s, KeyTaxcodeId = %s, StockQuantity = %s, ProductName = %s, 
                                    KitProductsSetPrice = %s, ProductCode = %s, ProductSearchCode = %s, StockLowQuantity = %s, 
                                    AverageCost = %s, ProductDrop = %s, PackQuantity = %s, SupplierOrganizationId = %s, KeySellUnitID = %s
                                    WHERE keyProductID = %s"""

                try:
                    self.run_query(update_query, latest_record, True)
                    value_inserted += 1
                except Exception as e:
                    self.connection.rollback()
                    logger.error('Exception occurred when updating product table', e)
                    value_not_inserted += 1
                    failed_to_store.append(
                        product.keyProductID + " error:" + " error occurred while updating: " + str(e))

        self.connection.close()
        logger.info('This is the value updated: %d' % value_inserted)
        logger.info('This is the value not updated: %d' % value_not_inserted)
        result = {'status': "success", 'data': {'failed': failed_to_store}, 'message': "successfully updated products"}
        logger.info('Successfully synchronized latest products data from the SQUIZZ API')
        return result

    # This method is used to update the prices for the product that we have in the database.
    # The price information is fetched from the SQUIZZ API.
    # todo: we can't just update the price, we need to know the customer as well for which we are chaning the price
    #  for now its only for single record.
    def update_prices(self, price_list: List[Price]):
        """
        Updates the 'price_level' table in the database. It compares the
        retrieved price data from the SQUIZZ API with data in the application
        database. If they are identical, it only updates datetime. otherwise,
        the entire record will be updated.

        Args:
            price_list: list of Price objects created from data retrieved from SQUIZZ API
        """
        failed_to_store = []
        for price in price_list:
            search_query = "SELECT * FROM prices WHERE keyProductID = %s"
            try:
                # todo: this will not be a single result, if we are talking about pricing for multiple customers
                result_all = self.run_query(search_query, price.keyProductID, False)

                # Call the method to add the price in the table if it doesn't exit
                # Note: this will only update the price if the product exists in the first place.
                if result_all is None:
                    self.store_prices([price])
                else:
                    # we are not going to update the KeyProductID. So don't add that
                    latest_values = [
                        price.keySellUnitID,
                        price.price,
                        price.referenceID,
                        price.referenceType,
                        price.keyProductID
                    ]

                    update_query = """UPDATE prices SET keySellUnitID = %s, Price = %s, ReferenceId = %s, 
                                      ReferenceType = %s WHERE keyProductID = %s"""
                    try:
                        self.run_query(update_query, latest_values, True)
                    except Exception as e:
                        self.connection.rollback()
                        logger.error('Exception occurred when updating the latest price info', e)
                        failed_to_store.append(price.keyProductID + "error:" + "failed to update price")

            except Exception as e:
                logger.error('Exception occurred when search price in price_level', e)
                failed_to_store.append(price.keyProductID + "error:" + "failed to update price")

        logger.info("Successfully updated 'price_level' table")
        result = {
            'status': "success",
            'message': "successfully updated product prices",
            'data': {
                'failed': failed_to_store
            },
        }
        return result

    def search_products(self, identifier, identifierType):
        """
        Retrieves a list of product codes (or barcodes) from the database
        that are syntactially similar to the given identifier

        Args:
            identifier: a potential product code or barcode
            identifierType: 'barcode' or 'productCode'
        Returns:
            list of similar 'identifiers'
        """

        query = f"SELECT {identifierType} FROM products WHERE {identifierType} LIKE '{identifier + '%'}'"
        logger.debug(query)
        similar = self.run_query(query, None, False)

        return None if not similar else similar

    def list_products_by_category(self, category_id, page=None, page_size=None):
        count = 0
        if page is None:
            paging_str = ''
        else:
            # paging_str = f'LIMIT {(page - 1) * page_size}, {page_size}'
            paging_str = f'OFFSET {(page - 1) * page_size} LIMIT {page_size}'
            if category_id is not None:
                count_query = f'SELECT COUNT(DISTINCT productId) as count FROM categoryproducts\
                                WHERE categoryId = {category_id}'
            else:
                count_query = f'SELECT COUNT(*) as count FROM products'
            count = self.run_query(count_query, [], False)[0]['count']
            total_pages = math.ceil(count / page_size)
            if total_pages == 0:
                total_pages = 1
            if page > total_pages or page < 1:
                raise PaginationError()

        if category_id is None:
            prod_query = f'SELECT products.* FROM products {paging_str}'
        else:
            prod_query = f'SELECT products.* FROM products WHERE products.id IN (\
	                    SELECT productId FROM categoryproducts WHERE categoryId = {category_id}\
                        ) {paging_str}'

        try:
            products = self.run_query(prod_query, [], False)
            products = [] if products is None else products
            items = []
            for p in products:
                model = SR.to_model(Product, p)
                items.append(model)
            if page is None:
                return items
            else:
                return {
                    "total_pages": total_pages, "total_items": count,
                    "page_num": page, "page_items": len(items),
                    "items": items
                }
        except Exception as e:
            self.cursor.close()
            logger.error('Exception occurred when retrieving products by category %s', e)
            # raise e
            raise OtherException(Product())

    def assign_price_and_images_to_product(self, products: list):
        """
        Retrieve prices for products by product id
        Notices: Some of the products have 2 prices, pick the "Contract" price
                    where the referenceType is "C"

        :param products: list of products
        :return: None
        """
        product_ids = ','.join([str(p.id) for p in products])
        price_query = f'SELECT productId, price, referenceType FROM {Price.table_name()} \
                    WHERE productId IN ({product_ids})\
                    ORDER BY referenceType DESC'

        image_query = f'SELECT * FROM {Image.table_name()} \
                    WHERE productId IN ({product_ids})'

        try:
            prices = self.run_query(price_query, [], False)
            images = self.run_query(image_query, [], False)
            price_dict = {}
            image_dict = defaultdict(list)

            # Pair productId, price
            for price in prices:
                if price['productId'] not in price_dict:
                    price_dict[price['productId']] = float(price['price'])

            # Pair productId, images
            if images is not None:
                for image in images:
                    image_obj = SR.to_model(Image, image)
                    image_dict[image['productId']].append(image_obj)

            for product in products:
                product.price = price_dict.get(product.id, None)
                product.imageList = image_dict.get(product.id, [])

        except Exception as e:
            logger.error('Exception occurred when retrieving prices for products %s', e)
        pass
