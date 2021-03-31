import datetime
import logging
from .DatabaseBase import DatabaseBase

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class SessionResource(DatabaseBase):
    """
    A subclass of DatabaseBase, responsible for handling database
    operations regarding sessions
    
    These operations include:
        - Session storage
        - Session validation
        - Session deletion
    """

    def __init__(self):
        super().__init__()

    def store_session(self, username: str, session_id: str, org_id: str):
        """
        Inserts a new session record within the database

        Args:
            username: username
            session_id: a SQUIZZ session ID string
            org_id: the organisation ID of the user
        """
        # Retrieve user ID for current user from database
        userId = None
        query = "SELECT Id from users WHERE Username = %s"
        values = [username]
        try:
            result = self.run_query(query, values, False)
            if result:
                userId = result[0]['Id']
        except Exception as e:
            logger.error("Could not find user")

        search_query = "Select * from organizations where organizationId = %s"
        values = [org_id]
        try:
            result = self.run_query(search_query, values, False)
        except Exception as e:
            logger.error("Could not find organization")

        if result is not None:
            org_record_id = result[0]['id']
            # Insert new session record in 'sessions' table
            query = "INSERT INTO sessions(SessionKey, DateTime, UserId, OrganizationId) VALUES (%s, %s, %s, %s)"
            values = [
                session_id,
                datetime.datetime.now().strftime("%Y-%m-%d  %H:%M:%S"),
                userId,
                org_record_id
            ]
            try:
                self.run_query(query, values, True)
            except Exception as e:
                logger.error("Could not store session in database")

    def validate_session(self, session_id: str, org_id: str):
        """
        This method validates whether session_id exists already in the database

        Args:
            session_id: a SQUIZZ session ID string
            org_id: the organisation ID of the user
        """
        query = """SELECT count(*) as num FROM sessions join organizations 
                   on organizations.id = sessions.organizationId
                   WHERE SessionKey = %s and organizations.OrganizationId = %s"""
        values = [session_id, org_id]
        try:
            result = self.run_query(query, values, False)
            if result and result[0]['num'] > 0:
                return True
            else:
                logger.info(f"Could not find an existing session {session_id} for the given user with org_id {org_id}")
                return False
        except Exception as e:
            logger.log("Cannot validate session")

    def delete_session(self, session_id: str):
        """
        Deletes the record from the 'sessions' table corresponding
        to the given SQUIZZ session ID 

        Args:
            session_id: a SQUIZZ session ID string
        """
        query = "DELETE FROM sessions WHERE SessionKey = %s"
        values = [session_id]
        self.run_query(query, values, True)
        logger.info(f"Deleted session {session_id} from the database")