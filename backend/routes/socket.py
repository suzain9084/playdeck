import socket
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.room_manager import manager
from datetime import datetime
import uuid

router = APIRouter()

@router.websocket("/ws/{room_id}/{name}")
async def websocket_room(websocket: WebSocket, room_id: str, name: str):
    socket_id = str(uuid.uuid4())
    try:
        status = await manager.connect(room_id, websocket, name, socket_id)
        if status:
            await manager.connectBroadcast(room_id, name, socket_id)
        while status:
            data = await websocket.receive_text()
            await manager.read_message_reply(data)

    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)
        await manager.broadcast(room_id, {"event": "disconnect", "socket_id": socket_id, "name": name})

    except Exception as e:
        await manager.disconnect(room_id, websocket)
        print("Unexpected error:", e)
