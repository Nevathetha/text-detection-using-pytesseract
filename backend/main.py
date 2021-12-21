from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pathlib
import pytesseract
from PIL import Image


app = FastAPI()

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/uploadfile/")
async def create_upload_file(request: Request, files: UploadFile = File(...)):
    img = Image.open(files.file)
    preds = pytesseract.image_to_string(img)
    print(preds)
    return templates.TemplateResponse("response.html", {"request": request, "response": preds})
