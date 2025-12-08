# 🚀 UniRig Quick Start Guide
## دەستپێکی خێرا بۆ UniRig

### ✅ پێداویستیەکان (Requirements)

- **Python 3.9+**
- **Conda** (Miniconda یان Anaconda)
- **Git**
- **GPU** (پێشنیارکراو - NVIDIA with 8GB+ VRAM)
- **10GB+ disk space**

---

## 📥 دامەزراندن (Installation)

### هەنگاو 1: دامەزراندنی Conda

ئەگەر Conda نییە، دایبەزێنە:
```
https://docs.conda.io/en/latest/miniconda.html
```

### هەنگاو 2: جێبەجێکردنی Installation Script

```powershell
cd c:\A
.\install-unirig.ps1
```

ئەم سکریپتە ئەوانە دەکات:
- ✅ دروستکردنی conda environment
- ✅ دامەزراندنی PyTorch (CUDA یان CPU)
- ✅ دامەزراندنی Flask + dependencies
- ✅ کلۆنکردنی UniRig repository
- ✅ دامەزراندنی UniRig requirements

### هەنگاو 3: دابەزاندنی Pretrained Model

**Option A: دابەزاندنی دەستی (Manual)**
```
1. بڕۆ بۆ: https://github.com/VAST-AI-Research/UniRig/releases
2. دابەزێنە: unirig_pretrained.pth
3. دایبنێ لە: c:\A\UniRig\pretrained\unirig_pretrained.pth
```

**Option B: بە Python دابیبەزێنە**
```powershell
conda activate UniRig
cd UniRig
python download_model.py
```

---

## 🚀 دەستپێکردنی Server

### مەتودی 1: بە Start Script

```powershell
.\start-unirig.ps1
```

### مەتودی 2: دەستی (Manual)

```powershell
conda activate UniRig
python unirig-server.py
```

Server دەستپێدەکات لەسەر: **http://localhost:8000**

---

## 🧪 تەست کردن (Testing)

### 1. Health Check

```powershell
# PowerShell
Invoke-WebRequest -Uri 'http://localhost:8000/health' | Select-Object -ExpandProperty Content
```

```bash
# Bash/Git Bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "device": "cuda:0",
  "cuda_available": true
}
```

### 2. بە Postman یان Thunder Client تەست بکە

**POST** `http://localhost:8000/api/rig/full`

**Body:**
```json
{
  "vertices": [
    [0.0, 0.0, 0.0],
    [1.0, 0.0, 0.0],
    [0.5, 1.0, 0.0]
  ],
  "category": "human"
}
```

---

## 📡 بەکارهێنان لە Next.js App

فایلەکانی پێویست پێشتر دروستکراون:

### 1. Environment Variables

لە `.env.local`:
```env
NEXT_PUBLIC_UNIRIG_API_URL=http://localhost:8000
NEXT_PUBLIC_UNIRIG_API_KEY=
```

### 2. بەکارهێنانی Hook

```tsx
import { useUniRig } from '@/hooks/useUniRig'

export default function RiggingComponent() {
  const { rigModel, loading, error, riggedModel, progress } = useUniRig()

  const handleRig = async () => {
    const vertices = [
      // ... your 3D model vertices
    ]
    const normals = [
      // ... vertex normals (optional)
    ]
    
    const result = await rigModel(vertices, normals, 'human')
    console.log('Rigged model:', result)
  }

  return (
    <div>
      <button onClick={handleRig} disabled={loading}>
        {loading ? `Rigging... ${progress.percent}%` : 'Auto-Rig Model'}
      </button>
      
      {error && <p>Error: {error}</p>}
      
      {riggedModel && (
        <div>
          <p>✅ Rigging complete!</p>
          <p>Joints: {riggedModel.skeleton.joints.length}</p>
          <p>Bones: {riggedModel.skeleton.bones.length}</p>
        </div>
      )}
    </div>
  )
}
```

### 3. یەکخستن لەگەڵ Anatomy Viewer

لە `components/anatomy-3d-model.tsx`:

```tsx
import { useUniRig } from '@/hooks/useUniRig'
import { extractMeshData } from '@/lib/unirig-service'

// ناو کۆمپۆنێنت:
const { rigModel } = useUniRig({ autoRig: false })

const handleAutoRig = async () => {
  if (!apiRef.current) return
  
  // Extract mesh data from Sketchfab
  apiRef.current.getSceneGraph((err, graph) => {
    if (err) return
    
    const meshData = extractMeshData(graph)
    
    // Auto-rig the model
    rigModel(meshData.vertices, meshData.normals, 'human')
      .then(result => {
        console.log('✅ Auto-rigged:', result)
        // بەکاری بهێنە بۆ animation
      })
  })
}

// زیادکردنی دوگمە:
<button onClick={handleAutoRig}>🤖 Auto-Rig</button>
```

