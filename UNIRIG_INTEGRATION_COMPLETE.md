# 🎯 UniRig Integration - Complete Setup
## یەکخستنی تەواوی UniRig بۆ Fitness Application

---

## ✅ چی کراوە (What's Done)

### 1. فایلە Backend کە دروستکراون:

- ✅ **`unirig-server.py`** - Flask API server بۆ UniRig
  - Endpoints: `/health`, `/api/skeleton/predict`, `/api/skinning/predict`, `/api/rig/full`
  - CUDA support
  - Error handling

- ✅ **`lib/unirig-service.ts`** - TypeScript service layer
  - `UniRigService` class
  - Methods: `generateSkeleton`, `generateSkinning`, `rigModel`, `export`
  - Type definitions

- ✅ **`hooks/useUniRig.ts`** - React hook
  - `useUniRig()` hook بۆ component
  - State management: loading, error, progress
  - Methods: `rigModel`, `exportModel`, `reset`

### 2. فایلە Configuration:

- ✅ **`.env.local`** - Environment variables
  ```env
  NEXT_PUBLIC_UNIRIG_API_URL=http://localhost:8000
  NEXT_PUBLIC_UNIRIG_API_KEY=
  ```

### 3. فایلە Installation Scripts:

- ✅ **`install-unirig.ps1`** - Conda method
- ✅ **`install-unirig-venv.ps1`** - pip/venv method (ACTIVE)
- ✅ **`start-unirig.ps1`** - Start with conda
- ✅ **`start-unirig-venv.ps1`** - Start with venv

### 4. فایلە Documentation:

- ✅ **`UNIRIG_SETUP.md`** - Detailed setup guide
- ✅ **`UNIRIG_QUICK_START.md`** - Quick start guide (Kurdish + English)
- ✅ **`UNIRIG_INTEGRATION_COMPLETE.md`** - This file

### 5. UI Integration:

- ✅ **`app/physiotherapist/anatomy/page.tsx`** - دوگمەی "Auto-Rig" زیاد کراوە

---

## 🚀 ڕێکخستنی کۆتایی (Final Setup)

### هەنگاو 1: چاوەڕوان بە بۆ تەواوبوونی Installation

```powershell
# Installation script بەردەوامە - چاوەڕوان بە:
# - PyTorch (2.8GB) - downloading...
# - Flask + dependencies
# - UniRig repository clone
```

### هەنگاو 2: دابەزاندنی Pretrained Model

کاتێک installation تەواو بوو:

```powershell
# Method A: دابەزاندنی دەستی
1. بڕۆ بۆ: https://github.com/VAST-AI-Research/UniRig/releases
2. دابەزێنە: unirig_pretrained.pth (or latest model)
3. دایبنێ لە: c:\A\UniRig\pretrained\unirig_pretrained.pth
```

### هەنگاو 3: دەستپێکردنی Server

```powershell
cd c:\A
.\start-unirig-venv.ps1
```

دەبینیت:
```
Starting UniRig API Server...
Model loaded successfully!
Starting server on http://localhost:8000
```

### هەنگاو 4: تەست کردن

```powershell
# Terminal بکەرەوە و:
Invoke-WebRequest -Uri 'http://localhost:8000/health'
```

وەڵام:
```json
{
  "status": "ok",
  "model_loaded": true,
  "device": "cuda:0",
  "cuda_available": true
}
```

### هەنگاو 5: دەستپێکردنی Next.js

```powershell
# Terminal جیاواز
npm run dev
```

### هەنگاو 6: تەست لە Browser

1. بڕۆ بۆ: `http://localhost:3000/physiotherapist/anatomy`
2. دەبینیت دوگمەی **"Auto-Rig (UniRig)"** لە سەرەوە
3. کلیک بکە (دەڵێت server دەستپێ بکە ئەگەر نەکراوە)

---

## 📡 چۆن بەکاری بهێنیت (How to Use)

### بەکارهێنانی سادە لە هەر Component:

```tsx
import { useUniRig } from '@/hooks/useUniRig'

function MyComponent() {
  const { rigModel, loading, error, riggedModel, progress } = useUniRig()

  const handleRig = async () => {
    // مۆدێلی 3D هەیە - extract vertices
    const vertices = [
      [0, 0, 0],
      [1, 0, 0],
      // ... زیاتر
    ]
    
    const result = await rigModel(vertices, null, 'human')
    console.log('Rigged:', result)
  }

  return (
    <div>
      <button onClick={handleRig} disabled={loading}>
        {loading ? `Rigging ${progress.percent}%` : 'Auto-Rig'}
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
```

### یەکخستن لەگەڵ Sketchfab (لە anatomy-3d-model.tsx):

```tsx
import { useUniRig } from '@/hooks/useUniRig'
import { extractMeshData } from '@/lib/unirig-service'

// ناو component:
const { rigModel, loading } = useUniRig()

const handleAutoRigSketchfab = async () => {
  if (!apiRef.current) {
    toast.error("3D model not loaded")
    return
  }
  
  try {
    // Extract mesh data from Sketchfab
    apiRef.current.getSceneGraph((err: any, graph: any) => {
      if (err) {
        toast.error("Failed to get scene graph")
        return
      }
      
      const meshData = extractMeshData(graph)
      
      // Auto-rig
      rigModel(meshData.vertices, meshData.normals, 'human')
        .then(result => {
          toast.success("Model rigged successfully!")
          console.log('Rigged model:', result)
          // بەکاری بهێنە بۆ animation
        })
        .catch(err => {
          toast.error(`Rigging failed: ${err.message}`)
        })
    })
  } catch (error) {
    toast.error("Auto-rig error")
  }
}

// لە JSX:
<button onClick={handleAutoRigSketchfab} disabled={loading}>
  {loading ? `Rigging ${progress.percent}%` : '🤖 Auto-Rig Model'}
</button>
```

