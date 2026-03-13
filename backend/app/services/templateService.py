from app.models.Template import Template

class TemplateService:

    def __init__(self):
        self.model = Template()

    def create_template(self, data):
        return self.model.create(data)

    def get_all_templates(self, filter_query={}):
        return self.model.get_all(filter_query)

    def get_template_by_id(self, template_id):
        return self.model.get_by_id(template_id)

    def update_template(self, template_id, data):
        return self.model.update(template_id, data)

    def delete_template(self, template_id):
        return self.model.delete(template_id)

    def filter_by_name(self, name):
        query = {"name": {"$regex": name}}
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

    
