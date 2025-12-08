"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface AnatomyModelProps {
	showMuscles: boolean
	showBones: boolean
	showSkin: boolean
	rotation: number
}

function MuscleFiber({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: [number, number, number] }) {
	const meshRef = useRef<THREE.Mesh>(null)
	
	return (
		<mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
			<cylinderGeometry args={[0.5, 0.5, 2, 32]} />
			<meshStandardMaterial 
				color="#B85450"
				roughness={0.6}
				metalness={0.1}
				emissive="#4A1F1E"
				emissiveIntensity={0.1}
			/>
		</mesh>
	)
}

function MuscleGroup({ visible }: { visible: boolean }) {
	if (!visible) return null
	
	return (
		<group>
			{/* Pectoralis Major */}
			<mesh position={[-0.8, 1.2, 0.3]}>
				<boxGeometry args={[1.2, 1.5, 0.8]} />
				<meshStandardMaterial 
					color="#C4756B"
					roughness={0.7}
					metalness={0.05}
					normalScale={new THREE.Vector2(0.5, 0.5)}
				/>
			</mesh>
			<mesh position={[0.8, 1.2, 0.3]}>
				<boxGeometry args={[1.2, 1.5, 0.8]} />
				<meshStandardMaterial 
					color="#C4756B"
					roughness={0.7}
					metalness={0.05}
				/>
			</mesh>
			
			{/* Deltoids */}
			<mesh position={[-1.5, 1.8, 0]} rotation={[0, 0, -0.5]}>
				<sphereGeometry args={[0.7, 32, 32]} />
				<meshStandardMaterial 
					color="#B85450"
					roughness={0.6}
					metalness={0.1}
				/>
			</mesh>
			<mesh position={[1.5, 1.8, 0]} rotation={[0, 0, 0.5]}>
				<sphereGeometry args={[0.7, 32, 32]} />
				<meshStandardMaterial 
					color="#B85450"
					roughness={0.6}
					metalness={0.1}
				/>
			</mesh>
			
			{/* Rectus Abdominis - 6 pack */}
			{[...Array(3)].map((_, row) => (
				<group key={`abs-${row}`}>
					<mesh position={[-0.3, 0.6 - row * 0.6, 0.4]}>
						<boxGeometry args={[0.5, 0.5, 0.3]} />
						<meshStandardMaterial 
							color="#A8564D"
							roughness={0.65}
							metalness={0.08}
						/>
					</mesh>
					<mesh position={[0.3, 0.6 - row * 0.6, 0.4]}>
						<boxGeometry args={[0.5, 0.5, 0.3]} />
						<meshStandardMaterial 
							color="#A8564D"
							roughness={0.65}
							metalness={0.08}
						/>
					</mesh>
				</group>
			))}
			
			{/* Biceps */}
			<mesh position={[-1.5, 1, 0]} rotation={[0, 0, -0.3]}>
				<capsuleGeometry args={[0.3, 1.2, 16, 32]} />
				<meshStandardMaterial 
					color="#B85450"
					roughness={0.6}
					metalness={0.1}
				/>
			</mesh>
			<mesh position={[1.5, 1, 0]} rotation={[0, 0, 0.3]}>
				<capsuleGeometry args={[0.3, 1.2, 16, 32]} />
				<meshStandardMaterial 
					color="#B85450"
					roughness={0.6}
					metalness={0.1}
				/>
			</mesh>
			
			{/* Quadriceps */}
			<mesh position={[-0.5, -1.5, 0]}>
				<cylinderGeometry args={[0.4, 0.35, 2, 32]} />
				<meshStandardMaterial 
					color="#C4756B"
					roughness={0.65}
					metalness={0.08}
				/>
			</mesh>
			<mesh position={[0.5, -1.5, 0]}>
				<cylinderGeometry args={[0.4, 0.35, 2, 32]} />
				<meshStandardMaterial 
					color="#C4756B"
					roughness={0.65}
					metalness={0.08}
				/>
			</mesh>
		</group>
	)
}

