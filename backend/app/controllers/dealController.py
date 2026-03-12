from app.services.dealservice import DealService

class DealController:
    def __init__(self):
        self.service = DealService()  

    def create_deal(self, data):
        return self.service.create_deal(data)

    def get_all_deals(self, filter_query={}):
        return self.service.get_all_deals(filter_query)

    def get_deal_by_id(self, deal_id):
        return self.service.get_deal_by_id(deal_id)

    def update_deal(self, deal_id, data):
        return self.service.update_deal(deal_id, data)

    def delete_deal(self, deal_id):
        return self.service.delete_deal(deal_id)

    def filter_by_client(self, client_name):
        return self.service.filter_by_client(client_name)

    def filter_by_period(self, start_date, end_date):
        return self.service.filter_by_period(start_date, end_date)