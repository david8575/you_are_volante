import time, uuid, logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from starlette.responses import Response

logger = logging.getLogger(__name__)

class RequestContextMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(self, request, call_next):
        req_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        start = time.time()
        response: Response = await call_next(request)
        elapsed = (time.time() - start) * 1000.0
        response.headers["X-Request-ID"] = req_id
        logger.info(f"{req_id} {request.method} {request.url.path} -> {response.status_code} {elapsed:.1f}ms")
        return response
