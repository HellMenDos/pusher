from pyexpat import model
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
from local_types import main
from services.message_service import create, update, remove, get
from services.auth_service import JWTBearer

router = APIRouter()


@router.post('/{bot_id}',dependencies=[Depends(JWTBearer())], tags=["messages"])
async def create_message(
        db: Session = Depends(models.get_db),
        bot_id: int = None, 
        body: main.MessageDTO = None):
    result = create(body,db,bot_id)
    return result

@router.put('/{id}',dependencies=[Depends(JWTBearer())], tags=["messages"])
async def update_message(
        db: Session = Depends(models.get_db),
        message_id:int = None, 
        body: main.BotDTO = None
    ):
    result = update(body,db,message_id)
    return result

@router.delete('/{id}',dependencies=[Depends(JWTBearer())], tags=["messages"])
async def delete_message(
        db: Session = Depends(models.get_db),
        message_id:int = None, 
    ):
    result = remove(db,message_id)
    return result

@router.get('/{bot_id}',dependencies=[Depends(JWTBearer())], tags=["messages"])
async def get_all(
        db: Session = Depends(models.get_db),
        data = Depends(JWTBearer()), 
        bot_id: int = None
    ):
    result = get(db,bot_id)
    return result