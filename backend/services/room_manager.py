from ctypes import memmove
import socket
import string
from fastapi import WebSocket
from typing import Dict, Set, Tuple, List, Optional
from time import time
from dataclasses import dataclass
import uuid
import json

@dataclass
class Member:
    name: str
    websocket: WebSocket
    socket_id: string

    def to_dict(self):
        return {
            "name": self.name,
            "socket_id": self.socket_id
        }


class Room:
    def __init__(self, room_id: str):
        self.host: Optional[Member] = None
        self.screen: Optional[Member] = None
        self.room_id: str = room_id
        self.created_at: float = time()
        self.members: List[Member] = []


class RoomManager:
    def __init__(self):
        self.rooms: Dict[str, Room] = {}
        self.locked_room_ids: Set[Tuple[str, float]] = set()

    async def connect(self, room_id: str, websocket: WebSocket, name: str, socket_id: str):
        await websocket.accept()

        if room_id not in self.rooms:
            room = Room(room_id)
            member = Member(name="screen", websocket=websocket, socket_id=socket_id)
            room.screen = member
            room.members.append(member)
            self.rooms[room_id] = room

        elif len(self.rooms[room_id].members) == 1:
            room = self.rooms[room_id]
            member = Member(name=name, websocket=websocket, socket_id=socket_id)
            room.host = member
            room.members.append(member)

        else:
            room = self.rooms[room_id]
            member = Member(name=name, websocket=websocket, socket_id=socket_id)
            room.members.append(member)

    def disconnect(self, room_id: str, websocket: WebSocket):
        if room_id not in self.rooms:
            return

        room = self.rooms[room_id]
        room.members = [
            m for m in room.members if m.websocket != websocket
        ]

        if room.host and room.host.websocket == websocket:
            room.host = room.members[0] if room.members else None

        elif room.screen and room.screen.websocket == websocket:
            del self.rooms[room_id]
            self.lock_room(room_id)
            return

        if len(room.members) == 0:
            del self.rooms[room_id]
            self.lock_room(room_id)

    async def connectBroadcast(self, room_id: str, name: str, socket_id: str):
        room = self.rooms.get(room_id)
        if not room:
            return

        if len(room.members) == 1:
            await room.members[0].websocket.send_json({"event": "connect", "name": name, "socket_id": room.members[0].socket_id})
            return

        for member in room.members:
            if member.name != name:
                await member.websocket.send_json({"event": "connect", "name": name, "socket_id": socket_id})
            else:
                await member.websocket.send_json({
                    "event": "room_state",
                    "members": [m.to_dict() for m in room.members],
                    "host_socket_id": room.host.socket_id if room.host else None,
                })

    async def read_message_reply(self, data):
        data = json.loads(data)
        if data["event"] == "button_press":
            msg_from = data["from"]
            msg_to = data["to"]
            action = data["action"]
            room_id = data["room_id"]
            for member in self.rooms[room_id].members:
                if msg_to == member.socket_id:
                    await member.websocket.send_json({"event": data["event"], "from": msg_from, "action": action})
                    break

    async def broadcast(self, room_id, message):
        if room_id not in self.rooms.keys():
            return
        for memeber in self.rooms[room_id].members:
            await memeber.websocket.send_json(message)

    def generate_new_room_id(self) -> str:
        self.clean_locked_room()
        while True:
            new_id = str(uuid.uuid4())[:8]
            locked_ids = {rid for rid, expiry in self.locked_room_ids if expiry > time()}

            if new_id not in self.rooms and new_id not in locked_ids:
                self.lock_room(new_id)
                return new_id

    def lock_room(self, room_id: str, ttl_seconds: int = 30):
        self.locked_room_ids.add((room_id, time() + ttl_seconds))

    def clean_locked_room(self):
        now = time()
        self.locked_room_ids = {
            (rid, expiry) for rid, expiry in self.locked_room_ids if expiry > now
        }

    

manager = RoomManager()
