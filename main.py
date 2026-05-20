from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent

# Templates
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

# Static files (CSS, JS, imágenes)
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")


@app.get("/")
def inicio(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )