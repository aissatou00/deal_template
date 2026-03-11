from controllers.dealController import DealController

deal_controller = DealController()

ROUTES = {
    "POST /deals": deal_controller.create_deal,
    "GET /deals": deal_controller.get_all_deals,
    "GET /deals/<id>": deal_controller.get_deal_by_id,
    "PUT /deals/<id>": deal_controller.update_deal,
    "DELETE /deals/<id>": deal_controller.delete_deal,
    "GET /deals/filter/client": deal_controller.filter_by_client,
    "GET /deals/filter/period": deal_controller.filter_by_period
}