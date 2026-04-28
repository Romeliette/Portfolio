"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const latitudes = 50;
const longitudes = 500;
const count = latitudes * longitudes;

function WavySphere() {
  const ref = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Use THREE.Timer as requested
  const [timer] = useState(() => new THREE.Timer());

  // Initialize empty array, calculation happens dynamically in useFrame
  const [positions] = useMemo(() => {
    return [new Float32Array(count * 3)];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Update timer using performance.now() and get elapsed time
      timer.update(performance.now());
      const time = timer.getElapsed() * 0.3; // Speed of the internal animation
      
      const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;

      let i = 0;
      const baseRadius = 4.0;

      for (let lat = 0; lat < latitudes; lat++) {
        // Distribute from pole to pole (offset slightly to avoid overlap at exact poles)
        const phi = ((lat + 0.5) / latitudes) * Math.PI; 
        
        // Particles flow faster around the equator than the poles
        const flowSpeed = 0.3 + Math.sin(phi) * 0.5;
        
        for (let lon = 0; lon < longitudes; lon++) {
          const baseTheta = (lon / longitudes) * Math.PI * 2;
          
          // Animate particles flowing horizontally around the sphere
          const theta = baseTheta + time * flowSpeed;
          
          // Make waves much more subtle so it stays "more circle"
          const wave1 = Math.sin(theta * 5 + time * 3) * 0.08;
          const wave2 = Math.cos(phi * 6 - time * 2) * 0.08;
          
          const currentRadius = baseRadius + wave1 + wave2;
          
          // Spherical coordinates with Y-up poles
          const y = currentRadius * Math.cos(phi);
          const x = currentRadius * Math.sin(phi) * Math.cos(theta);
          const z = currentRadius * Math.sin(phi) * Math.sin(theta);

          positionsArray[i * 3] = x;
          positionsArray[i * 3 + 1] = y;
          positionsArray[i * 3 + 2] = z;
          i++;
        }
      }
      // Flag the geometry to be updated this frame
      ref.current.geometry.attributes.position.needsUpdate = true;
      
      // Slow, majestic global rotation
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.08;
    }

    if (groupRef.current) {
      // Smoothly rotate the entire group towards the mouse pointer
      // state.pointer holds normalized device coordinates (-1 to +1)
      const targetRotationX = Math.PI / 6 - state.pointer.y * 0.5;
      const targetRotationY = state.pointer.x * 0.5;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, 0, 0]} scale={0.70}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00E5FF" // Electric Cyan / Gaming Cool Blue
          size={0.035} // Thicker, more visible particles
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8} // Slightly lower opacity so it doesn't overpower the text
        />
      </Points>
    </group>
  );
}

export default function ParticleRing() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex justify-center items-center opacity-40">
      <div className="w-full h-full min-h-[80vh]">
        <Canvas camera={{ position: [0, 0, 11], fov: 50 }}>
          <WavySphere />
        </Canvas>
      </div>
    </div>
  );
}
