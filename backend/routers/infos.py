from fastapi import APIRouter

from models.infos import InfosModel, UrlsModel

router = APIRouter()

@router.get("/infos", status_code = 200, response_model = InfosModel)
async def contact():
    response = InfosModel(
        roles = ['Desenvolvedor de Software', 'Fullstack', 'Backend', 'Frontend', 'Devops'],
        urls = UrlsModel(
            linkedin = 'https://www.linkedin.com/in/hudsonfarias',
            github = 'https://github.com/hudson-farias',
            whatssap = 'https://wa.me/message/GIRAZSPEDZSXE1',
            discord = 'https://discord.com/users/1127594477536694332'
        )
    )

    return response