function SkeletonGroup({ visible }: { visible: boolean }) {
	if (!visible) return null
	
	return (
		<group>
			{/* Skull */}
			<mesh position={[0, 2.5, 0]}>
				<sphereGeometry args={[0.6, 32, 32]} />
				<meshStandardMaterial 
					color="#F5EFE0"
					roughness={0.4}
					metalness={0.05}
				/>
			</mesh>
			
			{/* Spine */}
			<mesh position={[0, 0.5, -0.2]}>
				<cylinderGeometry args={[0.15, 0.15, 3.5, 16]} />
				<meshStandardMaterial 
					color="#E3D5C1"
					roughness={0.5}
					metalness={0.05}
				/>
			</mesh>
			
			{/* Ribs */}
			{[...Array(8)].map((_, i) => (
				<group key={`rib-${i}`}>
					<mesh position={[-0.3, 1.8 - i * 0.25, 0]} rotation={[Math.PI / 2, 0, 0.5]}>
						<torusGeometry args={[0.5, 0.05, 8, 16, Math.PI]} />
						<meshStandardMaterial color="#E3D5C1" roughness={0.5} />
					</mesh>
					<mesh position={[0.3, 1.8 - i * 0.25, 0]} rotation={[Math.PI / 2, 0, -0.5]}>
						<torusGeometry args={[0.5, 0.05, 8, 16, Math.PI]} />
						<meshStandardMaterial color="#E3D5C1" roughness={0.5} />
					</mesh>
				</group>
			))}
			
			{/* Pelvis */}
			<mesh position={[0, -0.8, 0]}>
				<boxGeometry args={[1.5, 0.6, 0.8]} />
				<meshStandardMaterial 
					color="#E3D5C1"
					roughness={0.5}
					metalness={0.05}
				/>
			</mesh>
			
			{/* Femurs */}
			<mesh position={[-0.5, -1.8, 0]}>
				<cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
				<meshStandardMaterial color="#E3D5C1" roughness={0.5} />
			</mesh>
			<mesh position={[0.5, -1.8, 0]}>
				<cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
				<meshStandardMaterial color="#E3D5C1" roughness={0.5} />
			</mesh>
		</group>
	)
}

function SkinLayer({ visible }: { visible: boolean }) {
	if (!visible) return null
	
	return (
		<group>
			{/* Head */}
			<mesh position={[0, 2.5, 0]}>
				<sphereGeometry args={[0.65, 32, 32]} />
				<meshStandardMaterial 
					color="#E8C4A8"
					roughness={0.8}
					metalness={0.02}
					transparent
					opacity={0.95}
				/>
			</mesh>
			
			{/* Torso */}
			<mesh position={[0, 0.8, 0]}>
				<capsuleGeometry args={[0.8, 2, 16, 32]} />
				<meshStandardMaterial 
					color="#E8C4A8"
					roughness={0.8}
					metalness={0.02}
					transparent
					opacity={0.95}
				/>
			</mesh>
			
			{/* Arms */}
			<mesh position={[-1.2, 1.2, 0]} rotation={[0, 0, -0.3]}>
				<capsuleGeometry args={[0.2, 1.5, 16, 32]} />
				<meshStandardMaterial 
					color="#E8C4A8"
					roughness={0.8}
					metalness={0.02}
					transparent
					opacity={0.95}
				/>
			</mesh>
			<mesh position={[1.2, 1.2, 0]} rotation={[0, 0, 0.3]}>
				<capsuleGeometry args={[0.2, 1.5, 16, 32]} />
				<meshStandardMaterial 
					color="#E8C4A8"
					roughness={0.8}
					metalness={0.02}
					transparent
					opacity={0.95}
				/>
			</mesh>
			
			{/* Legs */}
			<mesh position={[-0.5, -1.2, 0]}>
				<capsuleGeometry args={[0.25, 2, 16, 32]} />
				<meshStandardMaterial 
					color="#E8C4A8"
					roughness={0.8}
					metalness={0.02}
					transparent
					opacity={0.95}
				/>
			</mesh>
			<mesh position={[0.5, -1.2, 0]}>
				<capsuleGeometry args={[0.25, 2, 16, 32]} />
				<meshStandardMaterial 
					color="#E8C4A8"
					roughness={0.8}
					metalness={0.02}
					transparent
					opacity={0.95}
				/>
			</mesh>
		</group>
	)
}

function AnatomyModel({ showMuscles, showBones, showSkin, rotation }: AnatomyModelProps) {
	const groupRef = useRef<THREE.Group>(null)
	
	useFrame(() => {
		if (groupRef.current) {
			groupRef.current.rotation.y = (rotation * Math.PI) / 180
		}
	})
	
	return (
		<group ref={groupRef}>
			<SkinLayer visible={showSkin} />
			<MuscleGroup visible={showMuscles} />
			<SkeletonGroup visible={showBones} />
		</group>
	)
}

export default function Anatomy3DViewer({ 
	showMuscles = true, 
	showBones = false, 
	showSkin = false,
	rotation = 0,
	className = ""
}: { 
	showMuscles?: boolean
	showBones?: boolean
	showSkin?: boolean
	rotation?: number
	className?: string
}) {
	return (
		<div className={className} style={{ width: '100%', height: '100%' }}>
			<Canvas shadows>
				<PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
				<OrbitControls 
					enableZoom={true}
					enablePan={false}
					minDistance={5}
					maxDistance={12}
				/>
				
				{/* Lighting for realistic rendering */}
				<ambientLight intensity={0.4} />
				<directionalLight 
					position={[5, 5, 5]} 
					intensity={1}
					castShadow
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
				/>
				<directionalLight position={[-5, 3, -5]} intensity={0.5} />
				<spotLight 
					position={[0, 10, 0]} 
					intensity={0.8}
					angle={0.5}
					penumbra={0.5}
					castShadow
				/>
				
				<Environment preset="studio" />
				
				<AnatomyModel 
					showMuscles={showMuscles}
					showBones={showBones}
					showSkin={showSkin}
					rotation={rotation}
				/>
			</Canvas>
		</div>
	)
}