---

## 🐛 چارەسەری کێشەکان (Troubleshooting)

### کێشە 1: "Module 'UniRig' not found"

```powershell
# دڵنیابە کە UniRig repository کلۆنکراوە
cd c:\A
git clone https://github.com/VAST-AI-Research/UniRig.git
```

### کێشە 2: "Model not loaded"

```powershell
# چێک بکە کە model file هەیە
ls UniRig\pretrained\

# ئەگەر نەبوو، دایبەزێنە لە releases page
```

### کێشە 3: "CUDA out of memory"

```python
# لە unirig-server.py، batch size کەم بکەرەوە
# یان CPU بەکاربهێنە:
device = torch.device('cpu')
```

### کێشە 4: Server ناکەوێتەوە

```powershell
# چێک بکە کە port 8000 ئازادە
netstat -ano | findstr :8000

# ئەگەر بەکارهێنراوە، process بکوژە یان port بگۆڕە:
# لە unirig-server.py:
# port = 8001
```

### کێشە 5: CORS errors لە browser

```python
# دڵنیابە کە CORS enabled کراوە لە server:
from flask_cors import CORS
CORS(app)
```

---

## 📊 API Endpoints Reference

### GET `/health`
- **وەڵام**: `{ status, model_loaded, device, cuda_available }`

### POST `/api/skeleton/predict`
- **Body**: `{ vertices, normals?, category }`
- **وەڵام**: `{ joints, joint_names, bones, confidence }`

### POST `/api/skinning/predict`
- **Body**: `{ vertices, joints, bones }`
- **وەڵام**: `{ weights, bone_indices, num_influences }`

### POST `/api/rig/full`
- **Body**: `{ vertices, normals?, faces?, category }`
- **وەڵام**: Complete rigged model

### POST `/api/export`
- **Body**: `{ format, vertices, faces, joints, weights, ... }`
- **وەڵام**: Exported file data

---

## 🎯 بەکارهێنانی پێشکەوتوو (Advanced Usage)

### بۆ مۆدێلی دیاریکراو (Custom Model)

```typescript
import { UniRigService } from '@/lib/unirig-service'

const service = new UniRigService('http://localhost:8000')

// بۆ quadruped (چوار پێ)
const result = await service.rigModel(vertices, normals, 'quadruped')

// بۆ custom category
const result = await service.rigModel(vertices, normals, 'custom')
```

### Export بە فۆرماتی جیاواز

```typescript
const exported = await service.exportRiggedModel(
  riggedModel,
  'gltf'  // یان 'fbx', 'json'
)

// Save to file
const blob = new Blob([exported], { type: 'model/gltf+json' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'rigged_model.gltf'
a.click()
```

---

## 🔥 Performance Tips

1. **GPU بەکاربهێنە** بۆ خێرایی (10-100x faster)
2. **Batch processing** بۆ چەندین مۆدێل
3. **Cache results** بۆ دووبارەکردنەوە
4. **Reduce vertices** (< 10K) بۆ real-time
5. **Use WebWorkers** لە browser بۆ non-blocking

---

## 📚 Resources

- **UniRig Paper**: https://arxiv.org/abs/2310.00049
- **GitHub**: https://github.com/VAST-AI-Research/UniRig
- **Documentation**: پێشتر نووسراوە لە `UNIRIG_SETUP.md`

---

## ✅ پشکنینی دامەزراندن (Verification)

دوای دامەزراندن، ئەم چێککردنانە بکە:

```powershell
# 1. چێککردنی conda environment
conda env list | Select-String "UniRig"

# 2. چێککردنی Python packages
conda activate UniRig
python -c "import torch; print('PyTorch:', torch.__version__)"
python -c "import flask; print('Flask:', flask.__version__)"

# 3. چێککردنی UniRig model
python -c "from model.UniRig import UniRig; print('✅ UniRig imported')"

# 4. دەستپێکردنی server
python unirig-server.py
```

ئەگەر هەموو چێکەکان ✅ بوون، ئامادەیت! 🎉

---

## 💡 یارمەتی زیاتر

ئەگەر کێشەت هەبوو، پشکنین بکە:
1. **فایلی Log**: `unirig-server.log`
2. **Browser Console**: F12 لە Next.js app
3. **Network Tab**: بۆ بینینی API requests
4. **GitHub Issues**: https://github.com/VAST-AI-Research/UniRig/issues

---

**بەخێرهاتن بۆ UniRig! 🚀**
