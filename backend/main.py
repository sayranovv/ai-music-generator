from typing import Union
from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
import torch
from audiocraft.models import MusicGen
import torchaudio
import uuid
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

model = MusicGen.get_pretrained('facebook/musicgen-small')
model.set_generation_params(duration=5)

@app.post("/generate")
def generate_music(prompt: str = Form(...)):
    wav = model.generate([prompt])
    wav_tensor = wav[0].cpu()
    sample_rate = model.sample_rate

    filename = f"generated_{uuid.uuid4().hex[:8]}.wav"
    output_path = os.path.join("generated", filename)
    os.makedirs("generated", exist_ok=True)
    torchaudio.save(output_path, wav_tensor, sample_rate)

    return FileResponse(output_path, media_type="audio/wav", filename=filename)
