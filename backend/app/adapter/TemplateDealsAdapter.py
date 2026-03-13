from string import Template

from app.models import Deal
from app.services import dealService
from app.services import templateService




class TemplateDealsAdapter:

    def __init__(self):
        self.deal_service = dealService.DealService()
        self.template_service = templateService.TemplateService()


    def get_value(self, obj, path):

        keys = path.split(".")
        value = obj

        for key in keys:
            if type(value)==dict:
                value = value.get(key)
            else:
                return None

        return value
        

    def template_deal_adapter(self,template_id) :

        deals_adapte = []
        template = self.template_service.get_template_by_id(template_id)

        if not template:
            return []
        
        champs = template.get("visibleFields",[])
        print("champs :", champs)

        deals = self.deal_service.get_all_deals()

        for deal in deals:

            champ_deal = {}

            for ch in champs:

                value = self.get_value(deal, ch)

                champ_deal[ch] = value

            champ_deal["_id"] = str(deal.get("_id"))

            deals_adapte.append(champ_deal)

        return deals_adapte
