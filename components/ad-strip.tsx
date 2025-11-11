"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export type AdItem = {
  id: string
  title: string
  icon: any
  href?: string
}

export default function AdStrip({ items, className }: { items: AdItem[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-5 gap-2", className)}>
      {items.map((item) => (
        <AdCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function AdCard({ item }: { item: AdItem }) {
  const Card = (
    <div className="flex flex-col items-center gap-1">
      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
        <item.icon className="w-6 h-6 text-slate-300" />
      </div>
      <span className="text-[11px] text-slate-400 text-center leading-tight">
        {item.title}
      </span>
    </div>
  )

  if (item.href) {
    const isExternal = item.href.startsWith("http")
    return isExternal ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
        {Card}
      </a>
    ) : (
      <Link href={item.href} className="hover:opacity-90 transition-opacity">
        {Card}
      </Link>
    )
  }

  return Card
}
