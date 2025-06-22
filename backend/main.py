import os
import time
import uuid
from fastapi import FastAPI, Form, Request, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchaudio
from audiocraft.models import MusicGen
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.info(f"Incoming request: {request.method} {request.url}")

    try:
        response = await call_next(request)
    except Exception as e:
        logger.error(f"Request failed: {str(e)}")
        raise

    process_time = time.time() - start_time
    logger.info(f"Request completed: {request.method} {request.url} {response.status_code} ({process_time:.2f}s)")

    return response


def load_model():
    global model
    if model is None:
        logger.info("Loading MusicGen model...")
        try:
            model = MusicGen.get_pretrained('facebook/musicgen-small')
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Model loading failed: {str(e)}")
            raise


@app.on_event("startup")
async def startup_event():
    load_model()
    os.makedirs("generated", exist_ok=True)


@app.get("/")
async def health_check():
    return {"status": "ok", "service": "music-generation-api"}


@app.post("/generate")
async def generate_music(
        request: Request,
        prompt: str = Form(...),
        duration: int = Form(5),
):
    try:
        logger.info(f"Generation request | Prompt: '{prompt}' | Duration: {duration}s")
        logger.info(f"Headers: {dict(request.headers)}")

        if model is None:
            load_model()

        model.set_generation_params(duration=duration)
        wav = model.generate([prompt])

        filename = f"generated_{uuid.uuid4().hex[:8]}.wav"
        output_path = os.path.join("generated", filename)
        torchaudio.save(output_path, wav[0].cpu(), model.sample_rate)

        if not os.path.exists(output_path):
            raise HTTPException(status_code=500, detail="File not created")

        logger.info(f"File generated: {output_path} ({os.path.getsize(output_path)} bytes)")

        return FileResponse(
            output_path,
            media_type="audio/wav",
            filename=filename,
            headers={
                "Access-Control-Expose-Headers": "Content-Disposition",
                "Content-Disposition": f'attachment; filename="{filename}"'
            }
        )

    except torch.cuda.OutOfMemoryError:
        logger.error("CUDA out of memory error")
        return JSONResponse(
            status_code=500,
            content={"error": "Not enough GPU memory, try reducing duration"}
        )
    except Exception as e:
        logger.error(f"Generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))