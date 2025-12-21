// Utility to refresh expired video URLs
export async function refreshVideoURL(videoName: string): Promise<string | null> {
  try {
    const response = await fetch(`/api/videos?name=${encodeURIComponent(videoName)}`)
    if (response.ok) {
      const data = await response.json()
      if (data.videos && data.videos.length > 0) {
        return data.videos[0].url
      }
    }
  } catch (error) {
    console.error('Failed to refresh video URL:', videoName, error)
  }
  return null
}

export async function refreshExerciseVideos(exercise: any): Promise<any> {
  if (!exercise.videos || !Array.isArray(exercise.videos)) {
    return exercise
  }
  
  const refreshedVideos = await Promise.all(
    exercise.videos.map(async (video: any) => {
      if (video.name) {
        const freshUrl = await refreshVideoURL(video.name)
        if (freshUrl) {
          return { ...video, url: freshUrl }
        }
      }
      return video
    })
  )
  
  return {
    ...exercise,
    videos: refreshedVideos,
    videoUrls: refreshedVideos.map(v => v.url).filter(Boolean),
    videoUrl: refreshedVideos[0]?.url || exercise.videoUrl
  }
}
