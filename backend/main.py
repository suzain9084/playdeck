from fastapi import FastAPI
from routes import route
from routes import socket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(route.router)
app.include_router(socket.router)

origins = [
    "http://localhost:8080",
    "https://playdeck-beta.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to the application"}
