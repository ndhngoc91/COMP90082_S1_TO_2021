import json
from decimal import Decimal
from pymysql import IntegrityError
from app.api.resource.database_base import DatabaseBase as DB


class Model:
    """
    A base class for the database models. Responsible for
    deserializing JSON objects into the specific model classes,
    and serializing the model objects back into JSON strings
    """

    def __init__(self, obj=None, pk=None):
        """
        Super constructor deserializes the input dictionary (i.e. JSON object)
        into the specific model subclass

        Params:
            obj: a JSON object (dictionary)
        """
        if obj is not None:
            attrs = self.__dict__.keys()
            for k, _ in list(obj.items()):
                if k not in attrs:
                    del obj[k]

            # self.__dict__.update(json.loads(json.dumps(obj)))
            self.__dict__.update(obj)
            for key in self.__dict__:
                if type(self.__dict__[key]) == Decimal:
                    self.__dict__[key] = float(self.__dict__[key])

                if key == 'productCode' or key == 'keyProductId':
                    if self.__dict__[key] is not None:
                        self.__dict__[key] = self.__dict__[key].rstrip()

        elif pk is not None:
            self.id = int(pk)

        else:
            return

    def json(self):
        """
        Serializes the subclass model object into a JSON string
        """
        return json.dumps(self.__dict__)
