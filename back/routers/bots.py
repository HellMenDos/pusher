from pyexpat import model
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
from local_types import main
from services.bot_service import create, update, remove, get
from services.auth_service import JWTBearer

router = APIRouter()


@router.post('/',dependencies=[Depends(JWTBearer())], tags=["bots"])
async def create_bot(
        db: Session = Depends(models.get_db),
        data = Depends(JWTBearer()), 
        body: main.BotDTO = None
    ):
    result = create(body,db,data["user_id"])
    return result

@router.put('/{bot_it}',dependencies=[Depends(JWTBearer())], tags=["bots"])
async def update_bot(
        db: Session = Depends(models.get_db),
        bot_it:int = None, 
        body: main.BotDTO = None
    ):
    result = update(body,db,bot_it)
    return result

@router.delete('/{bot_it}',dependencies=[Depends(JWTBearer())], tags=["bots"])
async def delete_bot(
        db: Session = Depends(models.get_db),
        bot_it:int = None, 
    ):
    result = remove(db,bot_it)
    return result

@router.get('/',dependencies=[Depends(JWTBearer())], tags=["bots"])
async def get_all(
        db: Session = Depends(models.get_db),
        data = Depends(JWTBearer()), 
    ):
    result = get(db,data["user_id"])
    return result