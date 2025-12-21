"use client"

import { Suspense, useState } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Eye, RotateCw, Home, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Center } from "@react-three/drei"
import { useEffect, useRef } from "react"
import * as THREE from "three"

// Suppress GLTF texture loading warnings
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' && 
      args[0].includes('GLTFLoader') && 
      args[0].includes('Couldn\'t load texture')
    ) {
      // Suppress the error - textures aren't critical for our skeleton model
      return
    }
    originalConsoleError(...args)
  }
}

// 3D Model Component with Click Detection
function SkeletonModel({ 
  rotation, 
  zoom, 
  onPartClick,
  selectedParts,
  onPartToggle
}: { 
  rotation: number
  zoom: number
  onPartClick: (partName: string) => void
  selectedParts: string[]
  onPartToggle: (partName: string) => void
}) {
  const { scene } = useGLTF('/skeleton_pre-cut.glb')
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)
  const meshesRef = useRef<Map<string, THREE.Mesh>>(new Map())
  
  useEffect(() => {
    if (scene) {
      // Calculate bounding box to find center
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      
      // Move the scene so its center is at origin
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z
      
      // Calculate scale to fit in view
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 3 / maxDim
      scene.scale.setScalar(scale)
      
      // Setup click and hover handlers for each mesh individually
      let partIndex = 1
      meshesRef.current.clear()
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Handle material with potential missing textures
          if (child.material) {
            // Clone the material to avoid modifying the shared original
            const material = child.material.clone()
            
            // If it's a MeshStandardMaterial with textures, handle potential blob URL errors
            if (material instanceof THREE.MeshStandardMaterial) {
              // Remove any problematic textures and use colors instead
              if (material.map) {
                try {
                  // Keep the texture if it loads, otherwise it will fail silently
                  material.map.needsUpdate = true
                } catch (e) {
                  // If texture fails, remove it and use color instead
                  material.map = null
                  material.color = new THREE.Color(0xcccccc)
                }
              }
            }
            
            child.material = material
            child.userData.originalMaterial = material.clone()
          }
          
          // Give each part a unique name if it doesn't have one
          if (!child.name || child.name === '') {
            child.name = `Part ${partIndex}`
            partIndex++
          }
          
          // Store mesh reference
          meshesRef.current.set(child.name, child)
          
          // Make mesh clickable and store its name
          child.userData.clickable = true
          child.userData.partName = child.name
          
          // Enable raycasting for this mesh
          child.raycast = THREE.Mesh.prototype.raycast
        }
      })
      
      console.log(`Found ${partIndex - 1} mesh parts in the model`)
    }
  }, [scene])
  
  // Update materials when selectedParts changes
  useEffect(() => {
    meshesRef.current.forEach((mesh, partName) => {
      const isSelected = selectedParts.includes(partName)
      
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        if (isSelected) {
          // Apply red highlight for selected parts
          const material = mesh.userData.originalMaterial.clone() as THREE.MeshStandardMaterial
          material.emissive = new THREE.Color(0xff0000)
          material.emissiveIntensity = 0.5
          mesh.material = material
          material.needsUpdate = true
        } else {
          // Restore original material
          const material = mesh.userData.originalMaterial.clone() as THREE.MeshStandardMaterial
          mesh.material = material
          material.needsUpdate = true
        }
      }
    })
  }, [selectedParts])
  
  // Handle click on individual mesh - toggle selection
  const handleClick = (event: any) => {
    // Stop propagation to prevent multiple clicks
    event.stopPropagation()
    
    // Get the clicked object (should be a mesh)
    const mesh = event.object
    
    if (mesh instanceof THREE.Mesh && mesh.userData.partName) {
      const partName = mesh.userData.partName
      console.log('Clicked on:', partName)
      
      // Toggle selection
      onPartToggle(partName)
      onPartClick(partName)
    }
  }
  
  // Handle hover on individual mesh
  const handlePointerOver = (event: any) => {
    // Stop propagation to handle only the topmost mesh
    event.stopPropagation()
    
    const mesh = event.object
    
    if (mesh instanceof THREE.Mesh && mesh.userData.partName) {
      const partName = mesh.userData.partName
      setHoveredPart(partName)
      document.body.style.cursor = 'pointer'
      
      // Only show hover effect if not already selected
      if (!selectedParts.includes(partName)) {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          const material = mesh.material.clone() as THREE.MeshStandardMaterial
          material.emissive = new THREE.Color(0x10B2E3)
          material.emissiveIntensity = 0.3
          material.needsUpdate = true
          mesh.material = material
        }
      }
    }
  }
  
  const handlePointerOut = (event: any) => {
    // Stop propagation
    event.stopPropagation()
    
    const mesh = event.object
    
    if (mesh instanceof THREE.Mesh && mesh.userData.partName) {
      const partName = mesh.userData.partName
      document.body.style.cursor = 'default'
      setHoveredPart(null)
      
      // Restore appropriate material
      if (selectedParts.includes(partName)) {
        // Keep red if selected
        const material = mesh.userData.originalMaterial.clone() as THREE.MeshStandardMaterial
        material.emissive = new THREE.Color(0xff0000)
        material.emissiveIntensity = 0.5
        material.needsUpdate = true
        mesh.material = material
      } else {
        // Restore original material
        const material = mesh.userData.originalMaterial.clone() as THREE.MeshStandardMaterial
        material.needsUpdate = true
        mesh.material = material
      }
    }
  }
  
  return (
    <group 
      ref={groupRef}
      rotation={[0, (rotation * Math.PI) / 180, 0]} 
      scale={zoom / 100}
    >
      <primitive 
        object={scene} 
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  )
}

