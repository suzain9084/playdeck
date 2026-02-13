from fastapi import WebSocket
from typing import Dict, Set, Tuple, List, Optional
from time import time
from dataclasses import dataclass
import uuid


@dataclass
class Member:
    name: str
    websocket: WebSocket


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

    async def connect(self, room_id: str, websocket: WebSocket, name: str):
        await websocket.accept()

        if room_id not in self.rooms:
            room = Room(room_id)
            member = Member(name="screen", websocket=websocket)
            room.screen = member
            room.members.append(member)
            self.rooms[room_id] = room

        elif len(self.rooms[room_id].members) == 1:
            room = self.rooms[room_id]
            member = Member(name=name, websocket=websocket)
            room.host = member
            room.members.append(member)

        else:
            room = self.rooms[room_id]
            member = Member(name=name, websocket=websocket)
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

    async def broadcast(self, room_id: str, message: str):
        room = self.rooms.get(room_id)
        if not room:
            return

        for member in room.members:
            await member.websocket.send_text(message)

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
