import uvicorn
from fastapi import FastAPI
from models import init
from routers import users,bots,messages,items
app = FastAPI()

app.include_router(users.router, prefix="/users")
app.include_router(bots.router, prefix="/bots")
app.include_router(messages.router, prefix="/messages")
app.include_router(items.router, prefix="/items")

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True, workers=3)


