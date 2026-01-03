"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Sparkles, Tag, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PromoItem {
  id: string
  type: 'ad' | 'offer'
  title: string
  description: string
  imageUrl?: string
  link?: string
  discount?: string // For offers: "20%", "50%", etc.
  validUntil?: string // For offers
}

interface PromoSliderProps {
  userType?: 'all' | 'pro' | 'free'
}

export function PromoSlider({ userType = 'all' }: PromoSliderProps) {
  const [items, setItems] = useState<PromoItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchPromoItems()
  }, [userType])

  useEffect(() => {
    if (items.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
      }, 6000) // Change every 6 seconds

      return () => clearInterval(interval)
    }
  }, [items.length])

  const fetchPromoItems = async () => {
    try {
      // Fetch ads
      const adsResponse = await fetch(`/api/ads?status=active&targetAudience=${userType}`)
      const ads = adsResponse.ok ? await adsResponse.json() : []

      // Transform ads to promo items
      const adItems: PromoItem[] = ads
        .filter((ad: any) => ad.position === 'top')
        .map((ad: any) => ({
          id: ad.id,
          type: 'ad' as const,
          title: ad.title,
          description: ad.description,
          imageUrl: ad.imageUrl,
          link: ad.link
        }))

      // Combine ads with offers (offers would come from another API in the future)
      // For now, we can add some sample offers or leave it for ads only
      const allItems = [...adItems]
      
      setItems(allItems)
      
      // Track views
      allItems.forEach((item) => {
        if (item.type === 'ad') {
          trackAdView(item.id)
        }
      })
    } catch (error) {
      console.error('Error fetching promo items:', error)
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

  const handleItemClick = (item: PromoItem) => {
    if (item.type === 'ad') {
      trackAdClick(item.id)
    }
    if (item.link) {
      window.open(item.link, '_blank')
    }
  }

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  // Different gradient styles for ads vs offers
  const getGradientClass = (type: 'ad' | 'offer') => {
    if (type === 'offer') {
      return 'bg-gradient-to-l from-[#F59E0B] via-[#F97316] to-[#EF4444]' // Orange to red for offers
    }
    return 'bg-gradient-to-l from-[#0EA5E9] to-[#38BDF8]' // Blue for ads
  }

  const getIcon = (type: 'ad' | 'offer') => {
    if (type === 'offer') {
      return <Tag className="w-6 h-6" />
    }
    return <Sparkles className="w-6 h-6" />
  }

  return (
    <div className="relative w-full mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`relative w-full rounded-2xl overflow-hidden ${getGradientClass(currentItem.type)} p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
          onClick={() => handleItemClick(currentItem)}
        >
          {/* Type Badge */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
            {getIcon(currentItem.type)}
            <span className="text-white font-semibold text-sm">
              {currentItem.type === 'offer' ? 'ئۆفەری تایبەت' : 'رێکلام'}
            </span>
          </div>

          {/* Discount Badge for Offers */}
          {currentItem.type === 'offer' && currentItem.discount && (
            <div className="absolute top-4 right-4 bg-white text-[#EF4444] font-black text-3xl px-6 py-3 rounded-2xl shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-6 h-6" />
                <span>{currentItem.discount}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-6 mt-8">
            {/* Content */}
            <div className="flex-1 text-right">
              <h3 className="text-white font-bold text-2xl md:text-4xl mb-3 drop-shadow-lg">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="text-white/95 text-base md:text-xl leading-relaxed drop-shadow-md">
                  {currentItem.description}
                </p>
              )}
              {currentItem.type === 'offer' && currentItem.validUntil && (
                <p className="text-white/80 text-sm md:text-base mt-2">
                  تا: {currentItem.validUntil}
                </p>
              )}
            </div>

            {/* Button */}
            {currentItem.link && (
              <div className="flex-shrink-0">
                <div className="group px-8 py-4 rounded-2xl bg-white hover:bg-white/90 font-bold text-xl hover:scale-110 transition-all duration-300 shadow-2xl flex items-center gap-3">
                  <span className={currentItem.type === 'offer' ? 'text-[#F97316]' : 'text-[#0EA5E9]'}>
                    {currentItem.type === 'offer' ? 'وەربگرە' : 'نیشتا'}
                  </span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {items.length > 1 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <motion.div
                key={`progress-${currentIndex}`}
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Indicator Dots */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-3 bg-gradient-to-r from-[#0EA5E9] to-[#F97316]'
                  : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