// Preload the model with error handling
try {
  useGLTF.preload('/skeleton_pre-cut.glb')
} catch (error) {
  console.warn('Failed to preload GLTF model:', error)
}

// Comprehensive body part translation dictionary
function translatePartName(partName: string, language: string): string {
  const translations: Record<string, Record<string, string>> = {
    // Head and Skull
    "skull": { en: "Cranium (Skull)", ar: "الجمجمة", ku: "کەللەسەر", tr: "Kafatası" },
    "cranium": { en: "Cranium", ar: "الجمجمة", ku: "کەللەسەر", tr: "Kafatası" },
    "head": { en: "Head", ar: "الرأس", ku: "سەر", tr: "Baş" },
    "frontal": { en: "Frontal Bone", ar: "العظم الجبهي", ku: "ئێسکی ناوچاو", tr: "Alın Kemiği" },
    "parietal": { en: "Parietal Bone", ar: "العظم الجداري", ku: "ئێسکی لاتەنیشت", tr: "Yan Kemik" },
    "temporal": { en: "Temporal Bone", ar: "العظم الصدغي", ku: "ئێسکی قوماش", tr: "Temporal Kemik" },
    "occipital": { en: "Occipital Bone", ar: "العظم القذالي", ku: "ئێسکی پشتەوەی سەر", tr: "Arka Kafatası" },
    
    // Face
    "mandible": { en: "Mandible (Jaw)", ar: "الفك السفلي", ku: "چەناگەی خوارەوە", tr: "Alt Çene" },
    "maxilla": { en: "Maxilla (Upper Jaw)", ar: "الفك العلوي", ku: "چەناگەی سەرەوە", tr: "Üst Çene" },
    "jaw": { en: "Jaw Bone", ar: "عظم الفك", ku: "ئێسکی چەناگە", tr: "Çene Kemiği" },
    "zygomatic": { en: "Cheekbone", ar: "عظم الوجنة", ku: "ئێسکی گۆنا", tr: "Elmacık Kemiği" },
    "nasal": { en: "Nasal Bone", ar: "عظم الأنف", ku: "ئێسکی لووت", tr: "Burun Kemiği" },
    
    // Spine and Vertebrae
    "spine": { en: "Spinal Column", ar: "العمود الفقري", ku: "ستوونی پشت", tr: "Omurga" },
    "vertebra": { en: "Vertebra", ar: "الفقرة", ku: "پشتەبرین", tr: "Omur" },
    "vertebrae": { en: "Vertebrae", ar: "الفقرات", ku: "پشتەبرینەکان", tr: "Omurlar" },
    "cervical": { en: "Cervical Vertebrae (Neck)", ar: "الفقرات العنقية", ku: "پشتەبرینی مل", tr: "Boyun Omurları" },
    "thoracic": { en: "Thoracic Vertebrae (Chest)", ar: "الفقرات الصدرية", ku: "پشتەبرینی سنگ", tr: "Göğüs Omurları" },
    "lumbar": { en: "Lumbar Vertebrae (Lower Back)", ar: "الفقرات القطنية", ku: "پشتەبرینی کەمەر", tr: "Bel Omurları" },
    "sacrum": { en: "Sacrum", ar: "العجز", ku: "کۆتەنک", tr: "Kuyruk Sokumu" },
    "coccyx": { en: "Coccyx (Tailbone)", ar: "العصعص", ku: "کلکی دەم", tr: "Kuyruk Kemiği" },
    
    // Chest and Torso
    "sternum": { en: "Sternum (Breastbone)", ar: "عظم القص", ku: "ئێسکی سنگ", tr: "Göğüs Kemiği" },
    "ribs": { en: "Rib Cage", ar: "القفص الصدري", ku: "قەفەسی پراسۆ", tr: "Göğüs Kafesi" },
    "rib": { en: "Rib Bone", ar: "الضلع", ku: "پراسۆ", tr: "Kaburga" },
    "clavicle": { en: "Clavicle (Collarbone)", ar: "عظم الترقوة", ku: "ئێسکی ملوانکە", tr: "Köprücük Kemiği" },
    "scapula": { en: "Scapula (Shoulder Blade)", ar: "لوح الكتف", ku: "ئێسکی شان", tr: "Kürek Kemiği" },
    
    // Pelvis and Hip
    "pelvis": { en: "Pelvis (Hip Bone)", ar: "عظام الحوض", ku: "ئێسکی چەناگە", tr: "Leğen Kemiği" },
    "hip": { en: "Hip Bone", ar: "عظم الورك", ku: "ئێسکی قوڕ", tr: "Kalça Kemiği" },
    "ilium": { en: "Ilium", ar: "عظم الحرقفة", ku: "ئێسکی چەناگە", tr: "Kalça Kemiği Üst" },
    "ischium": { en: "Ischium", ar: "عظم الإسك", ku: "ئێسکی دانیشتن", tr: "Oturma Kemiği" },
    "pubis": { en: "Pubis", ar: "عظم العانة", ku: "ئێسکی ناوەندی چەناگە", tr: "Kasık Kemiği" },
    
    // Upper Limb (Arm)
    "shoulder": { en: "Shoulder", ar: "الكتف", ku: "شان", tr: "Omuz" },
    "humerus": { en: "Humerus (Upper Arm)", ar: "عظم العضد", ku: "ئێسکی باڵی سەرەوە", tr: "Kol Kemiği" },
    "arm": { en: "Arm Bone", ar: "عظم الذراع", ku: "ئێسکی باڵ", tr: "Kol Kemiği" },
    "elbow": { en: "Elbow", ar: "المرفق", ku: "ئەژنۆی باڵ", tr: "Dirsek" },
    "radius": { en: "Radius (Forearm)", ar: "عظم الكعبرة", ku: "ئێسکی دەست (لایی گەورە)", tr: "Ön Kol Dış" },
    "ulna": { en: "Ulna (Forearm)", ar: "عظم الزند", ku: "ئێسکی دەست (لایی بچووک)", tr: "Ön Kol İç" },
    "forearm": { en: "Forearm", ar: "الساعد", ku: "دەست", tr: "Ön Kol" },
    
    // Hand
    "hand": { en: "Hand", ar: "اليد", ku: "دەست", tr: "El" },
    "wrist": { en: "Wrist", ar: "المعصم", ku: "مەچەک", tr: "Bilek" },
    "carpal": { en: "Carpal (Wrist Bones)", ar: "عظام الرسغ", ku: "ئێسکەکانی مەچەک", tr: "Bilek Kemikleri" },
    "metacarpal": { en: "Metacarpal (Hand Bones)", ar: "عظام المشط", ku: "ئێسکەکانی لەپی دەست", tr: "El Kemikleri" },
    "phalanges": { en: "Finger Bones", ar: "سلاميات الأصابع", ku: "ئێسکەکانی پەنجە", tr: "Parmak Kemikleri" },
    "finger": { en: "Finger", ar: "الإصبع", ku: "پەنجە", tr: "Parmak" },
    "thumb": { en: "Thumb", ar: "الإبهام", ku: "پەنجەی گەورە", tr: "Başparmak" },
    
    // Lower Limb (Leg)
    "femur": { en: "Femur (Thigh Bone)", ar: "عظم الفخذ", ku: "ئێسکی ڕان", tr: "Uyluk Kemiği" },
    "thigh": { en: "Thigh Bone", ar: "عظم الفخذ", ku: "ئێسکی ڕان", tr: "Uyluk Kemiği" },
    "patella": { en: "Patella (Kneecap)", ar: "عظم الرضفة", ku: "کلکی ئەژنۆ", tr: "Diz Kapağı" },
    "knee": { en: "Knee", ar: "الركبة", ku: "ئەژنۆ", tr: "Diz" },
    "tibia": { en: "Tibia (Shinbone)", ar: "عظم الظنبوب", ku: "ئێسکی قەڵەو (گەورە)", tr: "Kaval Kemiği" },
    "fibula": { en: "Fibula", ar: "عظم الشظية", ku: "ئێسکی قەڵەو (بچووک)", tr: "İnce Kemik" },
    "shin": { en: "Shin Bone", ar: "عظم الساق", ku: "ئێسکی قەڵەو", tr: "İnce Kemik" },
    "leg": { en: "Leg Bone", ar: "عظم الساق", ku: "ئێسکی قاچ", tr: "Bacak Kemiği" },
    
    // Foot
    "foot": { en: "Foot", ar: "القدم", ku: "پێ", tr: "Ayak" },
    "ankle": { en: "Ankle", ar: "الكاحل", ku: "قولمپێ", tr: "Ayak Bileği" },
    "calcaneus": { en: "Calcaneus (Heel Bone)", ar: "عظم العقب", ku: "ئێسکی پاژنە", tr: "Topuk Kemiği" },
    "talus": { en: "Talus (Ankle Bone)", ar: "عظم الكاحل", ku: "ئێسکی قولمپێ", tr: "Ayak Bileği Kemiği" },
    "tarsal": { en: "Tarsal (Foot Bones)", ar: "عظام الرصغ", ku: "ئێسکەکانی پێ", tr: "Ayak Kemikleri" },
    "metatarsal": { en: "Metatarsal", ar: "عظام المشط", ku: "ئێسکەکانی لەپی پێ", tr: "Ayak Ortası" },
    "toe": { en: "Toe", ar: "إصبع القدم", ku: "پەنجەی پێ", tr: "Ayak Parmağı" },
    
    // Generic Terms
    "bone": { en: "Bone", ar: "عظم", ku: "ئێسک", tr: "Kemik" },
    "joint": { en: "Joint", ar: "المفصل", ku: "جومگە", tr: "Eklem" },
    "cartilage": { en: "Cartilage", ar: "الغضروف", ku: "ژیکاڵۆک", tr: "Kıkırdak" },
    "muscle": { en: "Muscle", ar: "العضلة", ku: "ماسولکە", tr: "Kas" },
    "ligament": { en: "Ligament", ar: "الرباط", ku: "دەمار", tr: "Bağ" },
    "tendon": { en: "Tendon", ar: "الوتر", ku: "دەمار", tr: "Tendon" },
    
    // Directional Terms
    "left": { en: "Left", ar: "يسار", ku: "چەپ", tr: "Sol" },
    "right": { en: "Right", ar: "يمين", ku: "ڕاست", tr: "Sağ" },
    "upper": { en: "Upper", ar: "علوي", ku: "سەرەوە", tr: "Üst" },
    "lower": { en: "Lower", ar: "سفلي", ku: "خوارەوە", tr: "Alt" },
    "anterior": { en: "Anterior (Front)", ar: "أمامي", ku: "پێشەوە", tr: "Ön" },
    "posterior": { en: "Posterior (Back)", ar: "خلفي", ku: "پشتەوە", tr: "Arka" },
    "medial": { en: "Medial (Inner)", ar: "إنسي", ku: "ناوەوە", tr: "İç" },
    "lateral": { en: "Lateral (Outer)", ar: "وحشي", ku: "دەرەوە", tr: "Dış" },
    
    // Numbers for parts
    "part": { en: "Body Part", ar: "جزء من الجسم", ku: "بەشی جەستە", tr: "Vücut Parçası" },
    "section": { en: "Section", ar: "قسم", ku: "بەش", tr: "Bölüm" },
    "segment": { en: "Segment", ar: "شريحة", ku: "پارچە", tr: "Segment" },
  }
  
  // Try to find exact match first
  const lowerPartName = partName.toLowerCase()
  
  // Check for exact key match
  if (translations[lowerPartName]) {
    return translations[lowerPartName][language as keyof typeof translations[string]] || partName
  }
  
  // Try to find translation by partial matching
  for (const [key, trans] of Object.entries(translations)) {
    if (lowerPartName.includes(key)) {
      return trans[language as keyof typeof trans] || partName
    }
  }
  
  // If no translation found, try to format the original name nicely
  // Handle "Part 1", "Part 2" etc.
  if (lowerPartName.startsWith('part ')) {
    const number = partName.split(' ')[1]
    const partTrans = translations['part'][language as keyof typeof translations['part']]
    return `${partTrans} ${number}`
  }
  
  // Return original name with first letter capitalized
  return partName.charAt(0).toUpperCase() + partName.slice(1)
}

