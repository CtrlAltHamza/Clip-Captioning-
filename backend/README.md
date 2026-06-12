# CLIPCaptioner Backend

FastAPI backend for the CLIP-Guided Image Captioning project.

## Local Development

1. Create a virtual environment and install dependencies:
```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

2. Set the `MODEL_PATH` environment variable to point to `best_model.pt`:
```bash
# Windows
set MODEL_PATH=..\results\best_model.pt

# Linux / macOS
export MODEL_PATH=../results/best_model.pt
```

3. Start the server:
```bash
uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```

4. Test the API at: http://127.0.0.1:8000/docs

## Railway Deployment (Monorepo)

Since this `backend` folder is located inside your `webapp` repository, Railway can deploy it using the "Monorepo" feature.

1. On [Railway.app](https://railway.app/), click **New Project → Deploy from GitHub Repo**.
2. Select your `Clip-Captioning-` repository.
3. Once the service is created, go to the Service Settings.
4. Set the **Root Directory** to `/backend`.
5. Add the following **environment variable** in the Railway service variables:
   - `MODEL_PATH` → Upload your `best_model.pt` to a cloud bucket (e.g. Google Drive, Cloudflare R2, AWS S3) and put the direct download URL here, **OR** commit the model via Git LFS.

> **Note:** `best_model.pt` is 377MB. Railway machines do not store large files in source control natively unless Git LFS is used.

6. After deployment, copy the Railway URL (e.g. `https://clipcaptioner-backend.up.railway.app`).
7. Set the `NEXT_PUBLIC_API_URL` environment variable on your Vercel project to point to that Railway URL.

## API Endpoints

- `GET /health` — Health check
- `POST /predict` — Upload an image and get a caption + word-level heatmaps
