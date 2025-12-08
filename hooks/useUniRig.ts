/**
 * UniRig React Hook
 * 
 * React hook for using UniRig rigging service in components
 */

'use client'

import { useState, useCallback } from 'react'
import { unirigService, type RiggedModel, type Vertex, type Normal } from '@/lib/unirig-service'

interface UseUniRigOptions {
  autoRig?: boolean
  category?: string
}

export function useUniRig(options: UseUniRigOptions = {}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [riggedModel, setRiggedModel] = useState<RiggedModel | null>(null)
  const [progress, setProgress] = useState<{
    stage: 'idle' | 'skeleton' | 'skinning' | 'complete'
    percent: number
  }>({ stage: 'idle', percent: 0 })

  /**
   * Rig a 3D model with skeleton and skinning
   */
  const rigModel = useCallback(async (
    vertices: Vertex[],
    normals: Normal[],
    category?: string
  ) => {
    setLoading(true)
    setError(null)
    setProgress({ stage: 'skeleton', percent: 10 })

    try {
      // Check service health
      const isHealthy = await unirigService.healthCheck()
      if (!isHealthy) {
        throw new Error('UniRig service is not available')
      }

      setProgress({ stage: 'skeleton', percent: 30 })

      // Generate skeleton
      const skeleton = await unirigService.generateSkeleton(
        vertices,
        normals,
        category || options.category || 'human'
      )

      setProgress({ stage: 'skinning', percent: 60 })

      // Generate skinning
      const skinning = await unirigService.generateSkinning(
        vertices,
        normals,
        skeleton
      )

      setProgress({ stage: 'complete', percent: 100 })

      const result: RiggedModel = {
        skeleton,
        skinning,
        vertices,
        normals
      }

      setRiggedModel(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      console.error('Rigging failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [options.category])

  /**
   * Export rigged model to file
   */
  const exportModel = useCallback(async (
    format: 'fbx' | 'glb' | 'vrm' = 'glb'
  ) => {
    if (!riggedModel) {
      throw new Error('No rigged model available')
    }

    try {
      const blob = await unirigService.exportRiggedModel(riggedModel, format)
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `rigged_model.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      return blob
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Export failed')
      setError(error)
      throw error
    }
  }, [riggedModel])

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setRiggedModel(null)
    setError(null)
    setProgress({ stage: 'idle', percent: 0 })
  }, [])

  return {
    rigModel,
    exportModel,
    reset,
    loading,
    error,
    riggedModel,
    progress
  }
}