export default function AnatomyToolPage() {
  const { t, language } = useLanguage()
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(100)
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [selectedParts, setSelectedParts] = useState<string[]>([])

  const handleResetView = () => {
    setRotation(0)
    setZoom(100)
  }
  
  const handlePartClick = (partName: string) => {
    setSelectedPart(partName)
  }
  
  const handlePartToggle = (partName: string) => {
    // Toggle selection
    if (selectedParts.includes(partName)) {
      // Remove if already selected
      setSelectedParts(selectedParts.filter(p => p !== partName))
      if (selectedPart === partName) {
        setSelectedPart(null)
      }
    } else {
      // Add if not selected
      setSelectedParts([...selectedParts, partName])
    }
  }
  
  const handleRemovePart = (partName: string) => {
    setSelectedParts(selectedParts.filter(p => p !== partName))
    if (selectedPart === partName) {
      setSelectedPart(null)
    }
  }
  
  const handleClearAll = () => {
    setSelectedParts([])
    setSelectedPart(null)
  }

  return (
    <AuthGuard>
      <SidebarSleek role="physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Modern Header with Glassmorphism */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#10B2E3]/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#10B2E3] blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B2E3] to-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {t("anatomy3DViewer")}
                    </h1>
                    <p className="text-cyan-400 mt-1 font-medium">
                      {t("view3DSkeletonModel")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-semibold">{t("live")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main 3D Viewer with Ultra Modern Design */}
            <Card className="lg:col-span-3 border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                <div className="relative w-full h-[750px] rounded-2xl overflow-hidden group">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none z-10" />
                  
                  {/* 3D Canvas with React Three Fiber */}
                  <Canvas
                    className="w-full h-full"
                    camera={{ position: [0, 0, 5], fov: 75 }}
                  >
                    <color attach="background" args={['#0f172a']} />
                    
                    {/* Lights */}
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 10, 7.5]} intensity={1.2} />
                    <directionalLight position={[-5, -10, -7.5]} intensity={0.8} />
                    <pointLight position={[0, 5, 0]} intensity={0.5} />
                    
                    {/* 3D Model */}
                    <Suspense fallback={null}>
                      <SkeletonModel 
                        rotation={rotation} 
                        zoom={zoom} 
                        onPartClick={handlePartClick}
                        selectedParts={selectedParts}
                        onPartToggle={handlePartToggle}
                      />
                    </Suspense>
                    
                    {/* Camera Controls */}
                    <OrbitControls 
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      mouseButtons={{
                        LEFT: 2,    // Pan with left click
                        MIDDLE: 1,  // Zoom with middle click
                        RIGHT: 0    // Rotate with right click
                      }}
                      touches={{
                        ONE: 2,     // Pan with one finger
                        TWO: 0      // Rotate with two fingers
                      }}
                      minDistance={2}
                      maxDistance={10}
                      target={[0, 0, 0]}
                    />
                  </Canvas>

                  {/* Corner Info Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                      <p className="text-cyan-400 text-xs font-bold">{t("modelLoaded")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modern Control Panel */}
            <div className="space-y-4">
              {/* View Controls Card */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                      {t("viewControl")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Rotation Control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-slate-300 font-semibold flex items-center gap-2">
                        <RotateCw className="w-4 h-4 text-cyan-400" />
                        {t("rotation")}
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold">
                        {rotation}°
                      </span>
                    </div>
                    <Slider
                      value={[rotation]}
                      onValueChange={(value) => setRotation(value[0])}
                      min={0}
                      max={360}
                      step={1}
                      className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-500 [&_[role=slider]]:to-blue-500 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-cyan-500/50"
                    />
                  </div>

                  {/* Zoom Control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-slate-300 font-semibold flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        {t("zoom")}
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
                        {zoom}%
                      </span>
                    </div>
                    <Slider
                      value={[zoom]}
                      onValueChange={(value) => setZoom(value[0])}
                      min={50}
                      max={200}
                      step={5}
                      className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-purple-500 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-blue-500/50"
                    />
                  </div>

                  {/* Reset Button */}
                  <Button
                    onClick={handleResetView}
                    className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border border-white/10 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    {t("resetView")}
                  </Button>
                </CardContent>
              </Card>

              {/* Model Info Card */}
              <Card className="border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                    {t("modelInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">{t("modelName")}</p>
                    <p className="text-white font-bold">{t("skeletonPreCut")}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">{t("format")}</p>
                    <p className="text-white font-bold">GLB (3D Binary)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">{t("type")}</p>
                    <p className="text-white font-bold">{t("humanSkeleton")}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">{t("size")}</p>
                    <p className="text-cyan-400 font-bold">11.4 MB</p>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Parts Card */}
              <Card className="border-white/10 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-xl shadow-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                      {t("selectedParts")} ({selectedParts.length})
                    </CardTitle>
                    {selectedParts.length > 0 && (
                      <Button
                        onClick={handleClearAll}
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        {t("clearAll")}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedPart && (
                    <Alert className="bg-cyan-500/10 border-cyan-500/30 mb-3">
                      <Info className="h-4 w-4 text-cyan-400" />
                      <AlertDescription className="text-cyan-300 text-sm">
                        {t("lastSelected")}: <strong>{translatePartName(selectedPart, language)}</strong>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {selectedParts.length === 0 ? (
                    <div className="text-center py-8">
                      <Eye className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">{t("clickModelToSelect")}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {selectedParts.map((part, index) => (
                        <div 
                          key={`${part}-${index}`}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-red-500/30 hover:bg-white/10 transition-colors group"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 animate-pulse" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-bold truncate">{translatePartName(part, language)}</p>
                              <p className="text-slate-400 text-xs truncate">{part}</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleRemovePart(part)}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Instructions Card */}
              <Card className="border-white/10 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                    {t("instructions")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("selectParts")}</p>
                      <p className="text-slate-400 text-xs">{t("clickOnModelToSelect")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <RotateCw className="w-3 h-3 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("rotation")}</p>
                      <p className="text-slate-400 text-xs">{t("useSliderToRotate")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("zoom")}</p>
                      <p className="text-slate-400 text-xs">{t("useSliderToZoom")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Home className="w-3 h-3 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("resetView")}</p>
                      <p className="text-slate-400 text-xs">{t("clickButtonToReset")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}



