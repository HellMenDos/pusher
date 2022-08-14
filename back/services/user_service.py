import bcrypt
import models
from local_types import main
from sqlalchemy.orm import Session

def encode_pass(password:str) -> str:
    return bytes(password, encoding= 'utf-8')

def create_user(data: main.UserDTO,db: Session) -> dict:
    password = encode_pass(data.password)
    hashed_pass = bcrypt.hashpw(password, bcrypt.gensalt())
    print(hashed_pass)
    user = models.UserModel(email=data.email,password=hashed_pass.decode())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def check_user(data: main.UserDTO,db: Session) -> dict:
    user = db.query(models.UserModel).filter(models.UserModel.email==data.email).first()
    if user and user.is_active: 
        password = encode_pass(data.password)
        return user if bcrypt.checkpw(password, encode_pass(user.password)) else {}
    else:
        return {}