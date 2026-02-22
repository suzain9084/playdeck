from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.room_manager import manager

router = APIRouter()

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.room_manager import manager

router = APIRouter()

@router.websocket("/ws/{room_id}/{name}")
async def websocket_room(websocket: WebSocket, room_id: str, name: str):
    await manager.connect(room_id, websocket, name)
    try:
        await manager.connectBroadcast(room_id, name)
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(room_id, data)

    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
        await manager.broadcast(room_id, f"{name} left the room")

    except Exception as e:
        await manager.disconnect(room_id, websocket)
        print("Unexpected error:", e)


