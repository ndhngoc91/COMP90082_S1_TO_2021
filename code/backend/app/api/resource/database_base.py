import logging
import pymysql
from pymysql import IntegrityError
from werkzeug.exceptions import HTTPException
from app.api import config

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)


class DatabaseBase:
    """
    This class represents an abstract base class for database operations.
    It is responsible for establishing a connection to the database and
    executing SQL queries.
    """

    def __init__(self):
        # Establish a connection to the database
        self.connection = pymysql.connect(host=config.HOST,
                                          user=config.USER,
                                          password=config.PASSWORD,
                                          db=config.DB_NAME,
                                          charset='utf8mb4',
                                          cursorclass=pymysql.cursors.DictCursor,
                                          autocommit=False,
                                          read_timeout=None,
                                          write_timeout=None)

        self.cursor = self.connection.cursor()
        # self.connection.get_autocommit()

    def run_query(self, query: str, values: list, commit: bool = False):
        """
        Runs an SQL query against the MySQL database and returns the result

        Args:
            query: a MySQL query string
            values: a list of values for the query
            commit: indicates whether to commit after execution
        """
        while not self.connection.open:
            self.connection.ping(reconnect=True)
            logger.info("Reconnecting to the database")
        try:
            self.cursor.execute(query, values)
            if commit:
                self.connection.commit()
            return None if not self.cursor.rowcount else self.cursor.fetchall()
        except Exception as e:
            logger.error("Could not execute the query %s", str(e))
            self.connection.close()
            raise e

    def run_query_many(self, query: str, values: list, commit: bool = False):
        """
        Runs an SQL query against the MySQL database and returns the result

        Args:
            query: a MySQL query string
            values: a list of values for the query
            commit: indicates whether to commit after execution
        """
        while not self.connection.open:
            self.connection.ping(reconnect=True)
            logger.info("Reconnecting to the database")
        try:
            self.cursor.executemany(query, values)
            if commit:
                self.connection.commit()
            return None if not self.cursor.rowcount else self.cursor.fetchall()
        except Exception as e:
            logger.error("Could not execute the query %s", str(e))
            self.connection.close()
            raise e
    # TODO to be finalized and tested
    # def run_as_transaction(self, queries: list):
    #     """
    #     Run list of queries as a transaction,
    #     commit if no errors occurred
    #     rollback if any error occurred
    #     Args:
    #         queries: [{'query': '', 'values': [...]}, ...]
    #     """
    #     try:
    #         for each in queries:
    #             self.cursor.execute(each['query'], each['values'])
    #         self.connection.commit()
    #         self.connection.close()
    #     except Exception as e:
    #         self.connection.rollback()
    #         self.connection.close()
    #         logger.error("Could not execute the query %s", str(e))
    #         raise e
