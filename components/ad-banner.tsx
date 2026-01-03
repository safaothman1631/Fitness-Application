"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Ad {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
  position: 'top' | 'bottom' | 'sidebar'
}

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar'
  userType?: 'all' | 'pro' | 'free'
}

export function AdBanner({ position, userType = 'all' }: AdBannerProps) {
  const [ads, setAds] = useState<Ad[]>([])
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    fetchAds()
  }, [position, userType])

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length)
      }, 8000) // Change ad every 8 seconds

      return () => clearInterval(interval)
    }
  }, [ads.length])

  const fetchAds = async () => {
    try {
      const response = await fetch(`/api/ads?status=active&targetAudience=${userType}`)
      if (response.ok) {
        const allAds = await response.json()
        const filteredAds = allAds.filter((ad: any) => ad.position === position)
        setAds(filteredAds)
        
        // Track view
        filteredAds.forEach((ad: any) => {
          trackAdView(ad.id)
        })
      }
    } catch (error) {
      console.error('Error fetching ads:', error)
    }
  }

  const trackAdView = async (adId: string) => {
    try {
      await fetch(`/api/ads/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId, type: 'view' })
      })
    } catch (error) {
      console.error('Error tracking view:', error)
    }
  }

  const trackAdClick = async (adId: string) => {
    try {
      await fetch(`/api/ads/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId, type: 'click' })
      })
    } catch (error) {
      console.error('Error tracking click:', error)
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  const handleAdClick = (ad: Ad) => {
    trackAdClick(ad.id)
    if (ad.link) {
      window.open(ad.link, '_blank')
    }
  }

  if (!isVisible || ads.length === 0) return null

  const currentAd = ads[currentAdIndex]

  // Sidebar style
  if (position === 'sidebar') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isClosing ? 0 : 1, x: isClosing ? 20 : 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 backdrop-blur-sm group hover:border-purple-500/50 transition-all duration-300"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div
            onClick={() => handleAdClick(currentAd)}
            className="cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={currentAd.imageUrl}
                alt={currentAd.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {currentAd.title}
              </h3>
              {currentAd.description && (
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {currentAd.description}
                </p>
              )}
              {currentAd.link && (
                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                  <span>Learn More</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Ad indicator dots */}
            {ads.length > 1 && (
              <div className="flex justify-center gap-1.5 pb-3">
                {ads.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentAdIndex
                        ? 'w-6 bg-purple-400'
                        : 'w-1.5 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Top/Bottom banner style
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
        animate={{ opacity: isClosing ? 0 : 1, y: isClosing ? (position === 'top' ? -20 : 20) : 0 }}
        exit={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 border border-purple-500/30 backdrop-blur-sm group hover:border-purple-500/50 transition-all duration-300"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div
          onClick={() => handleAdClick(currentAd)}
          className="flex flex-col md:flex-row items-center gap-6 p-6 cursor-pointer"
        >
          {/* Image */}
          <div className="relative w-full md:w-64 h-40 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={currentAd.imageUrl}
              alt={currentAd.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-white font-bold text-2xl mb-2">
              {currentAd.title}
            </h3>
            {currentAd.description && (
              <p className="text-gray-300 text-base mb-4 line-clamp-2">
                {currentAd.description}
              </p>
            )}
            {currentAd.link && (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105">
                <span>Learn More</span>
                <ExternalLink className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Ad indicator dots */}
          {ads.length > 1 && (
            <div className="flex md:flex-col gap-2 absolute bottom-3 left-1/2 md:left-auto md:right-6 transform -translate-x-1/2 md:translate-x-0">
              {ads.map((_, index) => (
                <div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentAdIndex
                      ? 'w-2 h-6 md:w-6 md:h-2 bg-purple-400'
                      : 'w-2 h-2 bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
