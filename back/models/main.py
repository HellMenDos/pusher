from email.policy import default
from enum import unique
from tkinter.tix import Tree
from sqlalchemy import Column, Integer, String, Table, ForeignKey,DateTime,Boolean
from sqlalchemy.orm import relationship
from .init import Base

users_bots = Table('users_bots', Base.metadata,
    Column('user_id', ForeignKey('users.id', ondelete="CASCADE", onupdate="CASCADE"), primary_key=True),
    Column('bot_id', ForeignKey('bots.id', ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
)

bots_messages = Table('bots_messages', Base.metadata,
    Column('bot_id', ForeignKey('bots.id', ondelete="CASCADE", onupdate="CASCADE"), primary_key=True),
    Column('message_id', ForeignKey('messages.id', ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
)

messages_item = Table('messages_item', Base.metadata,
    Column('message_id', ForeignKey('messages.id', ondelete="CASCADE", onupdate="CASCADE"), primary_key=True),
    Column('item_id', ForeignKey('items.id', ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
)


class UserModel(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String,unique=True)
    password = Column(String)
    is_active = Column(Boolean,default=False)
    bots = relationship("BotModel",cascade = "all,delete", secondary="users_bots", back_populates='user')

class BotModel(Base):
    __tablename__ = 'bots'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    hash = Column(String, nullable=False, unique=True)
    url = Column(String, nullable=False)
    users_url = Column(String, nullable=False)
    creater = Column(Integer, ForeignKey(UserModel.id, ondelete="CASCADE", onupdate="CASCADE"))

    user = relationship("UserModel",cascade = "all,delete", secondary="users_bots", back_populates='bots')
    messages = relationship("MessageModel",cascade = "all,delete", secondary="bots_messages", back_populates='bot')


class MessageModel(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    message_url = Column(String, nullable=False)
    name = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    creater = Column(Integer, ForeignKey(BotModel.id, ondelete="CASCADE", onupdate="CASCADE"))

    bot = relationship("BotModel",cascade = "all,delete", secondary="bots_messages", back_populates='messages')
    items = relationship("ItemModel",cascade = "all,delete", secondary="messages_item", back_populates='message')


class ItemModel(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True)
    fullname = Column(String, nullable=False)
    username = Column(String, nullable=False)
    message_id = Column(Integer, nullable=False)
    chat_id = Column(Integer, nullable=False)
    creater = Column(Integer, ForeignKey(MessageModel.id, ondelete="CASCADE", onupdate="CASCADE"))

    message = relationship("MessageModel",cascade = "all,delete", secondary="messages_item", back_populates='items')
