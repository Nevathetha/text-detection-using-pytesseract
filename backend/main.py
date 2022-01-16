from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pathlib
import pytesseract
from PIL import Image


app = FastAPI()
origins = [
    "http://localhost:3000",
]

# what is a middleware? 
# software that acts as a bridge between an operating system or database and applications, especially on a network.

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/file-upload/")
async def create_upload_file(request: Request, files: UploadFile = File(...)):
    img = Image.open(files.file)
    preds = pytesseract.image_to_string(img)
    # print(preds)
    return {"content": preds}
    # return templates.TemplateResponse("response.html", {"request": request, "content": preds})
