from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


from app.routers.api_v1 import api_v1
from app.core.settings import APP_NAME, CORS_ORIGINS
from app.core.logging import setup_logging
from app.core.request_id import RequestContextMiddleware
from app.core.errors import (
    AppError, handle_app_error,
    handle_http_exception, handle_validation_error, handle_unexpected_error,
)
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

setup_logging()
app = FastAPI(title=APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if CORS_ORIGINS == ["*"] else CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestContextMiddleware)

# ★ /api/v1 네임스페이스 추가
app.include_router(api_v1)

@app.get("/")
def root():
    return {"hello": "world"}

@app.get("/boom")
def boom():
    raise ValueError("boom")

@app.get("/bad")
def bad():
    raise HTTPException(status_code=400, detail="Bad request example")

@app.get("/apperr")
def apperr():
    raise AppError("Business rule violated", status_code=409, code="BUSINESS_RULE")

app.add_exception_handler(AppError, handle_app_error)
app.add_exception_handler(StarletteHTTPException, handle_http_exception)
app.add_exception_handler(RequestValidationError, handle_validation_error)
app.add_exception_handler(Exception, handle_unexpected_error)
