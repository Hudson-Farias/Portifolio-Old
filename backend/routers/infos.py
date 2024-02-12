from fastapi import APIRouter
from httpx import get

from models.infos import InfosModel, UrlsModel, ReposModel

router = APIRouter()

@router.get("/infos", status_code = 200, response_model = InfosModel)
async def contact():
    repos = get('https://api.github.com/users/hudson-farias/repos').json()
    ignore_repos = [752588874, 750776309]

    response = InfosModel(
        roles = ['Desenvolvedor de Software', 'Fullstack', 'Backend', 'Frontend', 'Devops'],
        urls = UrlsModel(
            linkedin = 'https://www.linkedin.com/in/hudsonfarias',
            github = 'https://github.com/hudson-farias',
            whatssap = 'https://wa.me/message/GIRAZSPEDZSXE1',
            discord = 'https://discord.com/users/1127594477536694332'
        ),
        repos = [ReposModel(**repo) for repo in repos if repo['id'] not in ignore_repos]
    )


    return response