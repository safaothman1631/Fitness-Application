"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'

interface Anatomy3DModelProps {
	showMuscles: boolean
	showBones: boolean
	showNerves: boolean
	rotation: number
	zoom: number
}

interface SketchfabModel {
	uid: string
	name: string
	thumbnails?: {
		images?: Array<{ url: string }>
	}
}

// Sketchfab API types
declare global {
	interface Window {
		Sketchfab: any
	}
}

function HumanModel({ showMuscles, showBones, showNerves }: { showMuscles: boolean; showBones: boolean; showNerves: boolean }) {
	// Professional medical colors
	const skinColor = new THREE.Color('#F5E6D3')
	const muscleColor = new THREE.Color('#8B3626')
	const deepMuscleColor = new THREE.Color('#6E2F28')
	const boneColor = new THREE.Color('#FFFEF0')
	const nerveColor = new THREE.Color('#FFE066')
	
	return (
		<group position={[0, 0, 0]}>
			<ambientLight intensity={1.8} />
			<directionalLight position={[15, 15, 8]} intensity={3.0} castShadow />
			<directionalLight position={[-12, 8, -8]} intensity={2.0} color="#e8f4ff" />
			<spotLight position={[0, 25, 20]} angle={0.2} intensity={2.5} castShadow penumbra={0.8} />
			<pointLight position={[5, 3, 8]} intensity={1.8} distance={15} decay={1.5} />
			<pointLight position={[-5, 3, 8]} intensity={1.5} distance={15} decay={1.5} color="#e8f4ff" />
			<hemisphereLight intensity={1.0} color="#ffffff" groundColor="#777777" />
			
			{/* HEAD */}
			<mesh position={[0, 1.65, 0]} castShadow receiveShadow>
				<sphereGeometry args={[0.15, 64, 64]} />
				<meshPhysicalMaterial
					color={showBones ? boneColor : showMuscles ? muscleColor : skinColor}
					roughness={showBones ? 0.85 : 0.55}
					clearcoat={showMuscles ? 0.3 : 0.4}
					metalness={0}
					sheen={showMuscles ? 0 : 0.5}
				/>
			</mesh>
			
			{/* NECK */}
			<mesh position={[0, 1.4, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[0.075, 0.085, 0.28, 32]} />
				<meshPhysicalMaterial
					color={showBones ? boneColor : showMuscles ? deepMuscleColor : skinColor}
					roughness={0.7}
					clearcoat={0.25}
				/>
			</mesh>
			
			{/* TORSO */}
			<mesh position={[0, 0.85, 0]} castShadow receiveShadow>
				<boxGeometry args={[0.36, 0.65, 0.22]} />
				<meshPhysicalMaterial
					color={showBones ? boneColor : showMuscles ? deepMuscleColor : skinColor}
					roughness={0.7}
					clearcoat={0.25}
				/>
			</mesh>
			
			{showMuscles && (
				<>
					{/* Pectorals */}
					<mesh position={[-0.11, 1.05, 0.11]} rotation={[0, 0, -0.3]} castShadow>
						<boxGeometry args={[0.16, 0.26, 0.09]} />
						<meshPhysicalMaterial color="#B85D52" roughness={0.6} clearcoat={0.35} transmission={0.03} />
					</mesh>
					<mesh position={[0.11, 1.05, 0.11]} rotation={[0, 0, 0.3]} castShadow>
						<boxGeometry args={[0.16, 0.26, 0.09]} />
						<meshPhysicalMaterial color="#B85D52" roughness={0.6} clearcoat={0.35} transmission={0.03} />
					</mesh>
					
					{/* 6-Pack Abs */}
					{[-0.16, -0.06, 0.04, 0.14].map((y, i) => (
						<group key={i}>
							<mesh position={[-0.065, 0.78 + y, 0.12]} castShadow>
								<boxGeometry args={[0.075, 0.085, 0.045]} />
								<meshPhysicalMaterial color="#C26A5F" roughness={0.55} clearcoat={0.4} />
							</mesh>
							<mesh position={[0.065, 0.78 + y, 0.12]} castShadow>
								<boxGeometry args={[0.075, 0.085, 0.045]} />
								<meshPhysicalMaterial color="#C26A5F" roughness={0.55} clearcoat={0.4} />
							</mesh>
						</group>
					))}
					
					{/* Obliques */}
					<mesh position={[-0.14, 0.8, 0.05]} rotation={[0, 0, -0.25]} castShadow>
						<boxGeometry args={[0.1, 0.38, 0.07]} />
						<meshPhysicalMaterial color={muscleColor} roughness={0.75} />
					</mesh>
					<mesh position={[0.14, 0.8, 0.05]} rotation={[0, 0, 0.25]} castShadow>
						<boxGeometry args={[0.1, 0.38, 0.07]} />
						<meshPhysicalMaterial color={muscleColor} roughness={0.75} />
					</mesh>
				</>
			)}
			
			{/* ARMS */}
			{[-1, 1].map((side) => (
				<group key={side}>
					{showBones ? (
						<>
							{/* Scapula (shoulder blade) */}
							<mesh position={[side * 0.22, 1.1, -0.08]} rotation={[0.3, side * 0.2, side * -0.1]}>
								<boxGeometry args={[0.12, 0.16, 0.008]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.9} clearcoat={0.08} />
							</mesh>
							
							{/* Clavicle (collar bone) */}
							<mesh position={[side * 0.12, 1.22, 0.08]} rotation={[0, 0, side * 0.15]}>
								<cylinderGeometry args={[0.012, 0.012, 0.18, 12]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.88} />
							</mesh>
							
							{/* Humerus (upper arm bone) */}
							<mesh position={[side * 0.27, 0.78, 0]} rotation={[0, 0, side * -0.1]} castShadow>
								<cylinderGeometry args={[0.022, 0.018, 0.42, 16]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.88} clearcoat={0.1} />
							</mesh>
							<mesh position={[side * 0.25, 1.08, 0]}>
								<sphereGeometry args={[0.028, 24, 24]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.85} />
							</mesh>
							
							{/* Radius & Ulna (forearm bones) */}
							<mesh position={[side * 0.295, 0.35, 0.015]} rotation={[0, 0, side * -0.15]} castShadow>
								<cylinderGeometry args={[0.012, 0.01, 0.42, 12]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.9} />
							</mesh>
							<mesh position={[side * 0.305, 0.35, -0.015]} rotation={[0, 0, side * -0.15]} castShadow>
								<cylinderGeometry args={[0.011, 0.01, 0.42, 12]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.9} />
							</mesh>
							
							{/* Hand bones */}
							<mesh position={[side * 0.34, 0.1, 0]}>
								<boxGeometry args={[0.048, 0.08, 0.025]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.88} />
							</mesh>
							{/* Fingers */}
							{[0.02, 0.01, 0, -0.01, -0.02].map((offset, i) => (
								<group key={`finger-${i}`}>
									<mesh position={[side * 0.34 + offset, 0.025, 0.015]} rotation={[0.2, 0, 0]}>
										<cylinderGeometry args={[0.006, 0.005, 0.045, 8]} />
										<meshPhysicalMaterial color={boneColor} roughness={0.92} />
									</mesh>
								</group>
							))}
						</>
					) : (
						<>
							{/* Shoulder */}
							<mesh position={[side * 0.25, 1.1, 0]} castShadow receiveShadow>
								<sphereGeometry args={[0.09, 32, 32]} />
								<meshPhysicalMaterial
									color={showMuscles ? muscleColor : skinColor}
									roughness={0.65}
									clearcoat={0.3}
								/>
							</mesh>
							
							{/* Upper Arm */}
							<mesh position={[side * 0.27, 0.78, 0]} rotation={[0, 0, side * -0.1]} castShadow>
								<cylinderGeometry args={[0.055, 0.048, 0.4, 32]} />
								<meshPhysicalMaterial
									color={showMuscles ? muscleColor : skinColor}
									roughness={0.7}
									clearcoat={0.25}
								/>
							</mesh>
							
							{/* Forearm */}
							<mesh position={[side * 0.3, 0.35, 0]} rotation={[0, 0, side * -0.15]} castShadow>
								<cylinderGeometry args={[0.045, 0.038, 0.4, 32]} />
								<meshPhysicalMaterial
									color={showMuscles ? deepMuscleColor : skinColor}
									roughness={0.75}
								/>
							</mesh>
							
							{/* Hand */}
							<mesh position={[side * 0.34, 0.08, 0]} castShadow>
								<boxGeometry args={[0.055, 0.11, 0.035]} />
								<meshPhysicalMaterial
									color={showMuscles ? muscleColor : skinColor}
									roughness={0.7}
								/>
							</mesh>
						</>
					)}
				</group>
			))}
			
			{/* PELVIS */}
			<mesh position={[0, 0.48, 0]} castShadow receiveShadow>
				<boxGeometry args={[0.36, 0.22, 0.24]} />
				<meshPhysicalMaterial
					color={showBones ? boneColor : showMuscles ? deepMuscleColor : skinColor}
					roughness={showBones ? 0.85 : 0.7}
					clearcoat={showBones ? 0.1 : 0.25}
				/>
			</mesh>
			
			{showBones && (
				<>
					{/* Detailed Ribcage - 24 ribs (12 pairs) */}
					{[...Array(12)].map((_, i) => {
						const y = 1.05 - (i * 0.055)
						const width = 0.28 + (i * 0.01)
						const depth = 0.18 + (i * 0.008)
						return (
							<group key={`rib-${i}`}>
								{/* Left rib */}
								<mesh position={[-width/2, y, 0]} rotation={[0, 0, -0.3 - (i * 0.02)]}>
									<torusGeometry args={[width * 0.4, 0.008, 12, 32, Math.PI * 0.8]} />
									<meshPhysicalMaterial color={boneColor} roughness={0.9} clearcoat={0.05} />
								</mesh>
								{/* Right rib */}
								<mesh position={[width/2, y, 0]} rotation={[0, 0, 0.3 + (i * 0.02)]}>
									<torusGeometry args={[width * 0.4, 0.008, 12, 32, Math.PI * 0.8]} />
									<meshPhysicalMaterial color={boneColor} roughness={0.9} clearcoat={0.05} />
								</mesh>
							</group>
						)
					})}
					
					{/* Spine vertebrae - 24 segments */}
					{[...Array(24)].map((_, i) => {
						const y = 1.25 - (i * 0.055)
						const size = 0.045 - (i * 0.0008)
						return (
							<group key={`vertebra-${i}`}>
								{/* Vertebral body */}
								<mesh position={[0, y, -0.11]}>
									<cylinderGeometry args={[size, size * 0.95, 0.045, 16]} />
									<meshPhysicalMaterial color={boneColor} roughness={0.88} clearcoat={0.08} />
								</mesh>
								{/* Transverse processes */}
								<mesh position={[-size * 1.2, y, -0.11]} rotation={[0, 0, Math.PI/2]}>
									<cylinderGeometry args={[0.01, 0.01, size * 1.5, 8]} />
									<meshPhysicalMaterial color={boneColor} roughness={0.9} />
								</mesh>
								<mesh position={[size * 1.2, y, -0.11]} rotation={[0, 0, Math.PI/2]}>
									<cylinderGeometry args={[0.01, 0.01, size * 1.5, 8]} />
									<meshPhysicalMaterial color={boneColor} roughness={0.9} />
								</mesh>
							</group>
						)
					})}
					
					{/* Skull - more detailed */}
					<group position={[0, 1.65, 0]}>
						{/* Cranium */}
						<mesh position={[0, 0.02, -0.02]}>
							<sphereGeometry args={[0.15, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
							<meshPhysicalMaterial color={boneColor} roughness={0.87} clearcoat={0.12} side={THREE.DoubleSide} />
						</mesh>
						{/* Jaw */}
						<mesh position={[0, -0.08, 0.04]} rotation={[0.3, 0, 0]}>
							<torusGeometry args={[0.06, 0.012, 12, 24, Math.PI]} />
							<meshPhysicalMaterial color={boneColor} roughness={0.9} />
						</mesh>
						{/* Eye sockets */}
						<mesh position={[-0.04, -0.02, 0.13]}>
							<sphereGeometry args={[0.025, 16, 16]} />
							<meshPhysicalMaterial color="#1a1a1a" roughness={1.0} />
						</mesh>
						<mesh position={[0.04, -0.02, 0.13]}>
							<sphereGeometry args={[0.025, 16, 16]} />
							<meshPhysicalMaterial color="#1a1a1a" roughness={1.0} />
						</mesh>
					</group>
					
					{/* Pelvis bones - detailed */}
					<mesh position={[0, 0.48, 0]}>
						<torusGeometry args={[0.16, 0.025, 16, 32, Math.PI]} />
						<meshPhysicalMaterial color={boneColor} roughness={0.88} clearcoat={0.1} />
					</mesh>
					<mesh position={[-0.14, 0.38, 0]} rotation={[0, 0, -0.4]}>
						<cylinderGeometry args={[0.02, 0.018, 0.2, 12]} />
						<meshPhysicalMaterial color={boneColor} roughness={0.9} />
					</mesh>
					<mesh position={[0.14, 0.38, 0]} rotation={[0, 0, 0.4]}>
						<cylinderGeometry args={[0.02, 0.018, 0.2, 12]} />
						<meshPhysicalMaterial color={boneColor} roughness={0.9} />
					</mesh>
				</>
			)}
			
			{showMuscles && !showBones && (
				<>
					<mesh position={[-0.11, 0.48, -0.06]} castShadow>
						<sphereGeometry args={[0.11, 32, 32]} />
						<meshPhysicalMaterial color={muscleColor} roughness={0.7} clearcoat={0.2} />
					</mesh>
					<mesh position={[0.11, 0.48, -0.06]} castShadow>
						<sphereGeometry args={[0.11, 32, 32]} />
						<meshPhysicalMaterial color={muscleColor} roughness={0.7} clearcoat={0.2} />
					</mesh>
				</>
			)}
			
			{/* LEGS */}
			{[-1, 1].map((side) => (
				<group key={side}>
					{showBones ? (
						<>
							{/* Femur (thigh bone) - longest bone in body */}
							<mesh position={[side * 0.11, 0.0, 0]} castShadow>
								<cylinderGeometry args={[0.025, 0.02, 0.62, 16]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.88} clearcoat={0.1} />
							</mesh>
							{/* Hip joint (ball and socket) */}
							<mesh position={[side * 0.13, 0.38, 0]}>
								<sphereGeometry args={[0.032, 24, 24]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.85} />
							</mesh>
							{/* Knee joint */}
							<mesh position={[side * 0.11, -0.32, 0.02]}>
								<sphereGeometry args={[0.045, 24, 24]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.86} />
							</mesh>
							
							{/* Tibia & Fibula (shin bones) */}
							<mesh position={[side * 0.11, -0.62, 0]} castShadow>
								<cylinderGeometry args={[0.02, 0.016, 0.52, 16]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.9} />
							</mesh>
							<mesh position={[side * 0.095, -0.62, -0.02]} castShadow>
								<cylinderGeometry args={[0.012, 0.01, 0.5, 12]} />
								<meshPhysicalMaterial color={boneColor} roughness={0.92} />
							</mesh>
							
							{/* Foot bones */}
							<group position={[side * 0.11, -0.92, 0.035]} rotation={[0.15, 0, 0]}>
								{/* Heel (calcaneus) */}
								<mesh position={[0, 0, -0.05]}>
									<boxGeometry args={[0.05, 0.04, 0.06]} />
									<meshPhysicalMaterial color={boneColor} roughness={0.88} />
								</mesh>
								{/* Metatarsals */}
								<mesh position={[0, -0.01, 0.04]}>
									<boxGeometry args={[0.048, 0.025, 0.08]} />
									<meshPhysicalMaterial color={boneColor} roughness={0.9} />
								</mesh>
								{/* Toe bones */}
								{[-0.015, -0.005, 0.005, 0.015].map((offset, i) => (
									<mesh key={`toe-${i}`} position={[offset, -0.01, 0.095]} rotation={[0.1, 0, 0]}>
										<cylinderGeometry args={[0.006, 0.005, 0.025, 8]} />
										<meshPhysicalMaterial color={boneColor} roughness={0.92} />
									</mesh>
								))}
							</group>
						</>
					) : (
						<>
							{/* Thigh */}
							<mesh position={[side * 0.11, 0.0, 0]} castShadow>
								<cylinderGeometry args={[0.075, 0.065, 0.6, 32]} />
								<meshPhysicalMaterial
									color={showMuscles ? muscleColor : skinColor}
									roughness={0.7}
									clearcoat={0.25}
								/>
							</mesh>
							
							{showMuscles && (
								<>
									<mesh position={[side * 0.11, 0.05, 0.045]} castShadow>
										<cylinderGeometry args={[0.05, 0.042, 0.55, 24]} />
										<meshPhysicalMaterial color="#B85D52" roughness={0.6} clearcoat={0.3} />
									</mesh>
									<mesh position={[side * 0.06, -0.05, 0.025]} castShadow>
										<cylinderGeometry args={[0.045, 0.036, 0.5, 24]} />
										<meshPhysicalMaterial color={deepMuscleColor} roughness={0.75} />
									</mesh>
								</>
							)}
							
							{/* Calf */}
							<mesh position={[side * 0.11, -0.62, 0]} castShadow>
								<cylinderGeometry args={[0.055, 0.042, 0.5, 32]} />
								<meshPhysicalMaterial
									color={showMuscles ? deepMuscleColor : skinColor}
									roughness={0.75}
								/>
							</mesh>
							
							{showMuscles && (
								<mesh position={[side * 0.1, -0.55, 0.028]} castShadow>
									<cylinderGeometry args={[0.038, 0.03, 0.42, 24]} />
									<meshPhysicalMaterial color="#C26A5F" roughness={0.65} clearcoat={0.25} />
								</mesh>
							)}
							
							{/* Foot */}
							<mesh position={[side * 0.11, -0.92, 0.035]} rotation={[0.15, 0, 0]} castShadow>
								<boxGeometry args={[0.065, 0.045, 0.14]} />
								<meshPhysicalMaterial
									color={showMuscles ? muscleColor : skinColor}
									roughness={0.7}
								/>
							</mesh>
						</>
					)}
				</group>
			))}
				
				{/* Professional Nervous System Visualization */}
				{showNerves && (
					<group>
						{/* Spinal Cord with glow effect */}
						<mesh position={[0, 0.7, -0.13]} castShadow>
							<cylinderGeometry args={[0.022, 0.022, 2.4, 24]} />
							<meshPhysicalMaterial
								color="#FFE066"
								emissive="#FFD700"
								emissiveIntensity={2.0}
								roughness={0.1}
								transmission={0.2}
								thickness={0.5}
								transparent
								opacity={0.98}
							/>
						</mesh>
						
						{/* Cervical, Thoracic, Lumbar nerve branches */}
						{[-0.5, -0.35, -0.2, -0.05, 0.1, 0.25, 0.4, 0.55, 0.7].map((y, i) => (
							<group key={i}>
								{/* Left side nerves */}
								<mesh position={[-0.2, 0.7 + y, -0.11]} rotation={[0, 0, -0.7]}>
									<cylinderGeometry args={[0.01, 0.01, 0.38, 16]} />
									<meshStandardMaterial 
										color="#FFE066" 
										emissive="#FFD700" 
										emissiveIntensity={1.5}
										transparent
										opacity={0.95}
									/>
								</mesh>
								{/* Right side nerves */}
								<mesh position={[0.2, 0.7 + y, -0.11]} rotation={[0, 0, 0.7]}>
									<cylinderGeometry args={[0.01, 0.01, 0.38, 16]} />
									<meshStandardMaterial 
										color="#FFE066" 
										emissive="#FFD700" 
										emissiveIntensity={1.5}
										transparent
										opacity={0.95}
									/>
								</mesh>
							</group>
						))}
						
						{/* Brachial Plexus (arm nerves) */}
						{[-1, 1].map((side) => (
							<group key={`arm-${side}`}>
								<mesh position={[side * 0.28, 0.6, -0.08]} rotation={[0.2, 0, side * -0.15]}>
									<cylinderGeometry args={[0.008, 0.008, 1.0, 16]} />
									<meshPhysicalMaterial
										color="#FFE066"
										emissive="#FFD700"
										emissiveIntensity={1.3}
										roughness={0.15}
										transparent
										opacity={0.96}
									/>
								</mesh>
							</group>
						))}
						
						{/* Sciatic Nerve (largest nerve in body) */}
						{[-1, 1].map((side) => (
							<mesh key={`sciatic-${side}`} position={[side * 0.12, -0.35, -0.1]} rotation={[0.15, 0, 0]}>
								<cylinderGeometry args={[0.015, 0.015, 1.5, 18]} />
								<meshPhysicalMaterial
									color="#FFE066"
									emissive="#FFD700"
									emissiveIntensity={1.6}
									roughness={0.12}
									transmission={0.1}
									transparent
									opacity={0.97}
								/>
							</mesh>
						))}
						
						{/* Nerve glow points at major junctions */}
						{[
							[0, 0.9, -0.13],
							[0, 0.4, -0.13],
							[0, -0.2, -0.13],
							[-0.25, 0.6, -0.08],
							[0.25, 0.6, -0.08],
						].map((pos, i) => (
							<mesh key={`glow-${i}`} position={pos as [number, number, number]}>
								<sphereGeometry args={[0.025, 16, 16]} />
								<meshBasicMaterial 
									color="#FFFF00" 
									transparent 
									opacity={0.8}
								/>
							</mesh>
						))}
					</group>
				)}
			</group>
		)
	}

function SketchfabViewer({ modelId, label }: { modelId: string; label: string }) {
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const apiRef = useRef<any>(null)

	useEffect(() => {
		// Load Sketchfab API script
		const script = document.createElement('script')
		script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'
		script.async = true
		script.onload = () => {
			initSketchfab()
		}
		document.body.appendChild(script)

		return () => {
			if (document.body.contains(script)) {
				document.body.removeChild(script)
			}
		}
	}, [modelId])

	const initSketchfab = () => {
		if (!iframeRef.current || !window.Sketchfab) return

		const iframe = iframeRef.current
		const client = new window.Sketchfab(iframe)

		client.init(modelId, {
			autostart: 1,
			preload: 1,
			ui_theme: 'dark',
			ui_hint: 0,
			ui_controls: 1,
			ui_infos: 0,
			ui_inspector: 0,
			ui_watermark: 0,
			transparent: 0,
			success: function (api: any) {
				apiRef.current = api
				api.start()
				
				api.addEventListener('viewerready', function () {
					console.log('✅ Sketchfab Viewer Ready:', label)
					
					// Set camera position for better initial view
					api.setCameraLookAt(
						[0, 1, 2.5],  // camera position
						[0, 0.8, 0],  // target position
						0.5           // duration
					)
					
					// Enable annotations if available
					api.getAnnotationList(function(err: any, annotations: any) {
						if (!err && annotations && annotations.length > 0) {
							console.log('📍 Annotations available:', annotations.length)
						}
					})
				})
			},
			error: function () {
				console.error('❌ Sketchfab Viewer Error')
			}
		})
	}

	return (
		<div style={{ width: '100%', height: '100%', position: 'relative', background: '#0f172a' }}>
			<iframe
				ref={iframeRef}
				title={label}
				allow="autoplay; fullscreen; xr-spatial-tracking"
				allowFullScreen
				style={{
					width: '100%',
					height: '100%',
					border: 'none'
				}}
			/>
			<div style={{
				position: 'absolute',
				bottom: '10px',
				right: '10px',
				background: 'rgba(0,0,0,0.8)',
				color: 'white',
				padding: '8px 14px',
				borderRadius: '8px',
				fontSize: '13px',
				fontFamily: 'system-ui, -apple-system, sans-serif',
				backdropFilter: 'blur(4px)'
			}}>
				{label}
			</div>
		</div>
	)
}

// Professional anatomical information database with medical data
const anatomyInfo: Record<string, any> = {
	// Head & Neck
	skull: {
		name: 'کاسەسەر و سەر (Cranium & Skull)',
		description: 'کاسەسەر بریتییە لە 22 ئێسقان کە مێشک و ئەندامەکانی هەست دەپارێزن. بریتییە لە دوو بەش: Neurocranium (8 ئێسقان) و Viscerocranium (14 ئێسقان).',
		parts: ['Frontal bone', 'Parietal bones (2)', 'Temporal bones (2)', 'Occipital bone', 'Sphenoid bone', 'Ethmoid bone', 'Mandible', 'Maxilla', 'Zygomatic bones'],
		functions: ['پاراستنی مێشک', 'پشتگیری ڕووخسار', 'جێگای دان و ژێودان', 'پاراستنی چاو، گوێ، لووت', 'پەیوەندی لەگەڵ ستوونی پشت'],
		commonInjuries: ['Skull fracture', 'Concussion', 'Traumatic brain injury (TBI)', 'Facial fracture', 'TMJ disorders', 'Jaw dislocation'],
		treatments: ['سکانی CT یان MRI', 'نەشتەرگەری نیوروسەرجەری', 'پلێتی تیتانیۆم', 'حەساسکردنەوە', 'دەرمانی ئازاربڕین', 'فیزیۆتێراپی TMJ'],
		exercises: ['Jaw stretching', 'TMJ massage', 'Neck mobility exercises']
	},
	cervical: {
		name: 'پشتبڕی مل (Cervical Vertebrae C1-C7)',
		description: 'حەوت پشتبڕی مل کە سەر پشتگیری دەکەن و spinal cord پارێز دەکەن. C1 (Atlas) و C2 (Axis) تایبەتن و ڕێگە بە سەر دەدەن بسووڕێتەوە.',
		parts: ['C1 (Atlas)', 'C2 (Axis)', 'C3-C7 vertebrae', 'Intervertebral discs', 'Facet joints', 'Spinal canal', 'Nerve roots'],
		functions: ['پشتگیری سەر (4-5 کیلۆ)', 'جوڵەی مل (flexion, extension, rotation)', 'پاراستنی spinal cord', 'ڕێڕەوی دەمارەکان بۆ باڵ و دەست'],
		commonInjuries: ['Whiplash', 'Herniated disc', 'Cervical spondylosis', 'Pinched nerve', 'Neck strain', 'Cervical radiculopathy', 'Torticollis'],
		treatments: ['فیزیۆتێراپی', 'تێراپی دەستی', 'Cervical traction', 'دەرمانی ژانکوژ', 'Epidural injection', 'نەشتەرگەری (Discectomy, Fusion)'],
		exercises: ['Chin tucks', 'Neck rotations', 'Shoulder shrugs', 'Upper trapezius stretch', 'Levator scapulae stretch']
	},
	thoracic: {
		name: 'پشتبڕی سنگ (Thoracic Spine T1-T12)',
		description: '12 پشتبڕی سنگ کە بە پاسۆکانەوە پەیوەستن و قەفەزی سنگ دروست دەکەن. کەمترین جوڵەیان هەیە بەراورد بە بەشەکانی تر.',
		parts: ['T1-T12 vertebrae', '12 pairs of ribs', 'Costovertebral joints', 'Thoracic discs', 'Spinous processes'],
		functions: ['پشتگیری ناوەڕاستی لەش', 'پاراستنی دڵ و سیی', 'لەکەڵک لەگەڵ پاسۆکان بۆ هەناسەدان', 'نووکتەیی هاوسەنگی'],
		commonInjuries: ['Compression fracture', 'Kyphosis', 'Scoliosis', 'Thoracic disc herniation', 'Costochondritis', 'Muscle strain'],
		treatments: ['فیزیۆتێراپی', 'Bracing', 'Vertebroplasty', 'دەرمانی ئێسقان (osteoporosis)', 'نەشتەرگەری بۆ kyphosis/scoliosis'],
		exercises: ['Thoracic extension', 'Foam rolling', 'Cat-cow stretch', 'Rotation exercises', 'Scapular retraction']
	},
	lumbar: {
		name: 'پشتبڕی کەمەر (Lumbar Spine L1-L5)',
		description: 'پێنج پشتبڕی کەمەر کە گەورەترین پشتبڕەکانن و زۆرترین کێش هەڵدەگرن. زۆرترین برینەکانی پشت لێرە ڕوودەدەن.',
		parts: ['L1-L5 vertebrae', 'Lumbar discs', 'Facet joints', 'Cauda equina', 'Lumbar nerve roots'],
		functions: ['هەڵگرتنی کێشی سەرەوەی لەش', 'جوڵەی چەماندنەوە و درێژکردنەوە', 'گواستنەوەی هێز لە سەرەوە بۆ خوارەوە', 'ڕێڕەوی دەمارەکانی خوارەوەی لەش'],
		commonInjuries: ['Lower back pain', 'Lumbar disc herniation', 'Sciatica', 'Spinal stenosis', 'Spondylolisthesis', 'Facet joint syndrome', 'Muscle strain'],
		treatments: ['فیزیۆتێراپی', 'Core strengthening', 'Epidural steroid injection', 'Microdiscectomy', 'Lumbar fusion', 'دەرمانی ئازاربڕین', 'چیرۆپراکتیک'],
		exercises: ['Pelvic tilts', 'Bird dogs', 'Bridges', 'Cat-cow', 'Knee to chest', 'Piriformis stretch', 'Dead bug']
	},
	sacrum: {
		name: 'ئێسقانی پشتی پەل (Sacrum & Coccyx)',
		description: 'Sacrum پێکهاتووە لە 5 پشتبڕی یەکگرتوو. Coccyx (دومبەڵەک) پێکهاتووە لە 3-5 پشتبڕی بچووک.',
		parts: ['5 fused sacral vertebrae', 'Sacroiliac joints (SI)', 'Coccyx', 'Sacral foramina'],
		functions: ['بەستنەوەی ستوونی پشت بە پەل', 'گواستنەوەی کێش لە ستوونی پشت بۆ ڕان', 'پشتگیری ئەندامە ناوەکییەکان', 'خاڵی لەکەڵک بۆ ماسولکە و ligament'],
		commonInjuries: ['SI joint dysfunction', 'Sacroiliitis', 'Coccydynia (tailbone pain)', 'Sacral fracture', 'SI joint arthritis'],
		treatments: ['فیزیۆتێراپی SI joint', 'SI joint injection', 'Coccyx cushion', 'دەرمانی دژەژانکوژ', 'Coccygectomy (نادر)', 'Radiofrequency ablation'],
		exercises: ['Pelvic tilts', 'Hip flexor stretch', 'Piriformis stretch', 'Child pose', 'SI joint mobilization']
	},
	// Upper Extremity
	clavicle: {
		name: 'پشتەبەنیشان (Clavicle)',
		description: 'ئێسقانێکی S-shape کە سنگ بە شان دەبەستێتەوە. یەکەمین ئێسقانە کە لە کۆرپەدا دەبەستێتەوە.',
		parts: ['Medial end (sternal)', 'Shaft', 'Lateral end (acromial)', 'Sternoclavicular joint', 'Acromioclavicular joint'],
		functions: ['بەستنەوەی باڵ بە لەش', 'پاراستنی خوێن و دەمارەکان', 'گواستنەوەی هێز لە باڵ بۆ skeleton محوری'],
		commonInjuries: ['Clavicle fracture', 'AC joint separation', 'SC joint dislocation'],
		treatments: ['Sling immobilization', 'نەشتەرگەری لەگەڵ plate/screws', 'فیزیۆتێراپی'],
		exercises: ['Pendulum exercises', 'Shoulder shrugs', 'Scapular exercises']
	},
	scapula: {
		name: 'شانەپشت (Scapula)',
		description: 'ئێسقانێکی سێگۆشە کە لە پشتی قەفەزی سنگە و بنەڕەتی شانە.',
		parts: ['Body', 'Spine of scapula', 'Acromion', 'Coracoid process', 'Glenoid cavity', 'Superior/inferior angles'],
		functions: ['socket بۆ جومگەی شان', 'لەکەڵک بۆ 17 ماسولکە', 'هاوسەنگکردنی باڵ', 'بەرزکردنەوەی باڵ'],
		commonInjuries: ['Scapular fracture', 'Winging scapula', 'Scapular dyskinesia', 'Snapping scapula'],
		treatments: ['فیزیۆتێراپی', 'Scapular stabilization exercises', 'نەشتەرگەری (نادر)'],
		exercises: ['Scapular push-ups', 'Wall slides', 'Rows', 'Serratus punches', 'I-Y-T raises']
	},
	humerus: {
		name: 'ئێسقانی باڵی سەرەوە (Humerus)',
		description: 'درێژترین و بەهێزترین ئێسقانی باڵی سەرەوە کە لە شانەوە تا ئەژنۆی دەست درێژە.',
		parts: ['Head of humerus', 'Greater/lesser tubercles', 'Bicipital groove', 'Shaft', 'Medial/lateral epicondyles', 'Olecranon fossa', 'Capitulum', 'Trochlea'],
		functions: ['جومگەی شان', 'لەکەڵک ماسولکە', 'جوڵەی باڵ', 'جومگەی ئەژنۆ'],
		commonInjuries: ['Proximal humerus fracture', 'Humeral shaft fracture', 'Supracondylar fracture', 'Rotator cuff injury'],
		treatments: ['Sling/cast', 'ORIF surgery', 'Shoulder replacement', 'فیزیۆتێراپی'],
		exercises: ['Pendulum', 'Wall walks', 'Rotator cuff exercises', 'Bicep curls', 'Tricep extensions']
	},
	radius: {
		name: 'ڕادیۆس (Radius)',
		description: 'ئێسقانی لای پەنجە گەورە لە بازوودا. دەتوانێت بە دەوری ulna بسووڕێتەوە.',
		parts: ['Radial head', 'Radial neck', 'Radial tuberosity', 'Shaft', 'Styloid process', 'Distal radioulnar joint'],
		functions: ['سووڕانەوەی دەست (pronation/supination)', 'بەشداربوون لە جومگەی مەچەکی دەست', 'لەکەڵک ماسولکەی بازوو'],
		commonInjuries: ['Distal radius fracture (Colles)', 'Radial head fracture', 'Radial shaft fracture'],
		treatments: ['Casting', 'ORIF surgery', 'فیزیۆتێراپی'],
		exercises: ['Wrist flexion/extension', 'Forearm rotation', 'Grip strengthening']
	},
	ulna: {
		name: 'ئەڵنە (Ulna)',
		description: 'ئێسقانی لای پەنجە بچووک لە بازوودا. جێگیرتر لە radius.',
		parts: ['Olecranon', 'Coronoid process', 'Trochlear notch', 'Shaft', 'Ulnar head', 'Styloid process'],
		functions: ['جێگیری ئەژنۆ', 'لەکەڵک لەگەڵ radius', 'لەکەڵک ماسولکە'],
		commonInjuries: ['Olecranon fracture', 'Ulnar shaft fracture', 'Monteggia fracture'],
		treatments: ['Casting', 'ORIF surgery', 'فیزیۆتێراپی'],
		exercises: ['Elbow flexion/extension', 'Forearm rotation', 'Grip exercises']
	},
	// Lower Extremity
	pelvis: {
		name: 'پەل (Pelvis)',
		description: 'پێکهاتووە لە سێ ئێسقان (ilium, ischium, pubis) کە لە گەنجیدا یەکدەگرنەوە.',
		parts: ['Ilium', 'Ischium', 'Pubis', 'Acetabulum', 'Obturator foramen', 'SI joints', 'Pubic symphysis'],
		functions: ['پشتگیری ئەندامە ناوەکییەکان', 'گواستنەوەی کێش لە ستوونی پشت بۆ قاچەکان', 'لەکەڵک ماسولکە', 'جێگای منداڵ لە دووگیانیدا'],
		commonInjuries: ['Pelvic fracture', 'Hip pointer', 'Pubic symphysis dysfunction', 'SI joint pain', 'Avulsion fractures'],
		treatments: ['حەساسکردنەوە', 'نەشتەرگەری (گەر unstable)', 'فیزیۆتێراپی', 'Pelvic floor therapy'],
		exercises: ['Pelvic tilts', 'Bridges', 'Clamshells', 'Hip abduction', 'Core stabilization']
	},
	femur: {
		name: 'فێمەر (Femur)',
		description: 'درێژترین و بەهێزترین ئێسقان لە لەشی مرۆڤدا. دەتوانێت 30x کێشی لەش بەرگری بکات.',
		parts: ['Femoral head', 'Femoral neck', 'Greater/lesser trochanters', 'Shaft', 'Medial/lateral condyles', 'Intercondylar fossa'],
		functions: ['وەڵامدانەوە بە کێشی لەش', 'ڕۆیشتن و ڕاکردن', 'لەکەڵک ماسولکەی قاچ', 'گواستنەوەی هێز'],
		commonInjuries: ['Hip fracture (neck of femur)', 'Femoral shaft fracture', 'Femoral stress fracture', 'Hip osteoarthritis'],
		treatments: ['Hip replacement (arthroplasty)', 'ORIF surgery', 'Intramedullary nailing', 'فیزیۆتێراپی درێژخایەن'],
		exercises: ['Hip flexion', 'Hip extension', 'Hip abduction/adduction', 'Squats', 'Leg press']
	},
	patella: {
		name: 'کاسەی ئەژنۆ (Patella)',
		description: 'گەورەترین ئێسقانی sesamoid لە لەشدا. لە tendon-ی quadriceps دایە.',
		parts: ['Anterior surface', 'Posterior (articular) surface', 'Base', 'Apex'],
		functions: ['زیادکردنی leverage ی quadriceps', 'پاراستنی جومگەی ئەژنۆ', 'کەمکردنەوەی friction'],
		commonInjuries: ['Patellar fracture', 'Patellar dislocation', 'Patellofemoral pain syndrome', 'Patellar tendinitis', 'Chondromalacia patellae'],
		treatments: ['نەشتەرگەری (ORIF)', 'Patellar realignment', 'فیزیۆتێراپی', 'Knee bracing', 'PRP injection'],
		exercises: ['Quad sets', 'Straight leg raises', 'Terminal knee extension', 'VMO strengthening', 'Patellar mobilization']
	},
	tibia: {
		name: 'قەڵەمساق (Tibia)',
		description: 'گەورەترین ئێسقانی ساق. بەرگری لە زۆربەی کێش دەکات.',
		parts: ['Tibial plateau (medial/lateral)', 'Tibial tuberosity', 'Shaft', 'Medial malleolus', 'Tibial plafond'],
		functions: ['بەرگری لە کێش', 'جومگەی ئەژنۆ', 'جومگەی مەچەک', 'لەکەڵک ماسولکە'],
		commonInjuries: ['Tibial plateau fracture', 'Tibial shaft fracture', 'Stress fracture', 'Shin splints'],
		treatments: ['ORIF surgery', 'Intramedullary nailing', 'Casting', 'فیزیۆتێراپی'],
		exercises: ['Calf raises', 'Dorsiflexion', 'Balance exercises', 'Tibialis anterior strengthening']
	},
	fibula: {
		name: 'ماسووڵکە (Fibula)',
		description: 'ئێسقانی باریکی لای دەرەوەی ساق. بەشداری لە جومگەی مەچەک دەکات.',
		parts: ['Head of fibula', 'Neck', 'Shaft', 'Lateral malleolus'],
		functions: ['جێگیری مەچەک', 'لەکەڵک ماسولکە', 'پشتگیری لاوەکی', '15% کێش بەرگری دەکات'],
		commonInjuries: ['Fibula fracture', 'Proximal fibula fracture', 'Ankle fracture'],
		treatments: ['Casting', 'ORIF surgery', 'فیزیۆتێراپی'],
		exercises: ['Ankle circles', 'Peroneal strengthening', 'Balance board']
	},
	// Joints
	shoulder_joint: {
		name: 'جومگەی شان (Glenohumeral Joint)',
		description: 'جومگەیەکی ball-and-socket کە زۆرترین range of motion لە لەشدا هەیە.',
		parts: ['Humeral head', 'Glenoid cavity', 'Labrum', 'Rotator cuff (4 muscles)', 'Joint capsule', 'Bursa'],
		functions: ['Flexion/extension', 'Abduction/adduction', 'Internal/external rotation', 'Circumduction'],
		commonInjuries: ['Rotator cuff tear', 'Shoulder impingement', 'Labral tear', 'Frozen shoulder', 'Shoulder dislocation', 'Bursitis'],
		treatments: ['فیزیۆتێراپی', 'Arthroscopic surgery', 'Rotator cuff repair', 'Labral repair', 'Shoulder replacement'],
		exercises: ['External rotation', 'Internal rotation', 'Scaption', 'Rows', 'Face pulls', 'Sleeper stretch']
	},
	elbow_joint: {
		name: 'جومگەی ئەژنۆی دەست (Elbow Joint)',
		description: 'جومگەیەکی hinge کە لە سێ articulation پێکهاتووە.',
		parts: ['Humeroulnar joint', 'Humeroradial joint', 'Proximal radioulnar joint', 'Collateral ligaments'],
		functions: ['Flexion/extension (0-150°)', 'Pronation/supination', 'Carrying angle'],
		commonInjuries: ['Tennis elbow (lateral epicondylitis)', 'Golfer elbow (medial epicondylitis)', 'Elbow dislocation', 'UCL tear', 'Olecranon bursitis'],
		treatments: ['فیزیۆتێراپی', 'Eccentric exercises', 'PRP injection', 'Tommy John surgery (UCL)', 'Elbow arthroscopy'],
		exercises: ['Wrist curls', 'Reverse wrist curls', 'Pronation/supination', 'Tyler twist', 'Flexbar exercises']
	},
	hip_joint: {
		name: 'جومگەی ڕان (Hip Joint)',
		description: 'جومگەیەکی ball-and-socket کە زۆر جێگیرە بەراورد بە شان.',
		parts: ['Femoral head', 'Acetabulum', 'Labrum', 'Joint capsule', 'Ligaments (iliofemoral, pubofemoral, ischiofemoral)'],
		functions: ['Flexion/extension', 'Abduction/adduction', 'Internal/external rotation', 'بەرگری لە کێش'],
		commonInjuries: ['Hip osteoarthritis', 'Labral tear', 'Hip impingement (FAI)', 'Hip bursitis', 'Avascular necrosis'],
		treatments: ['فیزیۆتێراپی', 'Hip arthroscopy', 'Hip replacement', 'Core strengthening', 'Activity modification'],
		exercises: ['Clamshells', 'Hip bridges', 'Hip flexor stretch', 'Piriformis stretch', 'Monster walks']
	},
	knee_joint: {
		name: 'جومگەی ئەژنۆ (Knee Joint)',
		description: 'گەورەترین جومگە لە لەشدا. جومگەیەکی modified hinge.',
		parts: ['Tibiofemoral joint', 'Patellofemoral joint', 'ACL', 'PCL', 'MCL', 'LCL', 'Medial meniscus', 'Lateral meniscus'],
		functions: ['Flexion/extension (0-135°)', 'بەرگری لە کێش', 'جێگیری', 'شۆک absorption'],
		commonInjuries: ['ACL tear', 'MCL tear', 'Meniscus tear', 'Patellar tendinitis', 'IT band syndrome', 'Knee osteoarthritis'],
		treatments: ['ACL reconstruction', 'Meniscectomy', 'Meniscus repair', 'Knee replacement', 'PRP/stem cell therapy', 'فیزیۆتێراپی'],
		exercises: ['Quad strengthening', 'Hamstring curls', 'Leg press', 'Wall sits', 'Balance exercises', 'Foam rolling IT band']
	},
	ankle_joint: {
		name: 'جومگەی مەچەک (Ankle Joint)',
		description: 'جومگەیەکی hinge کە پێ بە قاچ دەبەستێتەوە.',
		parts: ['Tibia', 'Fibula', 'Talus', 'Deltoid ligament', 'ATFL', 'CFL', 'PTFL'],
		functions: ['Dorsiflexion/plantarflexion', 'جێگیری', 'بەرگری لە کێش', 'هاوسەنگی'],
		commonInjuries: ['Ankle sprain', 'Ankle fracture', 'Achilles tendinitis', 'Peroneal tendinitis', 'Ankle instability'],
		treatments: ['RICE protocol', 'Ankle bracing', 'فیزیۆتێراپی', 'ORIF surgery', 'Ankle arthroscopy', 'Ligament reconstruction'],
		exercises: ['Ankle alphabet', 'Heel raises', 'Dorsiflexion', 'Eversion/inversion', 'Balance board', 'Single-leg stance']
	},
	// Muscles - Major Groups
	pectoralis: {
		name: 'ماسولکەی سنگ (Pectoralis Major)',
		description: 'گەورەترین ماسولکەی سنگ. بۆ پەستانکردنی باڵ و گەڕانەوەی ناوەوە.',
		parts: ['Clavicular head', 'Sternal head', 'Abdominal head'],
		functions: ['Shoulder adduction', 'Internal rotation', 'Flexion', 'Horizontal adduction'],
		commonInjuries: ['Pectoralis major tear', 'Pec strain', 'Chest muscle spasm', 'Costochondritis'],
		treatments: ['RICE', 'فیزیۆتێراپی', 'نەشتەرگەری (بۆ complete tear)', 'PRP injection', 'Eccentric strengthening'],
		exercises: ['Push-ups', 'Bench press', 'Chest fly', 'Cable crossovers', 'Pec stretch']
	},
	latissimus: {
		name: 'ماسولکەی پشت (Latissimus Dorsi)',
		description: 'گەورەترین ماسولکەی پشت. شێوەی V دروست دەکات.',
		parts: ['Vertebral attachment', 'Iliac crest', 'Inferior angle of scapula', 'Ribs 9-12'],
		functions: ['Shoulder extension', 'Adduction', 'Internal rotation', 'Pulling movements'],
		commonInjuries: ['Lat strain', 'Lat tear', 'Lower back pain', 'Muscle spasm'],
		treatments: ['حەساسکردنەوە', 'ماساژ', 'فیزیۆتێراپی', 'Stretching', 'Strengthening'],
		exercises: ['Pull-ups', 'Rows', 'Lat pulldown', 'Dead lifts', 'Lat stretch']
	},
	deltoid: {
		name: 'ماسولکەی شان (Deltoid)',
		description: 'ماسولکەیەکی سێ سەرە کە شانی تەواو دادەپۆشێت.',
		parts: ['Anterior deltoid', 'Lateral deltoid', 'Posterior deltoid'],
		functions: ['Shoulder abduction', 'Flexion', 'Extension', 'Rotation', 'Stabilization'],
		commonInjuries: ['Deltoid strain', 'Deltoid tear', 'Shoulder impingement', 'Rotator cuff issues'],
		treatments: ['RICE', 'فیزیۆتێراپی', 'دەرمانی دژەژانکوژ', 'نەشتەرگەری (نادر)', 'Shoulder exercises'],
		exercises: ['Lateral raises', 'Front raises', 'Rear delt fly', 'Military press', 'Shoulder shrugs']
	},
	biceps: {
		name: 'بایسێپس (Biceps Brachii)',
		description: 'ماسولکەی دوو سەری باڵی سەرەوە. بۆ چەماندنەوەی ئەژنۆ.',
		parts: ['Long head', 'Short head', 'Bicipital tendon'],
		functions: ['Elbow flexion', 'Forearm supination', 'Shoulder flexion', 'Shoulder stability'],
		commonInjuries: ['Biceps tendinitis', 'Biceps tear', 'Bicipital tendonitis', 'SLAP tear'],
		treatments: ['حەساسکردنەوە', 'فیزیۆتێراپی', 'نەشتەرگەری (biceps tenodesis)', 'Eccentric exercises'],
		exercises: ['Bicep curls', 'Hammer curls', 'Chin-ups', 'Preacher curls', 'Eccentric curls']
	},
	triceps: {
		name: 'ترایسێپس (Triceps Brachii)',
		description: 'ماسولکەی سێ سەری لای پشتەوەی باڵ. بۆ درێژکردنەوەی ئەژنۆ.',
		parts: ['Long head', 'Lateral head', 'Medial head'],
		functions: ['Elbow extension', 'Shoulder extension', 'Shoulder adduction', 'Arm stability'],
		commonInjuries: ['Triceps tendinitis', 'Triceps tear', 'Elbow pain', 'Muscle strain'],
		treatments: ['حەساسکردنەوە', 'فیزیۆتێراپی', 'نەشتەرگەری (نادر)', 'Eccentric training'],
		exercises: ['Tricep dips', 'Close-grip bench press', 'Tricep extensions', 'Skull crushers', 'Diamond push-ups']
	},
	quadriceps: {
		name: 'کوادریسێپس (Quadriceps)',
		description: 'ماسولکەی چوار سەری ڕانی پێشەوە. گەورەترین ماسولکە لە لەشدا.',
		parts: ['Rectus femoris', 'Vastus lateralis', 'Vastus medialis (VMO)', 'Vastus intermedius'],
		functions: ['Knee extension', 'Hip flexion (rectus femoris)', 'Standing', 'Walking', 'Running', 'Jumping'],
		commonInjuries: ['Quad strain', 'Patellar tendinitis', 'Quad contusion', 'VMO weakness'],
		treatments: ['RICE', 'فیزیۆتێراپی', 'VMO strengthening', 'Stretching', 'PRP injection'],
		exercises: ['Squats', 'Leg extensions', 'Lunges', 'Wall sits', 'VMO exercises', 'Terminal knee extension']
	},
	hamstrings: {
		name: 'هامسترینگ (Hamstrings)',
		description: 'ماسولکەی سێ سەری لای پشتەوەی ڕان.',
		parts: ['Biceps femoris', 'Semitendinosus', 'Semimembranosus'],
		functions: ['Knee flexion', 'Hip extension', 'Pelvic stability', 'Deceleration', 'Running'],
		commonInjuries: ['Hamstring strain', 'Hamstring tear', 'Tendinopathy', 'High hamstring injury'],
		treatments: ['RICE', 'Eccentric exercises', 'فیزیۆتێراپی', 'PRP injection', 'نەشتەرگەری (گەر complete tear)'],
		exercises: ['Deadlifts', 'Nordic hamstring curls', 'Leg curls', 'Romanian deadlifts', 'Glute-ham raises']
	},
	gastrocnemius: {
		name: 'ماسولکەی ساق (Gastrocnemius)',
		description: 'ماسولکەی گەورەی ساق کە شێوەی ساق دروست دەکات.',
		parts: ['Medial head', 'Lateral head', 'Achilles tendon'],
		functions: ['Ankle plantarflexion', 'Knee flexion', 'Walking', 'Running', 'Jumping', 'Balance'],
		commonInjuries: ['Calf strain', 'Gastrocnemius tear', 'Achilles tendinitis', 'Calf cramps'],
		treatments: ['RICE', 'فیزیۆتێراپی', 'Eccentric calf exercises', 'Stretching', 'Massage'],
		exercises: ['Calf raises', 'Eccentric calf drops', 'Jump rope', 'Box jumps', 'Calf stretch']
	},
	// Nervous System
	spinal_cord: {
		name: 'نەخاعی پشت (Spinal Cord)',
		description: 'رێڕەوی سەرەکی دەماری لە مێشکەوە بۆ لەش. لە ستوونی پشتدا پارێزراوە.',
		parts: ['Cervical enlargement', 'Thoracic cord', 'Lumbar enlargement', 'Conus medullaris', 'Cauda equina', '31 pairs of spinal nerves'],
		functions: ['گواستنەوەی زانیاری بۆ مێشک', 'گواستنەوەی فەرمان لە مێشکەوە', 'Reflex actions', 'هەماهەنگی جوڵە'],
		commonInjuries: ['Spinal cord injury (SCI)', 'Spinal stenosis', 'Compression', 'Transverse myelitis', 'Cauda equina syndrome'],
		treatments: ['نەشتەرگەری فریاگوزاری', 'Decompression', 'Stabilization', 'تێراپی توانبەخشی', 'دەرمانی دژەژانکوژ', 'تێراپی خانە'],
		exercises: ['Gentle mobility', 'Nerve gliding', 'Strengthening', 'Balance training', 'Functional activities']
	},
	brachial_plexus: {
		name: 'تۆڕی دەماری باڵ (Brachial Plexus)',
		description: 'تۆڕێک لە دەمارەکان کە لە C5-T1 سەرچاوە دەگرن و باڵ کنترۆڵ دەکەن.',
		parts: ['Roots (C5-T1)', 'Trunks', 'Divisions', 'Cords', 'Branches (musculocutaneous, median, ulnar, radial, axillary)'],
		functions: ['کنترۆڵی ماسولکەکانی باڵ', 'هەستی باڵ و دەست', 'Shoulder movements', 'Elbow flexion/extension', 'Hand function'],
		commonInjuries: ['Brachial plexus injury', 'Stinger/burner', 'Erb palsy', 'Klumpke palsy', 'Thoracic outlet syndrome'],
		treatments: ['فیزیۆتێراپی', 'Nerve transfer surgery', 'Nerve grafting', 'دەرمانی ئازار', 'تێراپی توانبەخشی'],
		exercises: ['Nerve gliding', 'Range of motion', 'Progressive strengthening', 'Functional training', 'Desensitization']
	},
	sciatic_nerve: {
		name: 'دەماری سیاتیک (Sciatic Nerve)',
		description: 'گەورەترین دەماری لەشی مرۆڤ. لە L4-S3 سەرچاوە دەگرێت.',
		parts: ['Tibial division', 'Common peroneal division', 'Branches to hamstrings', 'Branches to lower leg'],
		functions: ['کنترۆڵی ماسولکەکانی ڕان و ساق', 'هەستی قاچ و پێ', 'Knee flexion', 'Ankle movements', 'Foot movements'],
		commonInjuries: ['Sciatica', 'Piriformis syndrome', 'Sciatic nerve compression', 'Lumbar radiculopathy', 'Herniated disc'],
		treatments: ['فیزیۆتێراپی', 'Nerve gliding', 'Epidural injection', 'Lumbar decompression', 'دەرمانی ئازار', 'Chiropractic'],
		exercises: ['Nerve flossing', 'Piriformis stretch', 'Lumbar stabilization', 'Core strengthening', 'Hamstring stretches']
	},
	median_nerve: {
		name: 'دەماری ناوەڕاست (Median Nerve)',
		description: 'دەمارێکی سەرەکی باڵ کە بە کەناڵی carpal tunnel-ەوە دەڕوات.',
		parts: ['Proximal course', 'Carpal tunnel', 'Palmar branches', 'Digital branches'],
		functions: ['Thumb opposition', 'Wrist flexion', 'Finger flexion', 'Sensation palm & fingers', 'Fine motor skills'],
		commonInjuries: ['Carpal tunnel syndrome', 'Median nerve compression', 'Pronator syndrome', 'Nerve injury'],
		treatments: ['Wrist splinting', 'فیزیۆتێراپی', 'Carpal tunnel release', 'Nerve gliding', 'Ergonomic modifications'],
		exercises: ['Nerve glides', 'Wrist stretches', 'Grip strengthening', 'Thumb opposition', 'Hand dexterity exercises']
	},
	ulnar_nerve: {
		name: 'دەماری ئەڵنە (Ulnar Nerve)',
		description: 'دەمارێک کە بە کوێڵی ئەژنۆدا دەڕوات و دەستی دەگاتە دوو پەنجە.',
		parts: ['Cubital tunnel', 'Guyon canal', 'Dorsal branch', 'Palmar branch'],
		functions: ['Finger spreading', 'Grip strength', 'Pinch strength', 'Sensation 4th & 5th fingers'],
		commonInjuries: ['Cubital tunnel syndrome', 'Ulnar nerve entrapment', 'Guyon canal syndrome', 'Ulnar neuropathy'],
		treatments: ['Elbow bracing', 'فیزیۆتێراپی', 'Nerve decompression', 'Nerve transposition', 'Nerve gliding'],
		exercises: ['Nerve glides', 'Elbow stretches', 'Grip exercises', 'Finger spreading', 'Wrist mobility']
	},
	radial_nerve: {
		name: 'دەماری تیشک (Radial Nerve)',
		description: 'دەمارێک کە لای پشتەوەی باڵ دەڕوات و دەست و پەنجەکان درێژ دەکاتەوە.',
		parts: ['Spiral groove', 'Radial tunnel', 'Posterior interosseous nerve', 'Superficial branch'],
		functions: ['Wrist extension', 'Finger extension', 'Thumb extension', 'Sensation back of hand', 'Triceps function'],
		commonInjuries: ['Radial nerve palsy', 'Saturday night palsy', 'Radial tunnel syndrome', 'Nerve compression'],
		treatments: ['Wrist splinting', 'فیزیۆتێراپی', 'Nerve decompression', 'Strengthening exercises', 'Nerve gliding'],
		exercises: ['Nerve glides', 'Wrist extension exercises', 'Finger extension', 'Grip strengthening', 'Range of motion']
	}
}

// Component to search and display Sketchfab models with interactive annotations
function SketchfabSearch({ searchQuery, label }: { searchQuery: string; label: string }) {
	const [modelId, setModelId] = useState<string>('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string>('')
	const [selectedPart, setSelectedPart] = useState<string | null>(null)
	const [showInfo, setShowInfo] = useState(false)
	const [showTestButtons, setShowTestButtons] = useState(false)
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const apiRef = useRef<any>(null)

	// Debug: Monitor state changes
	useEffect(() => {
		console.log('🔍 STATE CHANGED:', { selectedPart, showInfo })
		const info = selectedPart ? anatomyInfo[selectedPart] : null
		if (selectedPart && info) {
			console.log('✅ Info available for:', info.name)
			console.log('🎨 RENDER CHECK: Panel will', showInfo && info ? 'SHOW' : 'HIDE')
		} else if (selectedPart) {
			console.warn('⚠️ No anatomyInfo for:', selectedPart)
		}
	}, [selectedPart, showInfo])

	useEffect(() => {
		// Search Sketchfab Data API for anatomy models
		const searchModels = async () => {
			try {
				setLoading(true)
				setError('')
				
				const response = await fetch(
					`https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(searchQuery)}&downloadable=true&sort_by=-likeCount`,
					{
						headers: {
							'Accept': 'application/json',
						}
					}
				)

				if (!response.ok) {
					throw new Error('Failed to fetch models')
				}

				const data = await response.json()
				
				if (data.results && data.results.length > 0) {
					// Get the first result's UID
					const uid = data.results[0].uid
					setModelId(uid)
					console.log('✅ Found model:', data.results[0].name, '→', uid)
					
					// Initialize Sketchfab Viewer API after model is loaded
					setTimeout(() => initSketchfabAPI(uid), 1000)
				} else {
					setError('هیچ مۆدێلێک نەدۆزرایەوە')
				}
			} catch (err) {
				console.error('❌ Search error:', err)
				setError('کێشە لە گەڕان')
			} finally {
				setLoading(false)
			}
		}

		searchModels()
	}, [searchQuery])

	const initSketchfabAPI = (uid: string) => {
		if (!iframeRef.current || !window.Sketchfab) {
			// Load Sketchfab API script
			const script = document.createElement('script')
			script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'
			script.async = true
			script.onload = () => {
				setupAPI(uid)
			}
			document.body.appendChild(script)
		} else {
			setupAPI(uid)
		}
	}

	const setupAPI = (uid: string) => {
		if (!iframeRef.current || !window.Sketchfab) return

		const client = new window.Sketchfab(iframeRef.current)

		client.init(uid, {
			success: function (api: any) {
				apiRef.current = api
				
				api.addEventListener('viewerready', function () {
					console.log('✅ Professional Detection System Active')
					setLoading(false)
					
					// Get node map (all mesh names)
					api.getNodeMap(function (err: any, nodes: any) {
						if (!err) {
							const nodeArray = Object.values(nodes) as any[]
							console.log(`📊 Total meshes: ${nodeArray.length}`)
							nodeArray.forEach((node: any, idx: number) => {
								console.log(`  ${idx + 1}. ${node.name} (ID: ${node.instanceID})`)
							})
						}
					})
					
					// Enable professional click detection
					api.addEventListener('click', function (info: any) {
						if (info && info.position3D && info.instanceID !== null && info.instanceID !== undefined) {
							console.log('🎯 Click detected - Professional analysis...', { 
								instanceID: info.instanceID, 
								position: info.position3D 
							})
							
							// Get node information for the clicked mesh
							api.getNodeMap(function (err: any, nodes: any) {
								if (!err && nodes) {
									try {
										const nodeArray = Object.values(nodes) as any[]
										const clickedNode = nodeArray.find(
											(node: any) => node && node.instanceID === info.instanceID
										)
										
										if (clickedNode && clickedNode.name) {
											console.log('✅ Mesh identified:', clickedNode.name)
											handleProfessionalClick(info, clickedNode.name)
										} else {
											console.log('⚠️ Mesh has no name, using position-based detection')
											handlePositionClick(info)
										}
									} catch (error) {
										console.error('❌ Error finding node:', error)
										handlePositionClick(info)
									}
								} else {
									console.log('⚠️ getNodeMap failed, using position-based detection')
									handlePositionClick(info)
								}
							})
						} else {
							console.log('⚠️ Invalid click info, ignoring')
						}
					})

					// Get annotations
					api.getAnnotationList(function(err: any, annotations: any) {
						if (!err && annotations && annotations.length > 0) {
							console.log(`📍 ${annotations.length} annotations available`)
							annotations.forEach((ann: any, idx: number) => {
								console.log(`  ${idx + 1}. ${ann.name}`)
							})
						}
					})
				})
			},
			error: function () {
				console.error('❌ API initialization failed')
				setError('Failed to initialize 3D viewer')
				setLoading(false)
			}
		})
	}

	// Professional mesh name-based detection
	const handleProfessionalClick = (clickInfo: any, meshName: string | undefined | null) => {
		// Safety check - fallback if mesh name is invalid
		if (!meshName || typeof meshName !== 'string' || meshName.trim() === '') {
			console.log('⚠️ Invalid mesh name, using position-based detection')
			handlePositionClick(clickInfo)
			return
		}

		const name = meshName.toLowerCase()
		let detectedPart = 'unknown'

		// Skull & Head
		if (name.includes('skull') || name.includes('cranium') || name.includes('head') || 
		    name.includes('frontal') || name.includes('parietal') || name.includes('occipital') ||
		    name.includes('temporal') || name.includes('mandible') || name.includes('maxilla') ||
		    name.includes('jaw')) {
			detectedPart = 'skull'
		}
		// Cervical Spine
		else if (name.includes('c1') || name.includes('c2') || name.includes('c3') || 
		         name.includes('c4') || name.includes('c5') || name.includes('c6') || 
		         name.includes('c7') || name.includes('cervical') || name.includes('atlas') || 
		         name.includes('axis') || name.includes('neck')) {
			detectedPart = 'cervical'
		}
		// Thoracic Spine
		else if (name.includes('t1') || name.includes('t2') || name.includes('t3') || 
		         name.includes('t4') || name.includes('t5') || name.includes('t6') ||
		         name.includes('t7') || name.includes('t8') || name.includes('t9') ||
		         name.includes('t10') || name.includes('t11') || name.includes('t12') ||
		         name.includes('thoracic')) {
			detectedPart = 'thoracic'
		}
		// Lumbar Spine
		else if (name.includes('l1') || name.includes('l2') || name.includes('l3') || 
		         name.includes('l4') || name.includes('l5') || name.includes('lumbar')) {
			detectedPart = 'lumbar'
		}
		// Sacrum & Coccyx
		else if (name.includes('sacrum') || name.includes('coccyx') || name.includes('tailbone')) {
			detectedPart = 'sacrum'
		}
		// Ribs
		else if (name.includes('rib') || name.includes('costa')) {
			detectedPart = 'ribs'
		}
		// Clavicle
		else if (name.includes('clavicle') || name.includes('collar')) {
			detectedPart = 'clavicle'
		}
		// Scapula
		else if (name.includes('scapula') || name.includes('shoulder blade')) {
			detectedPart = 'scapula'
		}
		// Humerus
		else if (name.includes('humerus')) {
			detectedPart = 'humerus'
		}
		// Radius
		else if (name.includes('radius')) {
			detectedPart = 'radius'
		}
		// Ulna
		else if (name.includes('ulna')) {
			detectedPart = 'ulna'
		}
		// Shoulder Joint
		else if (name.includes('shoulder') || name.includes('glenohumeral')) {
			detectedPart = 'shoulder_joint'
		}
		// Elbow Joint
		else if (name.includes('elbow')) {
			detectedPart = 'elbow_joint'
		}
		// Pelvis
		else if (name.includes('pelvis') || name.includes('ilium') || name.includes('ischium') || 
		         name.includes('pubis') || name.includes('hip bone')) {
			detectedPart = 'pelvis'
		}
		// Femur
		else if (name.includes('femur') || name.includes('thigh')) {
			detectedPart = 'femur'
		}
		// Patella
		else if (name.includes('patella') || name.includes('kneecap')) {
			detectedPart = 'patella'
		}
		// Tibia
		else if (name.includes('tibia') || name.includes('shin')) {
			detectedPart = 'tibia'
		}
		// Fibula
		else if (name.includes('fibula')) {
			detectedPart = 'fibula'
		}
		// Hip Joint
		else if (name.includes('hip') || name.includes('acetabulum')) {
			detectedPart = 'hip_joint'
		}
		// Knee Joint
		else if (name.includes('knee')) {
			detectedPart = 'knee_joint'
		}
		// Ankle Joint
		else if (name.includes('ankle') || name.includes('talus')) {
			detectedPart = 'ankle_joint'
		}
		// Muscles - Major Groups (با پاتێرنی زیاتر)
		else if (name.includes('pectoralis') || name.includes('pectoral') || name.includes('chest muscle') || 
		         name.includes('pec') || name.includes('chest') || name.includes('breast') ||
		         name.includes('thorax') || name.match(/pector/i)) {
			detectedPart = 'pectoralis'
			console.log('💪 Detected: Pectoralis muscle')
		}
		else if (name.includes('latissimus') || name.includes('lat') || name.includes('back muscle') ||
		         name.includes('dorsi') || name.match(/latiss/i)) {
			detectedPart = 'latissimus'
			console.log('💪 Detected: Latissimus muscle')
		}
		else if (name.includes('deltoid') || name.includes('shoulder muscle') || name.match(/delt/i)) {
			detectedPart = 'deltoid'
			console.log('💪 Detected: Deltoid muscle')
		}
		else if (name.includes('biceps') || name.includes('bicep') || name.match(/bicep/i)) {
			detectedPart = 'biceps'
			console.log('💪 Detected: Biceps muscle')
		}
		else if (name.includes('triceps') || name.includes('tricep') || name.match(/tricep/i)) {
			detectedPart = 'triceps'
			console.log('💪 Detected: Triceps muscle')
		}
		else if (name.includes('quadriceps') || name.includes('quad') || name.includes('rectus femoris') || 
		         name.includes('vastus') || name.match(/quad/i)) {
			detectedPart = 'quadriceps'
			console.log('💪 Detected: Quadriceps muscle')
		}
		else if (name.includes('hamstring') || name.includes('biceps femoris') || name.includes('semitendinosus') || 
		         name.includes('semimembranosus') || name.match(/ham/i)) {
			detectedPart = 'hamstrings'
			console.log('💪 Detected: Hamstring muscles')
		}
		else if (name.includes('gastrocnemius') || name.includes('calf') || name.includes('soleus') ||
		         name.match(/gastro/i) || name.match(/calf/i)) {
			detectedPart = 'gastrocnemius'
			console.log('💪 Detected: Gastrocnemius (calf) muscle')
		}
		// ماسڵە گشتییەکان - Any muscle
		else if (name.includes('muscle') || name.match(/muscul/i)) {
			console.log('💪 Generic muscle detected, analyzing position...')
			// Fallback بۆ position-based detection
			handlePositionClick(clickInfo)
			return
		}
		// Nervous System
		else if (name.includes('spinal cord') || name.includes('medulla') || name.includes('cord')) {
			detectedPart = 'spinal_cord'
		}
		else if (name.includes('brachial plexus') || name.includes('nerve plexus') || name.includes('plexus brachial')) {
			detectedPart = 'brachial_plexus'
		}
		else if (name.includes('sciatic') || name.includes('ischiadicus')) {
			detectedPart = 'sciatic_nerve'
		}
		else if (name.includes('median nerve') || name.includes('medianus')) {
			detectedPart = 'median_nerve'
		}
		else if (name.includes('ulnar nerve') || name.includes('ulnaris')) {
			detectedPart = 'ulnar_nerve'
		}
		else if (name.includes('radial nerve') || name.includes('radialis')) {
			detectedPart = 'radial_nerve'
		}
		// Additional common terms
		else if (name.includes('muscle') && name.includes('chest')) {
			detectedPart = 'pectoralis'
		}
		else if (name.includes('muscle') && name.includes('back')) {
			detectedPart = 'latissimus'
		}
		else if (name.includes('nerve') && name.includes('arm')) {
			detectedPart = 'brachial_plexus'
		}
		else if (name.includes('nerve') && name.includes('leg')) {
			detectedPart = 'sciatic_nerve'
		}
		// Fallback to position-based
		else {
			console.log('⚠️ Mesh name not recognized, using position-based detection')
			handlePositionClick(clickInfo)
			return
		}

		console.log('🎯 Detection result:', detectedPart, 'from mesh:', meshName)
		setSelectedPart(detectedPart)
		setShowInfo(true)
		console.log('✅ State updated:', { selectedPart: detectedPart, showInfo: true })
		
		// Verify the anatomyInfo has this part
		if (anatomyInfo[detectedPart]) {
			console.log('✅ Info found:', anatomyInfo[detectedPart].name)
		} else {
			console.warn('⚠️ No info for part:', detectedPart)
		}
	}

	// 3D anatomical reference points for professional detection
	const anatomyPoints: Record<string, { x: number; y: number; z: number; radius: number }> = {
		// Head & Neck
		skull: { x: 0, y: 1.65, z: 0, radius: 0.2 },
		cervical: { x: 0, y: 1.35, z: -0.08, radius: 0.12 },
		// Spine
		thoracic: { x: 0, y: 0.95, z: -0.11, radius: 0.15 },
		lumbar: { x: 0, y: 0.65, z: -0.11, radius: 0.12 },
		sacrum: { x: 0, y: 0.48, z: -0.05, radius: 0.1 },
		// Ribs & Chest
		ribs: { x: 0.15, y: 1.0, z: 0, radius: 0.18 },
		// Upper Extremity - Right Side
		clavicle: { x: 0.12, y: 1.22, z: 0.08, radius: 0.1 },
		scapula: { x: 0.22, y: 1.1, z: -0.08, radius: 0.12 },
		shoulder_joint: { x: 0.25, y: 1.1, z: 0, radius: 0.11 },
		humerus: { x: 0.27, y: 0.78, z: 0, radius: 0.08 },
		elbow_joint: { x: 0.29, y: 0.55, z: 0, radius: 0.07 },
		radius: { x: 0.295, y: 0.35, z: 0.015, radius: 0.06 },
		ulna: { x: 0.305, y: 0.35, z: -0.015, radius: 0.06 },
		// Upper Extremity - Left Side
		clavicle_left: { x: -0.12, y: 1.22, z: 0.08, radius: 0.1 },
		scapula_left: { x: -0.22, y: 1.1, z: -0.08, radius: 0.12 },
		shoulder_joint_left: { x: -0.25, y: 1.1, z: 0, radius: 0.11 },
		humerus_left: { x: -0.27, y: 0.78, z: 0, radius: 0.08 },
		elbow_joint_left: { x: -0.29, y: 0.55, z: 0, radius: 0.07 },
		radius_left: { x: -0.295, y: 0.35, z: 0.015, radius: 0.06 },
		ulna_left: { x: -0.305, y: 0.35, z: -0.015, radius: 0.06 },
		// Lower Extremity - Pelvis
		pelvis: { x: 0, y: 0.48, z: 0, radius: 0.18 },
		hip_joint: { x: 0.16, y: 0.45, z: 0, radius: 0.09 },
		hip_joint_left: { x: -0.16, y: 0.45, z: 0, radius: 0.09 },
		// Lower Extremity - Right Leg
		femur: { x: 0.11, y: 0.0, z: 0, radius: 0.08 },
		patella: { x: 0.11, y: -0.2, z: 0.09, radius: 0.05 },
		knee_joint: { x: 0.11, y: -0.25, z: 0, radius: 0.09 },
		tibia: { x: 0.11, y: -0.65, z: 0, radius: 0.06 },
		fibula: { x: 0.15, y: -0.65, z: 0, radius: 0.05 },
		ankle_joint: { x: 0.11, y: -1.0, z: 0, radius: 0.08 },
		// Lower Extremity - Left Leg
		femur_left: { x: -0.11, y: 0.0, z: 0, radius: 0.08 },
		patella_left: { x: -0.11, y: -0.2, z: 0.09, radius: 0.05 },
		knee_joint_left: { x: -0.11, y: -0.25, z: 0, radius: 0.09 },
		tibia_left: { x: -0.11, y: -0.65, z: 0, radius: 0.06 },
		fibula_left: { x: -0.15, y: -0.65, z: 0, radius: 0.05 },
		ankle_joint_left: { x: -0.11, y: -1.0, z: 0, radius: 0.08 },
		// Muscles - Major Groups
		pectoralis: { x: 0.11, y: 1.05, z: 0.11, radius: 0.15 },
		deltoid: { x: 0.25, y: 1.1, z: 0, radius: 0.11 },
		biceps: { x: 0.27, y: 0.85, z: 0.04, radius: 0.06 },
		triceps: { x: 0.27, y: 0.85, z: -0.04, radius: 0.06 },
		quadriceps: { x: 0.11, y: 0.05, z: 0.045, radius: 0.09 },
		hamstrings: { x: 0.11, y: 0.0, z: -0.045, radius: 0.08 },
		gastrocnemius: { x: 0.11, y: -0.75, z: -0.02, radius: 0.06 }
	}

	// Calculate 3D Euclidean distance
	const distance3D = (p1: { x: number; y: number; z: number }, p2: { x: number; y: number; z: number }): number => {
		const dx = p1.x - p2.x
		const dy = p1.y - p2.y
		const dz = p1.z - p2.z
		return Math.sqrt(dx * dx + dy * dy + dz * dz)
	}

	// Fallback position-based detection with precise 3D point matching
	const handlePositionClick = (clickInfo: any) => {
		// Safety checks
		if (!clickInfo || !clickInfo.position3D) {
			console.error('❌ Invalid click info for position detection')
			return
		}

		// Extract coordinates - Sketchfab can return array or object
		let x: number, y: number, z: number
		
		if (Array.isArray(clickInfo.position3D)) {
			// Array format: [x, y, z]
			if (clickInfo.position3D.length < 3) {
				console.error('❌ Position array too short')
				return
			}
			x = clickInfo.position3D[0]
			y = clickInfo.position3D[1]
			z = clickInfo.position3D[2]
		} else if (typeof clickInfo.position3D === 'object') {
			// Object format: { x, y, z } or { 0, 1, 2 }
			x = clickInfo.position3D.x ?? clickInfo.position3D[0]
			y = clickInfo.position3D.y ?? clickInfo.position3D[1]
			z = clickInfo.position3D.z ?? clickInfo.position3D[2]
		} else {
			console.error('❌ Unknown position3D format:', typeof clickInfo.position3D)
			return
		}

		// Validate coordinates are numbers
		if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' ||
		    isNaN(x) || isNaN(y) || isNaN(z)) {
			console.error('❌ Invalid coordinates:', { x, y, z })
			return
		}

		const clickPoint = { x, y, z }
		let detectedPart = 'unknown'
		let minDistance = Infinity

		// Find the closest anatomical point
		for (const [partName, point] of Object.entries(anatomyPoints)) {
			const dist = distance3D(clickPoint, point)
			
			// Check if click is within the radius of this anatomical structure
			if (dist <= point.radius && dist < minDistance) {
				minDistance = dist
				// Remove _left suffix for anatomy info lookup
				detectedPart = partName.replace('_left', '')
			}
		}

		// If no close match found, try fallback logic
		if (detectedPart === 'unknown') {
			console.log('⚠️ No close anatomical point, using fallback detection')
			
			// Simple Y-axis fallback
			if (y > 1.5) detectedPart = 'skull'
			else if (y > 1.2) detectedPart = 'cervical'
			else if (y > 0.8) detectedPart = 'thoracic'
			else if (y > 0.5) detectedPart = 'lumbar'
			else if (y > 0.2) detectedPart = 'pelvis'
			else if (y > -0.3) detectedPart = 'femur'
			else if (y > -0.7) detectedPart = 'knee_joint'
			else if (y > -1.0) detectedPart = 'tibia'
			else detectedPart = 'ankle_joint'
		}

		setSelectedPart(detectedPart)
		setShowInfo(true)
		
		console.log('🎯 Professional point detection:', detectedPart, 'at:', { 
			x: x.toFixed(3), 
			y: y.toFixed(3), 
			z: z.toFixed(3),
			distance: minDistance.toFixed(3)
		})
	}

	if (loading) {
		return (
			<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
				<div style={{ textAlign: 'center' }}>
					<div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
					<div>گەڕان بەدوای مۆدێلی {label}...</div>
				</div>
			</div>
		)
	}

	if (error || !modelId) {
		return (
			<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
				<div style={{ textAlign: 'center' }}>
					<div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
					<div>{error || 'هیچ مۆدێلێک نەدۆزرایەوە'}</div>
				</div>
			</div>
		)
	}

	const info = selectedPart ? anatomyInfo[selectedPart] : null

	return (
		<div style={{ 
			width: '100%', 
			height: '100%', 
			position: 'relative', 
			background: '#0f172a',
			touchAction: 'none', // بۆ باشتربوونی touch لە مۆبایل
			userSelect: 'none',
			WebkitUserSelect: 'none',
			WebkitTouchCallout: 'none',
		}}>
			{/* ڕێنمایی مۆبایل */}
			<div style={{
				position: 'absolute',
				top: '10px',
				left: '50%',
				transform: 'translateX(-50%)',
				background: 'rgba(0,0,0,0.7)',
				color: '#94a3b8',
				padding: '8px 16px',
				borderRadius: '20px',
				fontSize: '12px',
				zIndex: 10,
				display: 'flex',
				alignItems: 'center',
				gap: '12px',
				backdropFilter: 'blur(8px)',
				border: '1px solid rgba(255,255,255,0.1)',
				whiteSpace: 'nowrap',
			}}>
				<span>👆 سوڕاندن</span>
				<span>🤏 زووم</span>
				<span>👆👆 کلیک = زانیاری</span>
			</div>

			<iframe 
				ref={iframeRef}
				title={label}
				frameBorder="0"
				allowFullScreen
				allow="autoplay; fullscreen; xr-spatial-tracking"
				src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark&ui_hint=0&ui_controls=1&ui_infos=0&ui_inspector=0&ui_watermark=0&preload=1`}
				style={{ 
					width: '100%', 
					height: '100%',
					border: 'none',
					touchAction: 'manipulation', // باشتربوونی touch
				}}
			/>
			
			{/* Toggle Test Buttons */}
			<button
				onClick={() => setShowTestButtons(!showTestButtons)}
				style={{
					position: 'absolute',
					top: '10px',
					left: '10px',
					background: 'rgba(139, 92, 246, 0.9)',
					color: 'white',
					padding: '8px 12px',
					borderRadius: '6px',
					fontSize: '12px',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					border: '1px solid rgba(139, 92, 246, 0.5)',
					cursor: 'pointer',
					boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
					zIndex: 1000
				}}
			>
				{showTestButtons ? '✕ ' : '🧪 '}تەست
			</button>

			{/* Test Buttons Panel */}
			{showTestButtons && (
				<div style={{
					position: 'absolute',
					top: '50px',
					left: '10px',
					display: 'flex',
					gap: '8px',
					flexDirection: 'column',
					zIndex: 999
				}}>
					<button
						onClick={() => {
							console.log('🧪 TEST: Skull')
							setSelectedPart('skull')
							setShowInfo(true)
						}}
						style={{
							background: 'rgba(59, 130, 246, 0.9)',
							color: 'white',
							padding: '8px 12px',
							borderRadius: '6px',
							fontSize: '12px',
							fontFamily: 'system-ui, -apple-system, sans-serif',
							border: '1px solid rgba(59, 130, 246, 0.5)',
							cursor: 'pointer',
							boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
						}}
					>
						💀 کاسەسەر
					</button>
					<button
						onClick={() => {
							console.log('🧪 TEST: Pectoralis')
							setSelectedPart('pectoralis')
							setShowInfo(true)
						}}
						style={{
							background: 'rgba(236, 72, 153, 0.9)',
							color: 'white',
							padding: '8px 12px',
							borderRadius: '6px',
							fontSize: '12px',
							fontFamily: 'system-ui, -apple-system, sans-serif',
							border: '1px solid rgba(236, 72, 153, 0.5)',
							cursor: 'pointer',
							boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
						}}
					>
						💪 ماسولکەی سنگ
					</button>
					<button
						onClick={() => {
							console.log('🧪 TEST: Femur')
							setSelectedPart('femur')
							setShowInfo(true)
						}}
						style={{
							background: 'rgba(16, 185, 129, 0.9)',
							color: 'white',
							padding: '8px 12px',
							borderRadius: '6px',
							fontSize: '12px',
							fontFamily: 'system-ui, -apple-system, sans-serif',
							border: '1px solid rgba(16, 185, 129, 0.5)',
							cursor: 'pointer',
							boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
						}}
					>
						🦴 قەتاری ڕان
					</button>
					<button
						onClick={() => {
							console.log('🧪 HIDE INFO')
							setShowInfo(false)
						}}
						style={{
							background: 'rgba(239, 68, 68, 0.9)',
							color: 'white',
							padding: '8px 12px',
							borderRadius: '6px',
							fontSize: '12px',
							fontFamily: 'system-ui, -apple-system, sans-serif',
							border: '1px solid rgba(239, 68, 68, 0.5)',
							cursor: 'pointer',
							boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
						}}
					>
						✕ داخستن
					</button>
				</div>
			)}

			{/* Instructions */}
			<div style={{
				position: 'absolute',
				top: '10px',
				right: '10px',
				background: 'rgba(0,0,0,0.85)',
				color: 'white',
				padding: '10px 16px',
				borderRadius: '8px',
				fontSize: '13px',
				fontFamily: 'system-ui, -apple-system, sans-serif',
				backdropFilter: 'blur(8px)',
				border: '1px solid rgba(59, 130, 246, 0.3)',
				boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
			}}>
				👆 کلیک لەسەر هەر بەشێک بکە بۆ زانیاری پزیشکی
			</div>

			{/* Information Panel */}
			{showInfo && (
				<div style={{
					position: 'absolute',
					left: '20px',
					top: '20px',
					maxWidth: '400px',
					background: 'rgba(15, 23, 42, 0.95)',
					color: 'white',
					padding: '20px',
					borderRadius: '12px',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					backdropFilter: 'blur(12px)',
					border: '2px solid rgba(59, 130, 246, 0.5)',
					boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
					maxHeight: '80vh',
					overflowY: 'auto'
				}}>
					{info ? (
						<>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
								<h3 style={{ margin: 0, fontSize: '20px', color: '#60a5fa' }}>{info.name}</h3>
								<button
									onClick={() => setShowInfo(false)}
									style={{
										background: 'rgba(239, 68, 68, 0.2)',
										border: '1px solid rgba(239, 68, 68, 0.5)',
										color: '#fca5a5',
										cursor: 'pointer',
										padding: '6px 12px',
										borderRadius: '6px',
										fontSize: '16px'
									}}
								>
									✕
								</button>
							</div>
							<p style={{ fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1', marginBottom: '16px' }}>
								{info.description}
							</p>
						</>
					) : (
						<>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
								<h3 style={{ margin: 0, fontSize: '20px', color: '#f59e0b' }}>⚠️ هیچ زانیاریەک نییە</h3>
								<button
									onClick={() => setShowInfo(false)}
									style={{
										background: 'rgba(239, 68, 68, 0.2)',
										border: '1px solid rgba(239, 68, 68, 0.5)',
										color: '#fca5a5',
										cursor: 'pointer',
										padding: '6px 12px',
										borderRadius: '6px',
										fontSize: '16px'
									}}
								>
									✕
								</button>
							</div>
							<p style={{ fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1' }}>
								زانیاری بۆ "{selectedPart}" بەردەست نییە
							</p>
						</>
					)}
					{info && (
						<>
					<div style={{ marginBottom: '16px' }}>
						<h4 style={{ color: '#60a5fa', fontSize: '16px', marginBottom: '8px', borderBottom: '1px solid rgba(59, 130, 246, 0.3)', paddingBottom: '4px' }}>
							🧩 بەشەکان
						</h4>
						<ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1' }}>
							{info.parts.map((part: string, i: number) => (
								<li key={i} style={{ marginBottom: '4px' }}>{part}</li>
							))}
						</ul>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<h4 style={{ color: '#60a5fa', fontSize: '16px', marginBottom: '8px', borderBottom: '1px solid rgba(59, 130, 246, 0.3)', paddingBottom: '4px' }}>
							⚙️ کارەکان
						</h4>
						<ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1' }}>
							{info.functions.map((func: string, i: number) => (
								<li key={i} style={{ marginBottom: '4px' }}>{func}</li>
							))}
						</ul>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<h4 style={{ color: '#f59e0b', fontSize: '16px', marginBottom: '8px', borderBottom: '1px solid rgba(245, 158, 11, 0.3)', paddingBottom: '4px' }}>
							⚠️ برینە باوەکان
						</h4>
						<ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1' }}>
							{info.commonInjuries.map((injury: string, i: number) => (
								<li key={i} style={{ marginBottom: '4px' }}>{injury}</li>
							))}
						</ul>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<h4 style={{ color: '#10b981', fontSize: '16px', marginBottom: '8px', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', paddingBottom: '4px' }}>
							💊 چارەسەرەکان
						</h4>
						<ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1' }}>
							{info.treatments.map((treatment: string, i: number) => (
								<li key={i} style={{ marginBottom: '4px' }}>{treatment}</li>
							))}
						</ul>
					</div>

					{info.exercises && (
						<div>
							<h4 style={{ color: '#8b5cf6', fontSize: '16px', marginBottom: '8px', borderBottom: '1px solid rgba(139, 92, 246, 0.3)', paddingBottom: '4px' }}>
								🏋️ ڕاهێنانەکان
							</h4>
							<ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1' }}>
								{info.exercises.map((exercise: string, i: number) => (
									<li key={i} style={{ marginBottom: '4px' }}>{exercise}</li>
								))}
							</ul>
						</div>
					)}

					{/* Professional Footer */}
					<div style={{
						marginTop: '20px',
						paddingTop: '16px',
						borderTop: '1px solid rgba(255,255,255,0.1)',
						fontSize: '11px',
						color: '#94a3b8',
						textAlign: 'center'
					}}>
						<p style={{ margin: 0 }}>
							⚕️ زانیارییەکی پزیشکی پرۆفیشناڵ<br />
							پێویستە پسپۆڕی تەندروستی پێ ڕاوێژ بکرێت
						</p>
					</div>
					</>
					)}
				</div>
			)}

			{/* Label */}
			<div style={{
				position: 'absolute',
				bottom: '10px',
				right: '10px',
				background: 'rgba(0,0,0,0.85)',
				color: 'white',
				padding: '10px 16px',
				borderRadius: '8px',
				fontSize: '13px',
				fontFamily: 'system-ui, -apple-system, sans-serif',
				backdropFilter: 'blur(8px)',
				border: '1px solid rgba(255,255,255,0.1)'
			}}>
				{label}
			</div>
		</div>
	)
}

export default function Anatomy3DModel({ showMuscles, showBones, showNerves }: Anatomy3DModelProps) {
	// Use Sketchfab Data API to search for anatomy models
	if (showBones && !showMuscles && !showNerves) {
		return (
			<SketchfabSearch 
				searchQuery="human skeleton anatomy"
				label="🦴 مۆدێلی 3D پزیشکی - ئێسقانی تەواوی مرۆڤ"
			/>
		)
	}
	
	if (showMuscles && !showBones && !showNerves) {
		return (
			<SketchfabSearch 
				searchQuery="human muscles anatomy"
				label="💪 مۆدێلی 3D پزیشکی - ماسولکەکانی مرۆڤ"
			/>
		)
	}
	
	if (showNerves && !showMuscles && !showBones) {
		return (
			<SketchfabSearch 
				searchQuery="human nervous system brain"
				label="🧠 مۆدێلی 3D پزیشکی - سیستەمی دەماری"
			/>
		)
	}
	
	// Use custom Three.js model for muscles/nerves or combined views
	
	return (
		<div 
			id="three-canvas-container"
			style={{ 
			width: '100%', 
			height: '100%', 
			position: 'relative', 
			background: '#0f172a',
			touchAction: 'none',
			overflow: 'hidden',
		}}
		>
			{/* ڕێنمایی مۆبایل */}
			<div style={{
				position: 'absolute',
				top: '10px',
				left: '50%',
				transform: 'translateX(-50%)',
				background: 'rgba(0,0,0,0.7)',
				color: '#94a3b8',
				padding: '8px 16px',
				borderRadius: '20px',
				fontSize: '12px',
				zIndex: 10,
				display: 'flex',
				alignItems: 'center',
				gap: '12px',
				backdropFilter: 'blur(8px)',
				border: '1px solid rgba(255,255,255,0.1)',
				whiteSpace: 'nowrap',
			}}>
				<span>👆 سوڕاندن</span>
				<span>🤏 زووم</span>
			</div>
			
			<Canvas
				shadows
				camera={{ position: [0, 0, 4.5], fov: 50 }}
				gl={{ 
					antialias: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1.2,
				powerPreference: 'high-performance',
			}}
			style={{ 
				width: '100%', 
				height: '100%',
				touchAction: 'none',
				pointerEvents: 'auto',
				display: 'block',
			}}
			dpr={[1, 2]}
			onCreated={({ gl }) => {
				gl.domElement.style.touchAction = 'none';
				
			}}
		>
			<color attach="background" args={['#0f172a']} />
			
			<OrbitControls 
				makeDefault
				enablePan={true}
				enableZoom={true}
				enableRotate={true}
				minDistance={1.5}
				maxDistance={12}
				maxPolarAngle={Math.PI * 0.9}
				minPolarAngle={Math.PI * 0.1}
				enableDamping={true}
				dampingFactor={0.1}
				rotateSpeed={1.0}
				zoomSpeed={1.5}
				panSpeed={1.0}
				target={[0, 0.8, 0]}
				touches={{
					ONE: THREE.TOUCH.ROTATE,
					TWO: THREE.TOUCH.DOLLY_PAN
			}}
			mouseButtons={{
				LEFT: THREE.MOUSE.ROTATE,
				MIDDLE: THREE.MOUSE.DOLLY,
				RIGHT: THREE.MOUSE.PAN
			}}
		/>
		
		<HumanModel showMuscles={showMuscles} showBones={showBones} showNerves={showNerves} />
	</Canvas>

	{/* ????????? ???? ?? ?????? */}
	<div style={{
		position: 'absolute',
		bottom: '80px',
				right: '10px',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
				zIndex: 10,
			}}>
				<button
					onClick={() => {
						// زووم ئین بە event dispatch
						const canvas = document.querySelector('canvas');
						if (canvas) {
							canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true }));
						}
					}}
					style={{
						width: '44px',
						height: '44px',
						borderRadius: '50%',
						background: 'rgba(59, 130, 246, 0.9)',
						color: 'white',
						border: 'none',
						fontSize: '24px',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
						transition: 'transform 0.2s',
					}}
					onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
					onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
				>
					+
				</button>
				<button
					onClick={() => {
						const canvas = document.querySelector('canvas');
						if (canvas) {
							canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true }));
						}
					}}
					style={{
						width: '44px',
						height: '44px',
						borderRadius: '50%',
						background: 'rgba(59, 130, 246, 0.9)',
						color: 'white',
						border: 'none',
						fontSize: '24px',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
						transition: 'transform 0.2s',
					}}
					onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
					onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
				>
					−
				</button>
			</div>
		</div>
	)
}



