"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useUniRig } from "@/hooks/useUniRig"
import { Upload, Download, Play, AlertCircle, CheckCircle2, Loader2, Zap } from "lucide-react"

export default function UniRigDemoPage() {
  const { t } = useLanguage()
  const { rigModel, exportModel, loading, progress, error } = useUniRig()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking")

  const checkServerStatus = async () => {
    setServerStatus("checking")
    try {
      const response = await fetch("http://localhost:8000/health")
      if (response.ok) {
        setServerStatus("online")
      } else {
        setServerStatus("offline")
      }
    } catch (err) {
      setServerStatus("offline")
    }
  }

  // Check server status on mount
  useEffect(() => {
    checkServerStatus()
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setImagePreview(null)
      }
    }
  }

  const handleAutoRig = async () => {
    if (!selectedFile) return

    try {
      // For demo purposes, create dummy vertices and normals
      // In production, these would come from parsing the uploaded 3D file
      const dummyVertices = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 }
      ]
      const dummyNormals = [
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: 1 }
      ]
      
      const rigResult = await rigModel(dummyVertices, dummyNormals, "human")
      setResult(rigResult)
    } catch (err) {
      console.error("Auto-rig failed:", err)
    }
  }

  const handleExport = async () => {
    if (!result) return

    try {
      // Mock server only supports JSON export
      await exportModel("glb")
    } catch (err) {
      console.error("Export failed:", err)
    }
  }

  return (
    <AuthGuard>
      <FitproLayout role="physiotherapist">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Zap className="w-8 h-8 text-[#10B2E3]" />
              🤖 UniRig Demo
            </h1>
            <p className="text-slate-400 mt-2">
              تاقیکردنەوەی سیستەمی ئۆتۆماتیکی Rigging بە هێزی AI
            </p>
          </div>

          {/* Server Status */}
          <Alert className={serverStatus === "online" ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                {serverStatus === "checking" && "پشکنینی سەرڤەر..."}
                {serverStatus === "online" && "✅ سەرڤەر کارا کراوە"}
                {serverStatus === "offline" && "❌ سەرڤەر داخراوە - تکایە دەستی پێبکە: .\\start-unirig-venv.ps1"}
              </span>
              <Button variant="outline" size="sm" onClick={checkServerStatus} disabled={serverStatus === "checking"}>
                {serverStatus === "checking" ? <Loader2 className="w-4 h-4 animate-spin" /> : "🔄 دووبارە"}
              </Button>
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Upload & Controls */}
            <div className="space-y-6">
              {/* Upload Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#10B2E3]" />
                    1️⃣ هەڵبژاردنی فایل
                  </CardTitle>
                  <CardDescription>
                    وێنە یان مۆدێلێکی 3D هەڵبژێرە (.jpg, .png, .obj, .fbx)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload">فایل</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.obj,.fbx,.glb,.gltf"
                      onChange={handleFileSelect}
                      disabled={serverStatus !== "online"}
                    />
                  </div>

                  {imagePreview && (
                    <div className="mt-4">
                      <Label>پێشبینین</Label>
                      <div className="mt-2 relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {selectedFile && !imagePreview && (
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        فایل هەڵبژێردرا: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Auto-Rig Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-[#10B2E3]" />
                    2️⃣ جێبەجێکردنی Auto-Rig
                  </CardTitle>
                  <CardDescription>
                    دوگمەی خوارەوە کلیک بکە بۆ دەستپێکردن
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={handleAutoRig}
                    disabled={!selectedFile || loading || serverStatus !== "online"}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        پرۆسەکردن... {progress.percent}%
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        🤖 دەستپێکردنی Auto-Rig
                      </>
                    )}
                  </Button>

                  {loading && (
                    <div className="space-y-2">
                      <Progress value={progress.percent} className="w-full" />
                      <p className="text-sm text-slate-400 text-center">
                        {progress.stage}
                      </p>
                    </div>
                  )}

                  {error && (
                    <Alert className="border-red-500 bg-red-500/10">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Export Card */}
              {result && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#10B2E3]" />
                      3️⃣ دەرهێنان
                    </CardTitle>
                    <CardDescription>
                      مۆدێلە Rigged کراوەکە دابەزێنە
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleExport} className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      دابەزاندنی مۆدێل
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>📊 ئەنجام</CardTitle>
                  <CardDescription>
                    زانیاری لەسەر Rigging
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!result && (
                    <div className="text-center py-12 text-slate-400">
                      <Zap className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>هیچ ئەنجامێک نییە تا ئێستا</p>
                      <p className="text-sm mt-2">فایلێک هەڵبژێرە و Auto-Rig جێبەجێ بکە</p>
                    </div>
                  )}

                  {result && (
                    <div className="space-y-4">
                      <Alert className="border-green-500 bg-green-500/10">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>
                          ✅ Rigging سەرکەوتووبوو!
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded">
                          <span className="text-slate-400">ژمارەی Joints:</span>
                          <span className="text-white font-bold">{result.skeleton?.joints?.length || 0}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded">
                          <span className="text-slate-400">ژمارەی Bones:</span>
                          <span className="text-white font-bold">{result.skeleton?.bones?.length || 0}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded">
                          <span className="text-slate-400">Skinning Weights:</span>
                          <span className="text-white font-bold">{result.skinning ? "✓" : "✗"}</span>
                        </div>
                      </div>

                      {/* Raw JSON (collapsible) */}
                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm text-slate-400 hover:text-white">
                          نیشاندانی JSON تەواو
                        </summary>
                        <pre className="mt-2 p-4 bg-slate-950 rounded text-xs overflow-auto max-h-96">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>ℹ️ زانیاری</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-400">
                  <p>• <strong>UniRig</strong> سیستەمێکی AI یە بۆ دروستکردنی ئۆتۆماتیکی Skeleton و Rigging</p>
                  <p>• پشتگیری لە وێنە و مۆدێلە 3D یەکان دەکات</p>
                  <p>• بە خێرایی Joints و Bones دەناسێتەوە</p>
                  <p>• ئامادەی دەکات بۆ ئەنیمەیشن</p>
                  <hr className="border-slate-700" />
                  <p className="text-xs">
                    <strong>تێبینی:</strong> پێویستە سەرڤەرەکە کارا بێت. بۆ دەستپێکردن: <code className="bg-slate-800 px-2 py-1 rounded">.\start-unirig-venv.ps1</code>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </FitproLayout>
    </AuthGuard>
  )
}
