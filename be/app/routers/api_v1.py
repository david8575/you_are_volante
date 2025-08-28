from fastapi import APIRouter
from app.routers import teams

api_v1 = APIRouter(prefix="/api/v1")

api_v1.include_router(teams.router)