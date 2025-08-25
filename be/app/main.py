from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health
from app.core.settings import APP_NAME, CORS_ORIGINS
from app.core.logging import setup_logging
from app.core.request_id import RequestContextMiddleware
from app.core.errors import (
    AppError, handle_app_error,
    handle_http_exception, handle_validation_error, handle_unexpected_error,
)
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

# 로깅 초기화
setup_logging()

app = FastAPI(title=APP_NAME)

# 미들웨어
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if CORS_ORIGINS == ["*"] else CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestContextMiddleware)

# 라우터
app.include_router(health.router)

# 테스트용 루트
@app.get("/")
def root():
    return {"hello": "world"}

# 데모 엔드포인트(의도적 에러)
@app.get("/boom")          # 일반 예외 -> 500
def boom():
    raise ValueError("boom")

@app.get("/bad")           # HTTPException -> 통일 응답
def bad():
    raise HTTPException(status_code=400, detail="Bad request example")

@app.get("/apperr")        # AppError -> 커스텀 코드
def apperr():
    raise AppError("Business rule violated", status_code=409, code="BUSINESS_RULE")

# 전역 핸들러 등록
app.add_exception_handler(AppError, handle_app_error)
app.add_exception_handler(StarletteHTTPException, handle_http_exception)
app.add_exception_handler(RequestValidationError, handle_validation_error)
app.add_exception_handler(Exception, handle_unexpected_error)
