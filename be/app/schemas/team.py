from typing import Optional
from pydantic import BaseModel, Field, constr

# 팀 생성용
class TeamCreate(BaseModel):
    name: str = Field(
        None,
        min_length=1, 
        max_length=50, 
        description="The name of the team")
    color: Optional[constr] = Field(
        None,
        min_length=1,
        max_length=20,
        strip_whitespace=True,
        description="The color associated with the team"
    )
# 팀 수정용
class TeamUpdate(BaseModel):
    name: Optional[str] = Field(
        min_length=1, 
        max_length=50
    )
    color: Optional[constr] = Field(
        min_length=1,
        max_length=20,
        strip_whitespace=True
    )

# 팀 출력용
class Team(BaseModel):
    id: int
    name: str
    color: Optional[str]

class TeamList(BaseModel):
    teams: list[Team]
    total: int