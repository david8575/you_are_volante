from fastapi import APIRouter, Query
from fastapi import HTTPException
from app.schemas.team import TeamCreate, TeamUpdate, Team, TeamList

router = APIRouter(prefix="/teams", tags=["teams"])

# 아주 간단한 인메모리 저장소(서버 재시작하면 초기화됨)
_db: dict[int, Team] = {}
_seq = 0

def _next_id() -> int:
    global _seq
    _seq += 1
    return _seq

@router.post("", response_model=Team, status_code=201)
def create_team(body: TeamCreate):
    """팀 생성"""
    new_id = _next_id()
    team = Team(id=new_id, name=body.name, color=body.color or "green")
    _db[new_id] = team
    return team

@router.get("", response_model=TeamList)
def list_teams(
    q: str | None = Query(default=None, description="이름 검색어 (부분일치)"),
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    """팀 목록 (간단 검색 + 페이지네이션)"""
    items = list(_db.values())
    if q:
        q_lower = q.lower()
        items = [t for t in items if q_lower in t.name.lower()]
    total = len(items)
    items = items[offset: offset + limit]
    return TeamList(items=items, total=total)

@router.get("/{team_id}", response_model=Team)
def get_team(team_id: int):
    """팀 단건 조회"""
    team = _db.get(team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

@router.patch("/{team_id}", response_model=Team)
def update_team(team_id: int, body: TeamUpdate):
    """팀 수정 (부분 업데이트)"""
    team = _db.get(team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    updated = team.model_copy(update=body.model_dump(exclude_unset=True))
    _db[team_id] = updated
    return updated

@router.delete("/{team_id}", status_code=204)
def delete_team(team_id: int):
    """팀 삭제"""
    if team_id not in _db:
        raise HTTPException(status_code=404, detail="Team not found")
    del _db[team_id]
    return None
