from app.model.model import Model


class User(Model):
    def __init__(self, json):
        self.id = None  # using UUID Or auto increment?
        self.org_id = None
        self.username = None
        self.password = None
        super().__init__(json)
