"""
UniRig Flask API Server (Mock Mode)
Demo server with mock data for testing UI without full AI setup
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import time

# Mock mode - no actual UniRig needed for demo
MOCK_MODE = True
print("🎭 Running in MOCK MODE - generating demo data for testing")

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

def generate_mock_skeleton(num_joints=24):
    """Generate mock skeleton data for demo"""
    joint_names = [
        "root", "spine1", "spine2", "spine3", "neck", "head",
        "left_shoulder", "left_elbow", "left_wrist", "left_hand",
        "right_shoulder", "right_elbow", "right_wrist", "right_hand",
        "left_hip", "left_knee", "left_ankle", "left_foot",
        "right_hip", "right_knee", "right_ankle", "right_foot",
        "jaw", "eyes"
    ][:num_joints]
    
    # Generate random joint positions
    joints = [[random.uniform(-1, 1), random.uniform(0, 2), random.uniform(-0.5, 0.5)] 
              for _ in range(num_joints)]
    
    # Generate bone connections (parent-child pairs)
    bones = [[i, i+1] for i in range(num_joints-1)]
    
    return {
        "joints": joints,
        "joint_names": joint_names,
        "bones": bones,
        "confidence": random.uniform(0.85, 0.98)
    }

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'mode': 'mock',
        'message': 'Running in demo mode with mock data'
    })

@app.route('/api/skeleton', methods=['POST'])
def predict_skeleton():
    """
    Generate skeleton from mesh vertices (Mock Mode)
    
    Body:
    {
        "vertices": [[x, y, z], ...],
        "normals": [[nx, ny, nz], ...],  # optional
        "category": "human"  # or "quadruped"
    }
    
    Returns:
    {
        "joints": [[x, y, z], ...],
        "joint_names": ["root", "spine", ...],
        "bones": [[parent_idx, child_idx], ...]
    }
    """
    try:
        data = request.get_json()
        category = data.get('category', 'human')
        
        # Simulate processing time
        time.sleep(random.uniform(0.5, 1.5))
        
        # Generate mock skeleton
        skeleton = generate_mock_skeleton(24 if category == 'human' else 18)
        
        return jsonify(skeleton)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/skinning', methods=['POST'])
def predict_skinning():
    """
    Generate skinning weights for mesh vertices (Mock Mode)
    
    Body:
    {
        "vertices": [[x, y, z], ...],
        "joints": [[x, y, z], ...],
        "bones": [[parent, child], ...]
    }
    
    Returns:
    {
        "weights": [[w0, w1, w2, ...], ...],  # per vertex
        "bone_indices": [[b0, b1, b2, ...], ...]  # per vertex
    }
    """
    try:
        data = request.get_json()
        vertices = data.get('vertices', [])
        joints = data.get('joints', [])
        num_vertices = len(vertices)
        num_joints = len(joints)
        
        # Simulate processing time
        time.sleep(random.uniform(1.0, 2.0))
        
        # Generate mock skinning weights (4 influences per vertex)
        weights = []
        bone_indices = []
        
        for _ in range(num_vertices):
            # Random bone indices
            indices = random.sample(range(min(num_joints, 10)), min(4, num_joints))
            # Random weights that sum to 1.0
            w = [random.random() for _ in range(len(indices))]
            total = sum(w)
            w = [x/total for x in w]
            
            weights.append(w)
            bone_indices.append(indices)
        
        return jsonify({
            'weights': weights,
            'bone_indices': bone_indices,
            'num_influences': 4
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/rig/full', methods=['POST'])
def full_rig():
    """
    Complete rigging pipeline: skeleton + skinning (Mock Mode)
    
    Body:
    {
        "vertices": [[x, y, z], ...],
        "normals": [[nx, ny, nz], ...],  # optional
        "faces": [[v0, v1, v2], ...],  # optional
        "category": "human"
    }
    
    Returns:
    {
        "joints": [...],
        "joint_names": [...],
        "bones": [...],
        "weights": [...],
        "bone_indices": [...]
    }
    """
    try:
        data = request.get_json()
        vertices = data.get('vertices', [])
        category = data.get('category', 'human')
        num_vertices = len(vertices)
        
        # Simulate longer processing time for full rig
        time.sleep(random.uniform(2.0, 3.0))
        
        # Generate skeleton
        skeleton = generate_mock_skeleton(24 if category == 'human' else 18)
        num_joints = len(skeleton['joints'])
        
        # Generate skinning weights
        weights = []
        bone_indices = []
        
        for _ in range(num_vertices):
            indices = random.sample(range(min(num_joints, 10)), min(4, num_joints))
            w = [random.random() for _ in range(len(indices))]
            total = sum(w)
            w = [x/total for x in w]
            
            weights.append(w)
            bone_indices.append(indices)
        
        return jsonify({
            'skeleton': skeleton,
            'skinning': {
                'weights': weights,
                'bone_indices': bone_indices,
                'num_influences': 4
            },
            'joints': skeleton['joints'],
            'joint_names': skeleton['joint_names'],
            'bones': skeleton['bones'],
            'weights': weights,
            'bone_indices': bone_indices,
            'confidence': skeleton['confidence']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/export', methods=['POST'])
def export_model():
    """
    Export rigged model in various formats
    
    Body:
    {
        "format": "gltf" | "fbx" | "json",
        "vertices": [...],
        "faces": [...],
        "joints": [...],
        "weights": [...],
        ...
    }
    
    Returns file data
    """
    try:
        data = request.get_json()
        format_type = data.get('format', 'json')
        
        # Mock mode: return all formats as JSON (for demo purposes)
        # In production, this would convert to actual FBX/GLB/VRM formats
        export_data = {
            'format': format_type,
            'vertices': data.get('vertices', []),
            'skeleton': data.get('skeleton', {}),
            'skinning': data.get('skinning', {}),
            'exported_at': 'mock-export',
            'note': f'This is a mock {format_type.upper()} export in JSON format for demo'
        }
        
        return jsonify(export_data)
            
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 8000))
    print(f"\n🚀 Starting UniRig API server (MOCK MODE) on port {port}...")
    print(f"📍 API endpoints:")
    print(f"   GET  http://localhost:{port}/health")
    print(f"   POST http://localhost:{port}/api/skeleton")
    print(f"   POST http://localhost:{port}/api/skinning")
    print(f"   POST http://localhost:{port}/api/rig/full")
    print(f"   POST http://localhost:{port}/api/export")
    print(f"\n✅ Ready to accept requests with mock data!\n")
    
    app.run(host='0.0.0.0', port=port, debug=False)
