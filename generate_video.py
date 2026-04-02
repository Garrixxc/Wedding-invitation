"""
Wedding Video Generator — Neha & Prasad
========================================
Uses Google Veo 2 (via the Gemini API) to generate a short cinematic video
from NehaPrasad.jpeg. The output file NehaPrasad_video.mp4 is automatically
picked up by the wedding website's hero section.

SETUP
-----
1. Get a Gemini API key from https://aistudio.google.com/
   Note: Veo 2 video generation requires a paid API tier (not free quota).

2. Install the SDK:
       pip install google-genai

3. Set your API key:
       export GEMINI_API_KEY="your_key_here"   # macOS / Linux
       set GEMINI_API_KEY=your_key_here         # Windows

4. Run:
       python generate_video.py

IMPORTANT: Verify the API interface matches your installed SDK version.
Run the following to inspect the current signatures:
    python -c "from google import genai; help(genai.Client.models)"
    python -c "from google.genai import types; help(types.GenerateVideoConfig)"
"""

import os
import sys
import time

# ── SDK import ────────────────────────────────────────────────────────────────
try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: google-genai not installed.")
    print("Run:  pip install google-genai")
    sys.exit(1)

# ── API key ───────────────────────────────────────────────────────────────────
API_KEY = os.environ.get("GEMINI_API_KEY", "")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY environment variable is not set.")
    sys.exit(1)

PHOTO_PATH  = "NehaPrasad.jpeg"
OUTPUT_PATH = "NehaPrasad_video.mp4"
MODEL       = "veo-2.0-generate-001"

# ── Cinematic prompt ──────────────────────────────────────────────────────────
PROMPT = (
    "A beautiful, dreamy slow-motion video of a happy Indian couple during "
    "their wedding celebration. Soft golden bokeh background, warm romantic "
    "lighting, gentle slow zoom-in. The couple is smiling and joyful. "
    "Cinematic 16:9, elegant and festive mood."
)

# ─────────────────────────────────────────────────────────────────────────────

def main():
    client = genai.Client(api_key=API_KEY)

    # Step 1 – upload the image (some SDK versions require this)
    print(f"Uploading {PHOTO_PATH}...")
    try:
        uploaded = client.files.upload(
            path=PHOTO_PATH,
            config=types.UploadFileConfig(mime_type="image/jpeg"),
        )
        image_ref = uploaded
        print(f"  Uploaded as: {uploaded.name}")
    except Exception as exc:
        print(f"  File upload failed ({exc}); will try passing bytes directly.")
        with open(PHOTO_PATH, "rb") as f:
            image_ref = types.Image(image_bytes=f.read(), mime_type="image/jpeg")

    # Step 2 – kick off video generation (long-running operation)
    print(f"\nRequesting video from {MODEL}...")
    print("  This typically takes 3–8 minutes. Please wait.")

    try:
        operation = client.models.generate_video(
            model=MODEL,
            prompt=PROMPT,
            image=image_ref,
            config=types.GenerateVideoConfig(
                duration_seconds=8,
                aspect_ratio="16:9",
                number_of_videos=1,
            ),
        )
    except Exception as exc:
        print(f"\nERROR starting generation: {exc}")
        print("Check that your API key has Veo 2 access and the SDK is up to date.")
        sys.exit(1)

    # Step 3 – poll until done
    dots = 0
    while not operation.done:
        time.sleep(12)
        dots += 1
        print(f"  Waiting{'.' * (dots % 4 + 1)}", end="\r")
        try:
            operation = client.operations.get(operation.name)
        except Exception:
            pass  # transient poll error — keep waiting

    print("\n")

    if getattr(operation, "error", None) and operation.error.message:
        print(f"Generation failed: {operation.error.message}")
        sys.exit(1)

    # Step 4 – save the video
    try:
        generated = operation.result.generated_videos[0]
        video_bytes = generated.video.video_bytes
        with open(OUTPUT_PATH, "wb") as f:
            f.write(video_bytes)
    except Exception as exc:
        print(f"ERROR saving video: {exc}")
        print("Inspect operation.result to find the correct attribute path.")
        sys.exit(1)

    print(f"Done!  Video saved to {OUTPUT_PATH}")
    print("Open index.html in a browser — the hero will automatically play it.")


if __name__ == "__main__":
    main()
