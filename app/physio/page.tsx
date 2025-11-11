"use client"

import { useEffect, useState } from "react"
import AppBottomNav from "@/components/app-bottom-nav"
import { HeartPulse, Plus, CheckCircle2, Circle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhysioRequest {
  id: string
  physioId: string
  physioName: string
  injuryType: string
  painPercent: number
  notes?: string
  status: "pending" | "accepted" | "rejected"
  createdAt: number
}

// Placeholder physiotherapist list (would come from API/dbService)
const physiotherapists = [
  { id: "p1", name: "Dr. Aylin" },
  { id: "p2", name: "Dr. Kemal" },
  { id: "p3", name: "Dr. Rana" },
]

export default function PhysioPage() {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [requests, setRequests] = useState<PhysioRequest[]>([])
  const [form, setForm] = useState({ physioId: "p1", injuryType: "", painPercent: 50, notes: "" })
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Load persisted requests & completed flags
    try {
      const raw = localStorage.getItem("physioRequests")
      if (raw) setRequests(JSON.parse(raw))
      const doneRaw = localStorage.getItem("physioCompleted")
      if (doneRaw) setCompleted(JSON.parse(doneRaw))
    } catch {}
  }, [])

  const persist = (next: PhysioRequest[]) => {
    try { localStorage.setItem("physioRequests", JSON.stringify(next)) } catch {}
  }

  const toggleCompleted = (id: string) => {
    setCompleted(prev => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem("physioCompleted", JSON.stringify(next)) } catch {}
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.injuryType.trim()) return
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      const physioName = physiotherapists.find(p => p.id === form.physioId)?.name || "Unknown"
      const newReq: PhysioRequest = {
        id: crypto.randomUUID(),
        physioId: form.physioId,
        physioName,
        injuryType: form.injuryType.trim(),
        painPercent: form.painPercent,
        notes: form.notes.trim() || undefined,
        status: "pending",
        createdAt: Date.now(),
      }
      const next = [newReq, ...requests]
      setRequests(next)
      persist(next)
      setForm({ physioId: form.physioId, injuryType: "", painPercent: 50, notes: "" })
      setSubmitting(false)
    }, 700)
  }

  return (
    <div className="pb-24 max-w-md mx-auto">
      <header className="pt-6 pb-4 px-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-pink-400" /> Physiotherapy
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300">{requests.length}</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Request a queue slot and track your injury recovery.</p>
        <p className="text-slate-500 text-xs mt-1">
          You have {requests.length} request{requests.length === 1 ? '' : 's'} • {requests.filter(r => completed[r.id]).length} completed
        </p>
      </header>

      <section className="px-4 space-y-5">
        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center gap-2"><HeartPulse className="w-4 h-4 text-pink-400" /> Send Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400">Physiotherapist</Label>
                <select
                  value={form.physioId}
                  onChange={e => setForm({ ...form, physioId: e.target.value })}
                  className="w-full h-11 rounded-lg bg-slate-800 border border-slate-700 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                >
                  {physiotherapists.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400">Injury Type</Label>
                <Input
                  value={form.injuryType}
                  onChange={e => setForm({ ...form, injuryType: e.target.value })}
                  placeholder="e.g. Knee ligament strain"
                  className="bg-slate-950 border-slate-700 h-11 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400 flex justify-between">
                  <span>Pain Percentage</span>
                  <span className="text-pink-400 font-semibold">{form.painPercent}%</span>
                </Label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.painPercent}
                  onChange={e => setForm({ ...form, painPercent: parseInt(e.target.value) })}
                  className="w-full accent-pink-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400">Notes (optional)</Label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder="Extra context..."
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 text-sm p-3 resize-none"
                />
              </div>
              <Button type="submit" disabled={submitting || !form.injuryType.trim()} className="w-full bg-pink-600 hover:bg-pink-500 h-11 text-sm font-semibold flex items-center justify-center gap-2">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? 'Sending...' : 'Send Request'}
                <Plus className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-pink-400" /> Your Requests
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">{requests.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {requests.map(r => {
              const done = !!completed[r.id]
              return (
                <div key={r.id} className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between">
                  <div className="text-xs">
                    <p className={`text-white font-semibold ${done ? 'line-through text-slate-500' : ''}`}>{r.injuryType}</p>
                    <p className="text-slate-400 mt-0.5">{r.physioName} • Pain {r.painPercent}% • {r.status}</p>
                    {r.notes && <p className="text-slate-500 mt-0.5 line-clamp-1">{r.notes}</p>}
                  </div>
                  <button onClick={() => toggleCompleted(r.id)} className="ml-3">
                    {done ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-slate-500" />}
                  </button>
                </div>
              )
            })}
            {!requests.length && <p className="text-slate-500 text-sm">No requests yet.</p>}
          </CardContent>
        </Card>
      </section>

      <AppBottomNav />
    </div>
  )
}
