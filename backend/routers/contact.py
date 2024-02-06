from fastapi import APIRouter

from models.contact import ContactModel

from httpx import post
from dotenv import load_dotenv
from os import getenv

load_dotenv()

router = APIRouter()

webhook_url = getenv('DISCORD_WEBHOOK_URL')

@router.post("/contact", status_code = 201, response_model = {})
async def contact(params: ContactModel):
    payload = {}

    payload['embeds'] = [{
        'title': f'{params.name} {params.last_name}',
        'description': f'[{params.email}](https://mail.google.com/mail/?view=cm&to={params.email})\n\n{params.message}' 
    }]

    response = post(webhook_url, json = payload)

    return {'status': 'success'}