---

## 🔧 Troubleshooting

### کێشە 1: "Module 'UniRig' not found"

```powershell
# دڵنیابە UniRig کلۆنکراوە:
cd c:\A
dir UniRig

# ئەگەر نەبوو:
git clone https://github.com/VAST-AI-Research/UniRig.git
```

### کێشە 2: "Model not loaded"

```powershell
# چێک بکە model file هەیە:
dir UniRig\pretrained\

# دابیبەزێنە لە:
# https://github.com/VAST-AI-Research/UniRig/releases
```

### کێشە 3: Server ناکەوێتەوە

```powershell
# چێک بکە port 8000 ئازادە:
netstat -ano | findstr :8000

# ئەگەر بەکارهێنراوە، لە unirig-server.py بیگۆڕە:
port = 8001

# و لە .env.local:
NEXT_PUBLIC_UNIRIG_API_URL=http://localhost:8001
```

### کێشە 4: CORS errors

Server restart بکەرەوە - CORS دەبێت enabled بێت.

### کێشە 5: "CUDA out of memory"

```python
# لە unirig-server.py:
device = torch.device('cpu')  # بەکارهێنانی CPU

# یان batch size کەمبکەرەوە
```

---

## 📊 API Reference

### Server Endpoints:

**GET** `/health`
- وەڵام: `{ status, model_loaded, device, cuda_available }`

**POST** `/api/skeleton/predict`
- Body: `{ vertices: number[][], normals?: number[][], category: string }`
- وەڵام: `{ joints, joint_names, bones, confidence }`

**POST** `/api/skinning/predict`
- Body: `{ vertices: number[][], joints: number[][], bones: number[][] }`
- وەڵام: `{ weights, bone_indices, num_influences }`

**POST** `/api/rig/full`
- Body: `{ vertices, normals?, category }`
- وەڵام: Complete rigged model

### TypeScript Service Methods:

```typescript
class UniRigService {
  async healthCheck(): Promise<HealthStatus>
  async generateSkeleton(vertices, normals?, category?): Promise<SkeletonPrediction>
  async generateSkinning(vertices, joints, bones): Promise<SkinningWeights>
  async rigModel(vertices, normals?, category?): Promise<RiggedModel>
  async exportRiggedModel(model, format): Promise<string>
}
```

### React Hook:

```typescript
useUniRig(options?: { autoRig?: boolean, category?: string })

Returns:
{
  rigModel: (vertices, normals?, category?) => Promise<RiggedModel>
  exportModel: (format) => Promise<string>
  reset: () => void
  loading: boolean
  error: string | null
  riggedModel: RiggedModel | null
  progress: { stage: string, percent: number }
}
```

---

## 🎯 Next Steps

### 1. تەواوکردنی Installation:
- ✅ PyTorch دادەبەزێت (بەردەوامە)
- ⏳ UniRig repository clone
- ⏳ Pretrained model download

### 2. Integration لە Anatomy Viewer:

با handleAutoRig function تەواو بکەین لە `components/anatomy-3d-model.tsx`:

```tsx
// زیادکردنی import
import { useUniRig } from '@/hooks/useUniRig'
import { extractMeshData } from '@/lib/unirig-service'

// ناو component
const { rigModel, loading: rigLoading, progress } = useUniRig()

const handleAutoRig = async () => {
  // implementation as shown above
}

// دوگمە زیاد بکە لە UI
```

### 3. Animation System:

دوای ئەوەی rigging کرا، دەتوانیت animation زیاد بکەیت:

```typescript
// بەکارهێنانی rigged model بۆ animation
if (riggedModel) {
  const { joints, bones, weights } = riggedModel
  
  // Create skeletal animation
  // Apply transformations
  // Update mesh vertices based on joint transforms
}
```

### 4. Export Functionality:

```typescript
const handleExport = async (format: 'gltf' | 'fbx' | 'json') => {
  if (!riggedModel) return
  
  const exported = await service.exportRiggedModel(riggedModel, format)
  
  // Save to file
  const blob = new Blob([exported])
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `rigged_model.${format}`
  a.click()
}
```

---

## 📚 Resources

- **UniRig Paper**: https://arxiv.org/abs/2310.00049
- **GitHub**: https://github.com/VAST-AI-Research/UniRig
- **Documentation**: See `UNIRIG_SETUP.md` and `UNIRIG_QUICK_START.md`

---

## ✅ Checklist

**Installation:**
- ✅ Python 3.13.4 installed
- ✅ Virtual environment created
- ✅ Pip upgraded
- ⏳ PyTorch installing (2.8GB)
- ⏳ Flask + dependencies
- ⏳ UniRig repository clone
- ⏳ Pretrained model download

**Code Files:**
- ✅ Backend: `unirig-server.py`
- ✅ Service: `lib/unirig-service.ts`
- ✅ Hook: `hooks/useUniRig.ts`
- ✅ Config: `.env.local`
- ✅ UI: Auto-Rig button added

**Documentation:**
- ✅ Setup guides created
- ✅ Quick start in Kurdish
- ✅ API reference
- ✅ Troubleshooting guide

**Testing:**
- ⏳ Server health check
- ⏳ Browser integration test
- ⏳ End-to-end rigging test

---

**Status**: Installation بەردەوامە... چاوەڕوان بە بۆ PyTorch download تەواو بوون! 🚀
