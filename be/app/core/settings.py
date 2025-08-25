import os

APP_NAME = os.environ.get("APP_NAME", "you_are_volante")
APP_ENV = os.environ.get("APP_ENV", "local")
CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*").split(",")  # "*" 또는 "http://localhost:5173"
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO").upper()
