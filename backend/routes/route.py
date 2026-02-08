from fastapi import APIRouter
from services.room_manager import manager

router = APIRouter()

@router.post("/get_room_id")
def get_room_id():
    return {"room_Id": manager.generate_new_room_id()}