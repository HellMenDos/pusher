import bcrypt
import models
from local_types import main
from sqlalchemy.orm import Session
from datetime import datetime

def create(data: main.MessageDTO,db: Session, bot_id: int) -> dict:
    bot = db\
        .query(models.BotModel)\
        .filter(models.BotModel.id==bot_id)\
        .first()

    message = models.MessageModel(
        name=data.name,
        message_url=data.message_url,
        date=datetime.now(),
        creater=bot.id
    )

    bot.messages.append(message)
    db.add_all([bot,message])
    db.commit()
    db.refresh(message)
    return message

def update(data: main.MessageDTO,db: Session, message_id: int) -> dict:
    message = db\
        .query(models.MessageModel)\
        .filter(models.MessageModel.id==message_id)\
        .first()

    message.name = data.name
    message.message_url = data.message_url
    message.date = data.date

    db.add(message)
    db.commit()
    db.refresh(message)
    return message

def remove(db: Session, message_id: int):
    return db\
        .query(models.MessageModel)\
        .filter(models.MessageModel.id==message_id)\
        .delete()

def get(db: Session, bot_id: int) -> dict:
    return db\
        .query(models.MessageModel)\
        .filter(models.MessageModel.creater==bot_id)\
        .all()