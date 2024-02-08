from pydantic import BaseModel
from typing import List

class UrlsModel(BaseModel):
    linkedin: str
    github: str
    whatssap: str
    discord: str    

class InfosModel(BaseModel):
    roles: List[str]
    urls: UrlsModel
