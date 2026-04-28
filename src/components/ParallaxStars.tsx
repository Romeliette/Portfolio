"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

function StarField() {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const count = 5000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 50 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const [timer] = useState(() => new THREE.Timer());

  useFrame((state, delta) => {
    timer.update(performance.now());
    if (groupRef.current) {
      groupRef.current.rotation.x -= delta * 0.02;
      groupRef.current.rotation.y -= delta * 0.03;
      groupRef.current.position.y = window.scrollY * 0.005;
      groupRef.current.rotation.z = window.scrollY * 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.12}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export default function ParallaxStars() {
  const { scrollY } = useScroll();
  const [pageHeight, setPageHeight] = useState(2000);
  const { theme } = useTheme();

  useEffect(() => {
    const updateHeight = () => {
      setPageHeight(document.body.scrollHeight - window.innerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Dark mode: deep space black → dusk blue
  const darkBg = useTransform(scrollY, [0, pageHeight || 2000], ["#020617", "#1e3a8a"]);
  // Light mode: soft white → pale lavender blue
  const lightBg = useTransform(scrollY, [0, pageHeight || 2000], ["#f8faff", "#dbeafe"]);

  const backgroundColor = theme === "dark" ? darkBg : lightBg;

  return (
    <motion.div
      className="fixed inset-0 z-[-1] overflow-hidden transition-colors duration-700"
      style={{ backgroundColor }}
    >
      {/* Stars only visible in dark mode */}
      {theme === "dark" && (
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField />
        </Canvas>
      )}

      {/* Light mode: soft radial gradient orbs */}
      {theme === "light" && (
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-200/40 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-200/30 blur-[100px]" />
          <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-sky-100/50 blur-[80px]" />
        </div>
      )}
    </motion.div>
  );
}
