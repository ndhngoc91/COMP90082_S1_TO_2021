from werkzeug.exceptions import HTTPException


"""Database Exceptions"""


class NotFound(HTTPException):
    def __init__(self, obj):
        self.description = f"{type(obj).__name__} object not found."
        self.code = 404


class AlreadyExists(HTTPException):
    def __init__(self, obj):
        self.description = f"{type(obj).__name__} already exists. {obj.unique_fields()} must be unique."
        self.code = 409


class OtherException(HTTPException):
    def __init__(self, obj):
        self.description = f"Unexpected errors occurred on {type(obj).__name__}."
        self.code = 500


class ViolateFKConstraint(HTTPException):
    def __init__(self, obj):
        self.description = f"Violate Referential constraint while manipulating {type(obj).__name__}."
        self.code = 400


class MultipleRecordsFound(HTTPException):
    def __init__(self, obj):
        self.description = f"Multiple records found for {type(obj).__name__}."
        self.code = 400


class PaginationError(HTTPException):
    def __init__(self):
        self.description = f"Page number out of bounds"
        self.code = 404


"""Business Logic Exceptions"""


class LackRequiredData(HTTPException):
    """Lack required data"""
    def __init__(self, msg):
        self.description = f"Lack required data: '{msg}'."
        self.code = 400


class IncorrectDataType(HTTPException):
    def __init__(self, msg):
        self.description = f"Incorrect data type for key '{msg}'."
        self.code = 400


class SquizzException(HTTPException):
    def __init__(self, msg):
        self.description = {msg}
        self.code = 500
