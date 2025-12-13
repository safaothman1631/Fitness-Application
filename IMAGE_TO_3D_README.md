# 🎨 وێنە بۆ سێدوری - ڕێنمایی خێرا

چارەسەرێکی **تەواو و خۆڕایی** بۆ گۆڕینی وێنە بۆ مۆدێلی سێدوری بە بەکارهێنانی Stability AI API.

## ⚡ تایبەتمەندیەکان

- ✅ **زۆر خێرا** (10-30 چرکە)
- ✅ **کواڵیتی بەرز**
- ✅ **بێ پێویستی بە GPU**
- ✅ **دەرچوونی GLB** (Blender, Unity, etc.)
- ✅ **بەکارهێنانی ئاسان**

## 🚀 دەستپێکردن (3 هەنگاو)

### 1️⃣ دروستکردنی API Key

1. چوونە: https://platform.stability.ai/account/keys
2. کلیک لەسەر **"Create API Key"**
3. کۆپی کردنی key (دەست پێ دەکات بە `sk-...`)

### 2️⃣ ڕەنکردنی بەرنامەکە

```bash
python image-to-3d.py
```

### 3️⃣ داخڵکردنی زانیاریەکان

- API Key بنووسە
- ڕێگای وێنەکە بنووسە
- مۆدێل هەڵبژێرە (Fast یان Point-Aware)

## 💰 نرخەکان

| مۆدێل | کات | نرخ | کواڵیتی |
|-------|-----|-----|---------|
| **Fast** | 10-20 چرکە | 10 credits | ⭐⭐⭐⭐ |
| **Point-Aware** | 15-30 چرکە | 4 credits | ⭐⭐⭐⭐⭐ |

💡 **پێشنیار**: Point-Aware (هەرزانتر و جوانتر)

## 📖 بەکارهێنان

### نموونەی سادە:
```bash
python image-to-3d.py
```

### بەکارهێنانی پێشکەوتوو:
```python
from image_to_3d import Image3DConverter

# Initialize
converter = Image3DConverter('sk-YOUR-API-KEY')

# Check balance
converter.check_balance()

# Convert image
output = converter.image_to_3d(
    image_path='my-image.png',
    output_path='model.glb',
    model='point-aware'  # یان 'fast'
)

print(f"✅ فایلی سێدوری: {output}")
```

### فرە وێنە:
```python
converter = Image3DConverter('sk-YOUR-API-KEY')

images = ['chair.png', 'car.png', 'character.png']
for img in images:
    name = img.replace('.png', '.glb')
    converter.image_to_3d(img, name, model='point-aware')
```

## 🎯 وێنەی گونجاو

### ✅ باش:
- وێنەی ساف بێ پاشبنەما
- شتەکە لە ناوەڕاستدا
- ڕووناکی باش
- قەبارە: 512x512 - 2048x2048

### ❌ ناباش:
- وێنەی تار یان ناڕوون
- چەندین شت لە یەک وێنەدا
- پاشبنەمای قەڵەمباز
- قەبارەی زۆر بچووک

## 🔧 چارەسەری کێشەکان

### کێشە: API Key هەڵەیە
```
❌ هەڵە: 401
💡 API Key هەڵەیە یان نەچالاکە
```
**چارەسەر**: 
- دڵنیا ببەرەوە کە key ڕاستە
- دڵنیا ببەرەوە کە چالاکە لە dashboard

### کێشە: کرێدیت تەواو بووە
```
❌ هەڵە: 402
💡 کرێدیتەکەت تەواو بووە
```
**چارەسەر**:
- چوونە: https://platform.stability.ai/account
- کڕینی کرێدیتی زیاتر

### کێشە: وێنە زۆر گەورەیە
```
❌ هەڵە: 413
💡 وێنەکە زۆر گەورەیە
```
**چارەسەر**:
- قەبارەی وێنە کەمتر لە 10MB بکەرەوە
- کواڵیتی کەم بکەرەوە

## 🎨 بینینی مۆدێلی سێدوری

### ئۆنلاین:
- https://3dviewer.net
- https://gltf-viewer.donmccurdy.com
- https://modelviewer.dev

### نەرمەواڵەکان:
- **Blender** (خۆڕایی)
- **Unity** (بۆ یاری)
- **Unreal Engine** (بۆ یاری)
- **Three.js** (بۆ وێب)

## 💡 ئامۆژگاری

### بۆ کواڵیتی باشتر:
- بەکار بهێنە **Point-Aware** model
- وێنەی قەبارەی گەورە (1024x1024+)
- پاشبنەما لابەرە (https://remove.bg)

### بۆ خێرایی:
- بەکار بهێنە **Fast** model
- قەبارەی وێنە (512x512)

### بۆ کەم کردنەوەی نرخ:
- بەکار بهێنە **Point-Aware** (4 credits)
- فرە وێنە یەکجار بنێرە

## 📊 بەراوردکردن

| تایبەتمەندی | Stability API | Zero123 Local |
|-------------|---------------|---------------|
| خێرایی | ⚡⚡⚡⚡⚡ | ⚡ (CPU) / ⚡⚡⚡⚡ (GPU) |
| کواڵیتی | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| نرخ | 4-10 credits | خۆڕایی (بەڵام GPU پێویستە) |
| GPU | ناپێویست | پێویستە بۆ خێرایی |

## 🔗 سەرچاوەکان

- **API Docs**: https://platform.stability.ai/docs/api-reference
- **Dashboard**: https://platform.stability.ai/account
- **Pricing**: https://platform.stability.ai/pricing
- **Discord**: https://discord.gg/stablediffusion

## 📝 نموونەکان

### نموونە 1: شتێکی سادە
```python
converter = Image3DConverter('sk-...')
converter.image_to_3d('chair.png', 'chair.glb', 'fast')
```

### نموونە 2: کارەکتەر
```python
converter = Image3DConverter('sk-...')
converter.image_to_3d('character.png', 'character.glb', 'point-aware')
```

### نموونە 3: چێک کردنی باڵانس
```python
converter = Image3DConverter('sk-...')
balance = converter.check_balance()
print(f"کرێدیت: {balance}")
```

---

**دروستکراوە بە** ❤️ **بۆ کۆمەڵگای کوردی**

🎯 **بەکارهێنانی ئاسان، ئەنجامی پڕۆفیشناڵ**
