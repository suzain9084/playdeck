from fastapi import FastAPI
from routes import route
from routes import socket

app = FastAPI()
app.include_router(route.router)
app.include_router(socket.router)


@app.get("/")
def home():
    return {"message": "Welcome to the application"}
