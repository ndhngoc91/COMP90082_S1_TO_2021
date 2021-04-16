import logging
from app.model.customer import Customer
from app.resource.database_base import DatabaseBase

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class CustomerResource(DatabaseBase):
    """
    A subclass of DatabaseBase, responsible for handling customer information
    related db operations

    These operations include:
        - Search customers based name or email
    """

    def __init__(self):
        super().__init__()

    def search(self, query):
        return []
