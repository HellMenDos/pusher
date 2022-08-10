from datetime import datetime
from pydantic import BaseModel

class UserDTO(BaseModel):
    email: str
    password: str

class BotDTO(BaseModel):
    name: str
    hash: str
    url: str
    users_url: str

class MessageDTO(BaseModel):
    message_url: str
    name: str
    date: datetime

class ItemDTO(BaseModel):
    fullname: str
    username: str
    message_id: int
    chat_id: int

