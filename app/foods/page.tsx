"use client"
import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Flame, Beef, Wheat, Droplet } from "lucide-react"

interface Food {
  id: string
  name: string
  type: string
  category: string
  calories: number
  protein: number
  carbs: number
  fat: number
  vitamins: string
  country: string
  image: string
  description: string
}

const FOOD_TYPES = [
  "fruit",
  "vegetable",
  "meat",
  "grain",
  "drink",
  "meal",
  "snack",
  "salad",
  "soup",
  "bakery"
]

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([])
  const [type, setType] = useState("")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)

  useEffect(() => {
    async function fetchFoods() {
      setLoading(true)
      let url = "/api/foods"
      const params: string[] = []
      if (type) params.push(`type=${type}`)
      if (search) params.push(`q=${encodeURIComponent(search)}`)
      if (params.length) url += `?${params.join("&")}`
      const res = await fetch(url)
      const data = await res.json()
      setFoods(data)
      setLoading(false)
    }
    fetchFoods()
  }, [type, search])

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Foods Search & Filter</h1>
      <div className="flex gap-4 mb-6">
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-40 px-3 py-2 border rounded-md bg-white dark:bg-slate-800"
        >
          <option value="">All Types</option>
          {FOOD_TYPES.map(t => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search foods..."
          className="flex-1"
        />
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map(food => (
            <Card 
              key={food.id} 
              className="p-4 flex gap-4 items-start hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => setSelectedFood(food)}
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-24 h-24 object-cover rounded-lg"
                onError={e => (e.currentTarget.src = "/placeholder.jpg")}
              />
              <div className="flex-1">
                <div className="font-semibold text-lg mb-1">{food.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{food.type} | {food.category}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mb-2 line-clamp-2">{food.description}</div>
                <div className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded">
                  <div>Cal: {food.calories} | P: {food.protein}g</div>
                  <div>C: {food.carbs}g | F: {food.fat}g</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {!loading && foods.length === 0 && (
        <div className="text-center py-8 text-slate-500">No foods found</div>
      )}

      {/* Food Detail Dialog */}
      <Dialog open={!!selectedFood} onOpenChange={(open) => !open && setSelectedFood(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {selectedFood?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedFood && (
            <div className="space-y-6">
              {/* Food Image */}
              <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  className="w-full h-full object-cover"
                  onError={e => (e.currentTarget.src = "/placeholder.jpg")}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white text-sm font-semibold">
                    {selectedFood.type}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/90 text-white text-sm">
                    {selectedFood.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-900/70 rounded-lg p-4">
                <p className="text-slate-300 leading-relaxed">{selectedFood.description}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                  <span className="px-2 py-1 rounded bg-slate-800">🌍 {selectedFood.country}</span>
                </div>
              </div>

              {/* Nutrition Facts */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    Nutrition Facts
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{selectedFood.calories}</p>
                      <p className="text-xs text-slate-400 mt-1">Calories</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <Beef className="w-6 h-6 text-red-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-red-400">{selectedFood.protein}g</p>
                      <p className="text-xs text-slate-400 mt-1">Protein</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <Wheat className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-amber-400">{selectedFood.carbs}g</p>
                      <p className="text-xs text-slate-400 mt-1">Carbs</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <Droplet className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-yellow-400">{selectedFood.fat}g</p>
                      <p className="text-xs text-slate-400 mt-1">Fat</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Vitamins */}
              {selectedFood.vitamins && (
                <Card className="bg-slate-900/70 border-slate-800">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">💊 Vitamins & Minerals</h3>
                    <p className="text-slate-300">{selectedFood.vitamins}</p>
                  </div>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
