from pydantic import BaseModel

class ContactModel(BaseModel):
    name: str
    last_name: str
    email: str
    message: str
