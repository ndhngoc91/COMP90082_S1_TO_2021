from api.model.model import Model


class SellUnit(Model):
    def __init__(self, json):
        self.id = 0
        self.baseQuantity = None
        self.isBaseUnit = None
        self.isPricedOffBaseUnit = None
        self.keySellUnitID = None
        self.keySellUnitParentID = None
        self.sellUnitCode = None
        self.sellUnitLabel = None
        super().__init__(json)
