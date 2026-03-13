from app.models.Deal import Deal 

class DealService:

    def __init__(self):
        self.model = Deal()
 
    def create_deal(self, data):
        return self.model.create(data)

    def get_all_deals(self, filter_query={}):
        return self.model.get_all(filter_query)

    def get_deal_by_id(self, deal_id):
        return self.model.get_by_id(deal_id)

    def update_deal(self, deal_id, data):
        return self.model.update(deal_id, data)

    def delete_deal(self, deal_id):
        return self.model.delete(deal_id)

    def filter_by_client(self, client_name):
        query = {"clientName": {"$regex": client_name}} 
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
    

    