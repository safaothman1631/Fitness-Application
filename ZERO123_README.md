# 🎨 Stable Zero123 - وێنە بۆ سێدوری

یەکێک لە باشترین مۆدێلە خۆڕاییەکان بۆ دروستکردنی سێدوری لە وێنەیەک.

## 📦 دامەزراندن

### ڕێگای 1: خۆکار (پێشنیار)
```bash
setup-zero123.bat
```

### ڕێگای 2: دەستی
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install diffusers transformers accelerate
pip install trimesh pillow numpy scipy
pip install xformers
```

## 🚀 بەکارهێنان

### نموونەی سادە:
```bash
python zero123-converter.py input.png
```

### بەکارهێنانی پێشکەوتوو:
```python
from zero123_converter import Zero123Converter

# Initialize
converter = Zero123Converter()

# Generate views
views = converter.generate_views(
    image_path="my-image.png",
    num_views=12,  # زیاتر = ورد تر
    output_dir="my_output"
)

# Create 3D model
converter.create_point_cloud(views, "model.obj")
```

## 📸 چۆنیەتی کارکردن

1. **وێنەیەک دەگرێت** (PNG/JPG)
2. **دیمەنی هەمە لایەنەکان** دروست دەکات (8-12 دیمەن)
3. **مۆدێلی سێدوری** دروست دەکات (OBJ format)

## ⚙️ پارامەترەکان

| پارامەتر | پێش فرض | وەسف |
|----------|----------|------|
| `num_views` | 8 | ژمارەی دیمەنەکان (8-16) |
| `num_inference_steps` | 50 | قاڵبەکانی diffusion (30-75) |
| `guidance_scale` | 7.5 | هێزی prompt (5-10) |

## 📁 دەرچوون

```
zero123_output_20251212_143045/
├── view_00_0deg.png      # دیمەن لە 0°
├── view_01_45deg.png     # دیمەن لە 45°
├── view_02_90deg.png     # دیمەن لە 90°
├── ...
└── model_3d.obj          # مۆدێلی سێدوری
```

## 💡 ئامۆژگاری

### بۆ ئەنجامی باشتر:
- ✅ وێنەی ساف بەکار بهێنە (بێ پاشبنەما)
- ✅ شتەکە لە ناوەڕاستدا بێت
- ✅ ڕووناکی باش هەبێت
- ✅ قەبارە گونجاو (512x512 - 1024x1024)

### بۆ خێرایی:
- 🔥 `num_views=6` بەکار بهێنە (خێراتر)
- 🔥 `num_inference_steps=30` (خێراتر)
- 🔥 GPU پێویستە (زۆر خێراترە)

### بۆ کواڵیتی:
- ⭐ `num_views=16` بەکار بهێنە (ورد تر)
- ⭐ `num_inference_steps=75` (جوانتر)
- ⭐ وێنەی قەبارەی گەورە بەکار بهێنە

## 🎯 نموونەکان

### نموونەی 1: شتێکی سادە
```python
converter = Zero123Converter()
views = converter.generate_views("chair.png", num_views=8)
converter.create_point_cloud(views, "chair_3d.obj")
```

### نموونەی 2: کارەکتەر
```python
converter = Zero123Converter()
views = converter.generate_views(
    "character.png",
    num_views=16,  # زیاتر بۆ ورد وری
)
converter.create_point_cloud(views, "character_3d.obj")
```

### نموونەی 3: فرە شت
```python
converter = Zero123Converter()

images = ["obj1.png", "obj2.png", "obj3.png"]
for i, img in enumerate(images):
    views = converter.generate_views(img, num_views=8)
    converter.create_point_cloud(views, f"output_{i}.obj")
```

## 🔧 چارەسەری کێشەکان

### کێشە: GPU نییە
```
⚠️  CUDA not available, using CPU
```
**چارەسەر**: 
- دابمەزرێنە CUDA Toolkit
- یان بەکار بهێنە CPU (زۆر هێواشە)

### کێشە: بیرەوەری تەواو بووە
```
RuntimeError: CUDA out of memory
```
**چارەسەر**:
- کەمتر `num_views` بەکار بهێنە
- وێنەی بچووکتر بەکار بهێنە
- batch size کەم بکەرەوە

### کێشە: ئەنجام باش نییە
```
دیمەنەکان ناڕوونن یان هەڵەن
```
**چارەسەر**:
- وێنەی جوانتر بەکار بهێنە
- پاشبنەما لابەرە
- `guidance_scale` زیاد بکە

## 📊 بەراوردکردن

| تایبەتمەندی | Stable Zero123 | Shap-E | TripoSR |
|-------------|---------------|---------|---------|
| کواڵیتی | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| خێرایی | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| نرخ | خۆڕایی | خۆڕایی | خۆڕایی |
| GPU | پێویستە | پێویستە | پێویستە |

## 🔗 سەرچاوەکان

- **GitHub**: [stabilityai/stable-zero123](https://github.com/stabilityai/stable-zero123)
- **Paper**: [Zero123: Zero-shot Image-to-3D with Diffusion Models](https://arxiv.org/abs/2303.11328)
- **Hugging Face**: [stabilityai/stable-zero123-diffusion](https://huggingface.co/stabilityai/stable-zero123-diffusion)

## 📝 تێبینی

ئەم کۆدە **point cloud** ی سادە دروست دەکات. بۆ ئەنجامی پیشەیی:
- بەکار بهێنە **NeRF** (Neural Radiance Fields)
- بەکار بهێنە **MVS** (Multi-View Stereo)
- بەکار بهێنە **Gaussian Splatting**

## 📄 مۆڵەت

MIT License - خۆڕایی بۆ هەموو مەبەستێک

---

**دروستکراوە بە** ❤️ **بۆ کۆمەڵگای کوردی**
