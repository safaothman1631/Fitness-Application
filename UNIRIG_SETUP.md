/**
 * UniRig Setup Guide
 * 
 * How to set up and use UniRig for automatic 3D model rigging
 */

# UniRig Integration - Setup Guide

## 🎯 Overview

UniRig is now integrated into the Fitness Application for automatic 3D model rigging:
- **Skeleton Generation**: AI-powered automatic skeleton creation
- **Skinning Weights**: Automatic bone-vertex weight calculation
- **Export**: FBX, GLB, VRM format support

## 📦 Installation

### Option 1: Local UniRig Server (Recommended for Development)

1. **Clone UniRig Repository:**
```bash
git clone https://github.com/VAST-AI-Research/UniRig
cd UniRig
```

2. **Set up Python Environment:**
```bash
conda create -n UniRig python=3.11
conda activate UniRig
python -m pip install torch torchvision
python -m pip install -r requirements.txt
```

3. **Download Pre-trained Models:**
```bash
# Models will be downloaded from Hugging Face automatically
# Or manually download from: https://huggingface.co/VAST-AI/UniRig
```

4. **Start UniRig API Server:**
```bash
# Create a simple Flask API wrapper (see server-example.py below)
python server.py
```

### Option 2: Cloud API (Coming Soon)

Wait for VAST-AI to release their hosted API service.

## 🔧 Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_UNIRIG_API_URL=http://localhost:8000
NEXT_PUBLIC_UNIRIG_API_KEY=your_api_key_here  # Optional for local
```

## 💻 Usage in Components

### Basic Usage

```tsx
import { useUniRig } from '@/hooks/useUniRig'
import { extractMeshData } from '@/lib/unirig-service'

function MyComponent() {
  const { rigModel, loading, riggedModel, progress } = useUniRig()

  const handleRigModel = async () => {
    // Get model data from Sketchfab or other source
    const modelData = await fetchModelData()
    const { vertices, normals } = extractMeshData(modelData)

    // Generate skeleton + skinning
    const rigged = await rigModel(vertices, normals, 'human')
    
    console.log('Rigged model:', rigged)
  }

  return (
    <div>
      <button onClick={handleRigModel} disabled={loading}>
        {loading ? `Processing... ${progress.percent}%` : 'Rig Model'}
      </button>
      
      {riggedModel && (
        <div>
          <p>Skeleton: {riggedModel.skeleton.joints.length} joints</p>
          <p>Skinning: {riggedModel.skinning.length} vertices</p>
        </div>
      )}
    </div>
  )
}
```

### Export Rigged Model

```tsx
const { exportModel } = useUniRig()

// Export to GLB
await exportModel('glb')

// Export to FBX
await exportModel('fbx')

// Export to VRM (for VRoid avatars)
await exportModel('vrm')
```

## 🏗️ Simple API Server Example

Create `server.py` in your UniRig folder:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import numpy as np
from src.model.unirig_ar import UniRigAR
from src.model.unirig_skin import UniRigSkin

app = Flask(__name__)
CORS(app)

# Load models
skeleton_model = UniRigAR.from_pretrained('path/to/skeleton/checkpoint')
skinning_model = UniRigSkin.from_pretrained('path/to/skinning/checkpoint')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/api/skeleton/predict', methods=['POST'])
def predict_skeleton():
    data = request.json
    vertices = torch.tensor(data['vertices'], dtype=torch.float32)
    normals = torch.tensor(data['normals'], dtype=torch.float32)
    
    with torch.no_grad():
        result = skeleton_model.generate(vertices, normals, cls=data.get('category'))
    
    return jsonify({
        'skeleton': {
            'joints': result.joints.tolist(),
            'tails': result.tails.tolist(),
            'parents': result.parents,
            'names': result.names
        }
    })

@app.route('/api/skinning/predict', methods=['POST'])
def predict_skinning():
    data = request.json
    vertices = torch.tensor(data['vertices'], dtype=torch.float32)
    normals = torch.tensor(data['normals'], dtype=torch.float32)
    joints = torch.tensor(data['joints'], dtype=torch.float32)
    
    with torch.no_grad():
        skin_weights = skinning_model.predict_step({
            'vertices': vertices,
            'normals': normals,
            'joints': joints,
            'tails': torch.tensor(data['tails']),
            'parents': torch.tensor(data['parents'])
        })
    
    skinning = []
    for i, weights in enumerate(skin_weights[0]):
        bone_weights = []
        for j, w in enumerate(weights):
            if w > 0.01:  # Filter small weights
                bone_weights.append({'boneIndex': j, 'weight': float(w)})
        skinning.append({'vertexIndex': i, 'boneWeights': bone_weights})
    
    return jsonify({'skinning': skinning})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
```

Install Flask dependencies:
```bash
pip install flask flask-cors
```

Run server:
```bash
python server.py
```

## 🎨 Integration with Anatomy Viewer

Update your anatomy component to use UniRig:

```tsx
import { useUniRig } from '@/hooks/useUniRig'

function AnatomyViewer() {
  const { rigModel, loading, riggedModel } = useUniRig({ category: 'human' })
  
  const handleAutoRig = async () => {
    // Get current Sketchfab model data
    const modelData = await getCurrentModelData()
    const { vertices, normals } = extractMeshData(modelData)
    
    // Auto-generate rigging
    await rigModel(vertices, normals)
  }
  
  return (
    <div>
      {/* Your existing anatomy viewer */}
      
      <button onClick={handleAutoRig}>
        {loading ? 'Auto-Rigging...' : 'Auto-Rig Model'}
      </button>
    </div>
  )
}
```

## 🚀 Benefits for Physiotherapy App

1. **Automatic Skeleton Detection**: AI identifies all bones in 3D models
2. **Accurate Skinning**: Proper vertex weights for realistic movement
3. **Animation Ready**: Rigged models can be animated for exercises
4. **Educational**: Show accurate anatomical structures

## 📝 Next Steps

1. Set up local UniRig server (see above)
2. Test with simple 3D models first
3. Integrate with Sketchfab models
4. Add animation capabilities
5. Consider cloud hosting for production

## 🔗 Resources

- UniRig GitHub: https://github.com/VAST-AI-Research/UniRig
- UniRig Paper: https://arxiv.org/abs/2504.12451
- Models: https://huggingface.co/VAST-AI/UniRig
- Datasets: https://huggingface.co/datasets/Seed3D/Articulation-XL2.0

## ⚠️ Notes

- UniRig requires GPU (8GB+ VRAM recommended)
- Processing time: 5-30 seconds per model depending on complexity
- Models work best with clean, manifold meshes
- Tested formats: OBJ, FBX, GLB, VRM
