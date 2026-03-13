from fastapi import APIRouter
from app.controllers.templateController import TemplateController

router = APIRouter()
template_controller = TemplateController()


@router.post("/templates")
def create_template(data: dict):
    return template_controller.create_template(data)


@router.get("/templates")
def get_all_templates():
    return template_controller.get_all_templates()

@router.get("/templates/fields-List")
def get_template_fields():
    return template_controller.get_all_template_fields()


@router.get("/templates/{template_id}")
def get_template_by_id(template_id: str):
    return template_controller.get_template_by_id(template_id)


@router.put("/templates/{template_id}")
def update_template(template_id: str, data: dict):
    return template_controller.update_template(template_id, data)


@router.delete("/templates/{template_id}")
def delete_template(template_id: str):
    return template_controller.delete_template(template_id)


@router.get("/templates/filter/name")
def filter_by_name(name: str):
    return template_controller.filter_by_name(name)


@router.get("/templates/filter/period")
def filter_by_period(start_date: str, end_date: str):
    return template_controller.filter_by_period(start_date, end_date)



