from fastapi import APIRouter
from app.controllers.dealController import DealController

router = APIRouter()
deal_controller = DealController()


@router.post("/deals")
def create_deal(data: dict):
    return deal_controller.create_deal(data)


@router.get("/deals")
def get_all_deals():
    return deal_controller.get_all_deals()


@router.get("/deals/{deal_id}")
def get_deal_by_id(deal_id: str):
    return deal_controller.get_deal_by_id(deal_id)


@router.put("/deals/{deal_id}")
def update_deal(deal_id: str, data: dict):
    return deal_controller.update_deal(deal_id, data)


@router.delete("/deals/{deal_id}")
def delete_deal(deal_id: str):
    return deal_controller.delete_deal(deal_id)


@router.get("/deals/filter/client")
def filter_by_client(client_name: str):
    return deal_controller.filter_by_client(client_name)


@router.get("/deals/filter/period")
def filter_by_period(start_date: str, end_date: str):
    return deal_controller.filter_by_period(start_date, end_date)