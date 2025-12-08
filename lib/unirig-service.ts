/**
 * UniRig Integration Service
 * 
 * Integrates VAST-AI-Research/UniRig for automatic 3D model rigging
 * - Skeleton generation from 3D meshes
 * - Skinning weight prediction
 * - Bone attribute prediction
 * 
 * @see https://github.com/VAST-AI-Research/UniRig
 */

export interface Vertex {
  x: number
  y: number
  z: number
}

export interface Normal {
  x: number
  y: number
  z: number
}

export interface Joint {
  position: [number, number, number]
  name: string
  parent: number | null
}

export interface SkeletonPrediction {
  joints: Joint[] | [number, number, number][]
  joint_names?: string[]
  bones?: [number, number][]
  tails?: [number, number, number][]
  parents?: (number | null)[]
  names?: string[]
  confidence?: number
}

export interface SkinningWeights {
  vertexIndex: number
  boneWeights: { boneIndex: number; weight: number }[]
}

export interface RiggedModel {
  skeleton: SkeletonPrediction
  skinning: SkinningWeights[]
  vertices: Vertex[]
  normals: Normal[]
}

/**
 * UniRig Service Class
 * Handles communication with UniRig API/local server
 */
export class UniRigService {
  private apiEndpoint: string
  private apiKey?: string

  constructor(endpoint: string = 'http://localhost:8000', apiKey?: string) {
    this.apiEndpoint = endpoint
    this.apiKey = apiKey
  }

  /**
   * Generate skeleton from 3D model vertices and normals
   */
  async generateSkeleton(
    vertices: Vertex[],
    normals: Normal[],
    category?: string
  ): Promise<SkeletonPrediction> {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/skeleton`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          vertices: vertices.map(v => [v.x, v.y, v.z]),
          normals: normals.map(n => [n.x, n.y, n.z]),
          category: category || 'human'
        })
      })

      if (!response.ok) {
        throw new Error(`UniRig API error: ${response.statusText}`)
      }

      const data = await response.json()
      // Mock server returns data directly, not nested in skeleton
      return data
    } catch (error) {
      console.error('Failed to generate skeleton:', error)
      throw error
    }
  }

  /**
   * Generate skinning weights based on skeleton and mesh
   */
  async generateSkinning(
    vertices: Vertex[],
    normals: Normal[],
    skeleton: SkeletonPrediction
  ): Promise<SkinningWeights[]> {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/skinning`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          vertices: vertices.map(v => [v.x, v.y, v.z]),
          normals: normals.map(n => [n.x, n.y, n.z]),
          joints: skeleton.joints || [],
          bones: skeleton.bones || []
        })
      })

      if (!response.ok) {
        throw new Error(`UniRig API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.skinning
    } catch (error) {
      console.error('Failed to generate skinning:', error)
      throw error
    }
  }

  /**
   * Complete rigging pipeline: skeleton + skinning in one call
   */
  async rigModel(
    vertices: Vertex[],
    normals: Normal[],
    category?: string
  ): Promise<RiggedModel> {
    try {
      // Step 1: Generate skeleton
      const skeleton = await this.generateSkeleton(vertices, normals, category)

      // Step 2: Generate skinning weights
      const skinning = await this.generateSkinning(vertices, normals, skeleton)

      return {
        skeleton,
        skinning,
        vertices,
        normals
      }
    } catch (error) {
      console.error('Failed to rig model:', error)
      throw error
    }
  }

  /**
   * Export rigged model to various formats
   */
  async exportRiggedModel(
    riggedModel: RiggedModel,
    format: 'fbx' | 'glb' | 'vrm' = 'glb'
  ): Promise<Blob> {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          format,
          vertices: riggedModel.vertices,
          skeleton: riggedModel.skeleton,
          skinning: riggedModel.skinning
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Export failed: ${errorText || response.statusText}`)
      }

      // Convert JSON response to blob for download
      const data = await response.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      return blob
    } catch (error) {
      console.error('Failed to export model:', error)
      throw error
    }
  }

  /**
   * Health check for UniRig service
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiEndpoint}/health`)
      return response.ok
    } catch {
      return false
    }
  }
}

/**
 * Utility: Extract vertices and normals from Sketchfab model data
 */
export function extractMeshData(modelData: any): { vertices: Vertex[], normals: Normal[] } {
  // This would parse the actual model data format
  // Implementation depends on how you fetch the model from Sketchfab
  
  const vertices: Vertex[] = []
  const normals: Normal[] = []

  // Example parsing (adjust based on actual data structure)
  if (modelData.vertices && Array.isArray(modelData.vertices)) {
    for (let i = 0; i < modelData.vertices.length; i += 3) {
      vertices.push({
        x: modelData.vertices[i],
        y: modelData.vertices[i + 1],
        z: modelData.vertices[i + 2]
      })
    }
  }

  if (modelData.normals && Array.isArray(modelData.normals)) {
    for (let i = 0; i < modelData.normals.length; i += 3) {
      normals.push({
        x: modelData.normals[i],
        y: modelData.normals[i + 1],
        z: modelData.normals[i + 2]
      })
    }
  }

  return { vertices, normals }
}

/**
 * Client-side singleton instance
 */
export const unirigService = new UniRigService(
  process.env.NEXT_PUBLIC_UNIRIG_API_URL || 'http://localhost:8000',
  process.env.NEXT_PUBLIC_UNIRIG_API_KEY
)
