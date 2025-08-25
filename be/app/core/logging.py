import logging
import sys
from .settings import LOG_LEVEL

def setup_logging():
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        fmt="%(asctime)s %(levelname)s %(name)s - %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S",
    )
    handler.setFormatter(formatter)

    root = logging.getLogger()
    root.setLevel(LOG_LEVEL)
    # 기존 핸들러 제거 후 추가(uvicorn 기본 포맷 덮어쓰기)
    for h in list(root.handlers):
        root.removeHandler(h)
    root.addHandler(handler)

    # noisy 로거 톤다운(Optional)
    logging.getLogger("uvicorn.error").setLevel(LOG_LEVEL)
    logging.getLogger("uvicorn.access").setLevel(LOG_LEVEL)
    logging.getLogger("uvicorn.asgi").setLevel(LOG_LEVEL)
