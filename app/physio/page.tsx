"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/auth-guard"    <>
    <Toaster position="top-center" richColors />
    <SubscriptionRequiredGuard>
    <PageTransition>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F43F5E] to-[#FB7185] bg-clip-text text-transparent mb-2">
          {t("physiotherapyTitle")}
        </h1>
        <p className="text-[#B6C4CF] mb-8">{t("physioSubtitle")}</p>

        <Card className="bg-gradient-to-r from-[#F43F5E] to-[#FB7185] border-none p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-white text-xl font-bold mb-2">{t("recoverAndHeal")}</h3>
            <p className="text-white/90 text-sm mb-4">{t("recoverAndHealDesc")}</p>
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <span>{requests.length} {t("requestsLabel")}</span>
              <span>•</span>
              <span>{requests.filter(r => r.completed).length} {t("completedLabel")}</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={HeartPulse} label={t("totalRequests")} value={requests.length.toString()} color="#F43F5E" />
          <StatsCard icon={CheckCircle2} label={t("completedLabel")} value={requests.filter(r => r.completed).length.toString()} color="#FB7185" />
          <StatsCard icon={Calendar} label={t("pendingLabel")} value={requests.filter(r => !r.completed).length.toString()} color="#FDA4AF" />
          <StatsCard icon={Target} label={t("recoveryRate")} value={requests.length > 0 ? Math.round((requests.filter(r => r.completed).length / requests.length) * 100) + "%" : "0%"} color="#F43F5E" />
        </div>

      <section className="space-y-5">
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center gap-2"><HeartPulse className="w-4 h-4 text-rose-400" /> {t("sendRequest")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400">{t("physiotherapist")}</Label>
                <select
                  value={form.physioId}
                  onChange={e => setForm({ ...form, physioId: e.target.value })}
                  disabled={loading || physiotherapists.length === 0}
                  className="w-full h-11 rounded-lg bg-[#0E151B] border border-[#2E3944] text-sm px-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <option value="">Loading physiotherapists...</option>
                  ) : physiotherapists.length === 0 ? (
                    <option value="">No physiotherapists available</option>
                  ) : (
                    <>
                      <option value="">{t("selectPhysiotherapist")}</option>
                      {physiotherapists.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#0E151B] text-white">
                          {p.name} {p.specialization ? `- ${p.specialization}` : ''}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {!loading && physiotherapists.length === 0 && (
                  <p className="text-xs text-slate-500 mt-1">
                    No physiotherapists found. Please contact admin.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400">{t("injuryType")}</Label>
                <Input
                  value={form.injuryType}
                  onChange={e => setForm({ ...form, injuryType: e.target.value })}
                  placeholder={t("injuryTypePlaceholder")}
                  className="bg-[#0E151B] border-[#2E3944] h-11 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400 flex justify-between">
                  <span>{t("painPercentage")}</span>
                  <span className="text-rose-400 font-semibold">{form.painPercent}%</span>
                </Label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.painPercent}
                  onChange={e => setForm({ ...form, painPercent: parseInt(e.target.value) })}
                  className="w-full accent-rose-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-slate-400">{t("notesOptional")}</Label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder={t("notesPlaceholder")}
                  className="w-full rounded-lg bg-[#0E151B] border border-[#2E3944] text-sm p-3 resize-none text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500/50 transition-all"
                />
              </div>
              <Button type="submit" disabled={submitting || !form.injuryType.trim() || !form.physioId || physiotherapists.length === 0} className="w-full bg-gradient-to-r from-[#F43F5E] to-[#FB7185] hover:from-[#E11D48] hover:to-[#F472B6] h-11 text-sm font-semibold flex items-center justify-center gap-2 text-white disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? 'Sending...' : t("sendRequest")}
                {!submitting && <Plus className="w-4 h-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-rose-400" /> {t("yourRequests")}
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-[#0E151B] border border-[#2E3944] text-white">{requests.length}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
              </div>
            ) : requests.length > 0 ? (
              requests.map(r => (
                  <div key={r.id} className="p-3 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-rose-500/30 transition-all">
                    <div className="text-xs">
                      <p className="text-white font-semibold">{r.injuryType}</p>
                      <p className="text-slate-400 mt-0.5">{r.physioName} • Pain {r.painPercent}% • {r.status}</p>
                      {r.notes && <p className="text-slate-500 mt-0.5 line-clamp-1">{r.notes}</p>}
                      <p className="text-slate-600 mt-0.5">{new Date(r.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
              ))
            ) : (
              <p className="text-[#B6C4CF] text-sm">{t("noRequestsYet")}</p>
            )}
          </CardContent>
        </Card>
      </section>
      </div>
    </div>
    </PageTransition>
      <BottomNav activeTab="physio" />
    </SubscriptionRequiredGuard>
    </>
<<<<<<< HEAD
    </AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  )
}

function StatsCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="bg-[#101A23] border-[#2E3944] p-6 hover:border-[#FB7185]/30 transition-all">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#0E151B] border flex items-center justify-center" style={{ borderColor: color }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <span className="text-xs text-[#B6C4CF] uppercase">{label}</span>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </Card>
  )
}
