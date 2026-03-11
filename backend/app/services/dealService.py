from models import Deal
from config.database import deals_collection


class DealService:

    def __init__(self, data=None):
        if data:
            self.id = data.get("_id")
            self.reference = data.get("reference")
            self.title = data.get("title")
            self.client = data.get("clientName")
            self.country = data.get("country")
            self.city = data.get("city")
            self.owner = data.get("ownerName")
            self.status = data.get("status")
            self.stage = data.get("stage")
            self.revenue = data.get("estimatedRevenue")
            self.margin = data.get("estimatedMargin")
            self.currency = data.get("currency")
            self.probability = data.get("probability")
            self.created_at = data.get("createdAt")
            self.expected_close_date = data.get("expectedCloseDate")

        self.model = Deal()
        self.model.init()

    def create_deal(self, data):
        return self.model.create(data)
    
    def get_all_deals(self, filter={}):
        return self.model.get_all(filter)
    
    def get_deal_by_id(self, deal_id):
        return self.model.get_by_id(deal_id)
    
    def update_deal(self, deal_id, data):
        return self.model.update(deal_id, data)    
    
    def delete_deal(self, deal_id):
        return self.model.delete(deal_id)
    
    def filter_by_client(self, client_name):
        query = {"clientName": client_name} 
        return self.model.get_all(query)

    def filter_by_start_date(self, start_date):
        query = {"createdAt": {"$gte": start_date}}
        return self.model.get_all(query)

    def filter_by_end_date(self, end_date):
        query = {"createdAt": {"$lte": end_date}}
        return self.model.get_all(query)

    def filter_by_period(self, start_date, end_date):
        query = {"createdAt": {"$gte": start_date, "$lte": end_date}}
        return self.model.get_all(query)
    

    
