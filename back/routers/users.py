from pyexpat import model
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session,joinedload
import models

from local_types import main
from services.user_service import create_user,check_user
from services.auth_service import signJWT, JWTBearer,JWTBearerRefresh

router = APIRouter()

@router.post('/signup/', tags=["users"])
async def signup(db: Session = Depends(models.get_db), body: main.UserDTO = None):
    result = create_user(body,db)
    return signJWT(result.id)


@router.post('/signin/', tags=["users"])
async def signin(db: Session = Depends(models.get_db), body: main.UserDTO = None):
    if data := check_user(body,db):
        return signJWT(data.id)
    return {
        "error": "Wrong login details!"
    }

@router.get('/refresh/', dependencies=[Depends(JWTBearerRefresh())], tags=["users"])
async def refresh(
    db: Session = Depends(models.get_db), 
    data = Depends(JWTBearerRefresh())):
    return signJWT(data['user_id'])



@router.get('/all/', dependencies=[Depends(JWTBearer())], tags=["users"])
async def all_users(
    db: Session = Depends(models.get_db)):
    return db.query(models.UserModel)\
        .options(joinedload(models.UserModel.bots))\
        .all()
    
