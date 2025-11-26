"use client"
import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Food {
  id: number
  name: string
  type: string
  category: string
  calories: number
  protein: number
  carbs: number
  fat: number
  vitamins: Record<string, number>
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
            <Card key={food.id} className="p-4 flex gap-4 items-start hover:shadow-lg transition-shadow">
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
    </div>
  )
}
