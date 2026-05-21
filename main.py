from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent

templates = Jinja2Templates(
    directory=str(BASE_DIR / "templates")
)

@app.get("/")
def inicio(request: Request):

    return templates.TemplateResponse(
        request,
        "index.html"
    )
