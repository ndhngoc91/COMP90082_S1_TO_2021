import logging
from werkzeug.security import generate_password_hash, check_password_hash
from .database_base import DatabaseBase

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class UserResource(DatabaseBase):
    """
    A subclass of DatabaseBase, responsible for handling database
    operations regarding users

    These operations include:
        - User authentication
        - User creation
    """

    def __init__(self):
        super().__init__()

    def validate_username_password(self, username: str, password: str) -> str:
        """
        Validates the user's identity by checking the username and password.
        If their username and password are correct, then returns the customer's
        organisation ID

        Args:
            username: username (taken from user input)
            password: password (taken from user input)
        """
        query = """SELECT organizations.OrganizationId AS org_id, password 
                   FROM organizations INNER JOIN users ON organizations.id = users.OrganizationId
                   WHERE username = %s"""

        values = [username]
        try:
            result = self.run_query(query, values, False)
            if result:
                user = result[0]
                hashed_password = user['password']
                if check_password_hash(hashed_password, password):
                    logger.info("Logged in successfully")
                    return user['org_id']
                else:
                    logger.info("Incorrect username or password entered")
            else:
                logger.info(f"Could not find user '{username}'")
        except Exception as e:
            logger.error("Could validate username and password")

    def create_user(self, username: str, password: str, org_id: str):
        """
        Creates a new user in the database

        Args:
            username: username
            password: password (raw password string)
            org_id: SQUIZZ organisation ID
        """
        # TODO: (For SQ-Koala) Need to query organization table to get the record Id and then add it
        # to the user record.
        hashed_password = generate_password_hash(password)
        query = "INSERT INTO users(Username, Password, OrganizationId) VALUES (%s, %s, %s)"
        values = [username, hashed_password, org_id]
        try:
            self.run_query(query, values, True)
            logger.info(f"Successfully created new user '{username}' with organization ID '{org_id}'")
        except:
            logger.error(f"Could not insert a new record for user '{username}'")
