import bcrypt
import models
from local_types import main
from sqlalchemy.orm import Session


def create(data: main.BotDTO,db: Session, user_id: int) -> dict:
    user = db\
        .query(models.UserModel)\
        .filter(models.UserModel.id==user_id)\
        .first()

    bot = models.BotModel(
        name=data.name,
        hash=data.hash,
        url=data.url,
        users_url=data.users_url,
        creater=user.id
    )

    user.bots.append(bot)
    db.add_all([bot,user])
    db.commit()
    db.refresh(bot)
    return bot

def update(data: main.BotDTO,db: Session, bot_id: int) -> dict:
    bot = db\
        .query(models.BotModel)\
        .filter(models.BotModel.id==bot_id)\
        .first()
    print(bot_id)
    bot.name = data.name
    bot.hash = data.hash
    bot.url = data.url
    bot.users_url = data.users_url

    db.add(bot)
    db.commit()
    db.refresh(bot)
    return bot

def remove(db: Session, bot_id: int):
    return db\
        .query(models.BotModel)\
        .filter(models.BotModel.id==bot_id)\
        .delete()

def get(db: Session, user_id: int) -> dict:
    return db\
        .query(models.BotModel)\
        .filter(models.BotModel.creater==user_id)\
        .all()