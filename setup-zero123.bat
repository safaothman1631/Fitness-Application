@echo off
echo 🚀 دامەزراندنی Stable Zero123...
echo.

REM پێویستەکان دابمەزرێنە
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install diffusers transformers accelerate
pip install trimesh pillow numpy scipy
pip install xformers
pip install git+https://github.com/huggingface/diffusers.git

echo.
echo ✅ دامەزراندن تەواو بوو!
echo.
pause
