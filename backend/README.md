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

## Hugging Face Spaces Deployment (Free 16GB RAM)

Since the PyTorch model and CLIP require significant RAM (~2GB), Hugging Face Spaces is the ideal free hosting platform.

1. Create a free account at [Hugging Face](https://huggingface.co/).
2. Go to your profile and click **New Space**.
3. Fill out the details:
   - **Space Name**: e.g., `clip-captioning-backend`
   - **License**: MIT
   - **Select the Space SDK**: Choose **Docker** → **Blank**
   - **Space Hardware**: Free (2 vCPU, 16GB RAM)
   - Click **Create Space**.
4. You will be presented with a repository. You need to upload your backend files here.
5. Click **Files** → **Add file** → **Upload files**.
6. Upload all the files inside this `backend/` folder (`app.py`, `model.py`, `requirements.txt`, `Dockerfile`).
7. **CRITICAL:** Upload your `best_model.pt` file directly into the Space as well. Since it is large, Hugging Face uses Git LFS automatically.
8. By default, `app.py` looks for `best_model.pt` locally. Once uploaded, the file will be in the root directory alongside `app.py`. Ensure that inside Hugging Face Settings, or simply by the folder structure, the model is found. (The code defaults to checking `MODEL_PATH` or `../results/best_model.pt`. To fix this for HF, add a Variable in your Space Settings: `MODEL_PATH = best_model.pt`).
9. The Space will automatically build the Docker image and start the server on port 7860.
10. Once it says **Running**, click the three dots (`...`) in the top right, select **Embed this Space**, and copy the Direct URL (it looks like `https://username-spacename.hf.space`).
11. Set the `NEXT_PUBLIC_API_URL` environment variable on your Vercel Next.js project to that URL.

- `GET /health` — Health check
- `POST /predict` — Upload an image and get a caption + word-level heatmaps
