from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.room_manager import manager

router = APIRouter()

@router.websocket("/ws/{room_id}")
async def websocket_room(websocket: WebSocket, room_id: str):
    await manager.connect(room_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(room_id, f"Room {room_id}: {data}")

    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
