from api.model.model import Model


class Category(Model):
    def __init__(self, json):
        self.id = 0
        self.categoryCode = None
        self.description1 = None
        self.description2 = None
        self.description3 = None
        self.description4 = None
        self.internalID = None
        self.keyCategoryID = None
        self.keyCategoryParentID = None
        self.metaDescription = None
        self.metaKeywords = None
        self.name = None
        self.ordering = 0
        self.keyProductIDs = None  # store product object
        super().__init__(json)

    @staticmethod
    def table_name():
        return 'categories'

    @staticmethod
    def fields_mapping():
        return {
            'id': 'id',
            'categoryCode': 'categoryCode',
            'description1': 'description1',
            'description2': 'description2',
            'description3': 'description3',
            'description4': 'description4',
            'internalId': 'internalID',
            'internalID': 'internalId',
            'keyCategoryId': 'keyCategoryID',
            'keyCategoryID': 'keyCategoryId',
            'keyCategoryParentId': 'keyCategoryParentID',
            'keyCategoryParentID': 'keyCategoryParentId',
            'metaDescription': 'metaDescription',
            'metaKeywords': 'metaKeywords',
            'name': 'categoryName',
            'categoryName': 'name',
            'ordering': 'ordering'
        }
