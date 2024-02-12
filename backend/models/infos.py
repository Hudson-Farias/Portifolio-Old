from pydantic import BaseModel
from typing import List, Optional

class UrlsModel(BaseModel):
    linkedin: str
    github: str
    whatssap: str
    discord: str


class ReposModel(BaseModel):
    id: int
    name: str
    description: Optional[str]
    html_url: Optional[str]
    homepage: Optional[str]

       
    class Config:
        extra = 'ignore'


class InfosModel(BaseModel):
    roles: List[str]
    urls: UrlsModel
    repos: List[ReposModel]
