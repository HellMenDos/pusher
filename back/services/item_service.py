from email import message
import models
from local_types import main
from sqlalchemy.orm import Session
from datetime import datetime

def create(data: main.ItemDTO,db: Session, message_id: int) -> dict:
    message = db\
        .query(models.MessageModel)\
        .filter(models.MessageModel.id==message_id)\
        .first()

    item = models.ItemModel(
        fullname=data.fullname,
        username=data.username,
        chat_id=data.chat_id,
        message_id=data.message_id,
        creater=message.id
    )

    # message.items.append(item)
    db.add_all([message,item])
    db.commit()
    db.refresh(item)
    return item


def remove(db: Session, item_id: int):
    instance = db\
        .query(models.ItemModel)\
        .filter(models.ItemModel.id==item_id)\
        .delete()
    db.commit()
    return instance

def get(db: Session, message_id: int) -> dict:
    return db\
        .query(models.ItemModel)\
        .filter(models.ItemModel.creater==message_id)\
        .all()