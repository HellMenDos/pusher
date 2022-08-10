from pyexpat import model
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
from local_types import main
from services.item_service import create, remove, get
from services.auth_service import JWTBearer

router = APIRouter()


@router.post('/{message_id}',dependencies=[Depends(JWTBearer())], tags=["items"])
async def create_item(
        db: Session = Depends(models.get_db),
        message_id:int = None, 
        body: main.ItemDTO = None
    ):
    result = create(body,db,message_id)
    return result


@router.delete('/{id}',dependencies=[Depends(JWTBearer())], tags=["items"])
async def delete_bot(
        db: Session = Depends(models.get_db),
        item_it:int = None, 
    ):
    result = remove(db,item_it)
    return result

@router.get('/{message_id}',dependencies=[Depends(JWTBearer())], tags=["items"])
async def get_all(
        db: Session = Depends(models.get_db),
        message_id: int = None, 
    ):
    result = get(db,message_id)
    return result