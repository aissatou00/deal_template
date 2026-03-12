from app.services.templateService import TemplateService

class TemplateController:

    def __init__(self):
        self.service = TemplateService()

    def create_template(self, data):
        return self.service.create_template(data)

    def get_all_templates(self, filter_query={}):
        return self.service.get_all_templates(filter_query)

    def get_template_by_id(self, template_id):
        return self.service.get_template_by_id(template_id)

    def update_template(self, template_id, data):
        return self.service.update_template(template_id, data)

    def delete_template(self, template_id):
        return self.service.delete_template(template_id)

    def filter_by_name(self, name):
        return self.service.filter_by_name(name)

    def filter_by_period(self, start_date, end_date):
        return self.service.filter_by_period(start_date, end_date)