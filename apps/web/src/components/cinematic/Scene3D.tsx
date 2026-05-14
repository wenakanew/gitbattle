import { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Global state for GSAP to animate
export const cameraState = {
  position: new THREE.Vector3(0, 100, 40),
  lookAt: new THREE.Vector3(0, 0, 0),
};

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    // Camera shake logic
    const time = state.clock.getElapsedTime();
    const shakeX = Math.sin(time * 15) * 0.05;
    const shakeY = Math.cos(time * 12) * 0.05;

    camera.position.copy(cameraState.position);
    // Add shake
    camera.position.x += shakeX;
    camera.position.y += shakeY;

    camera.lookAt(cameraState.lookAt);
    camera.updateProjectionMatrix();
  });
  return null;
}

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
      if (!positionAttr) return;
      const positions = positionAttr.array as Float32Array;
      
      for (let i = 0; i < positionAttr.count; i++) {
        const x = positionAttr.getX(i);
        const y = positionAttr.getY(i);
        // More complex noise for craters and trenches
        let z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2;
        z += Math.sin(x * 0.05) * 4;
        z += Math.random() * 0.5; // roughness
        positionAttr.setZ(i, z);
      }
      geometry.computeVertexNormals();
    }
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[400, 400, 150, 150]} />
      <meshStandardMaterial color="#0a0806" roughness={1} metalness={0.1} />
    </mesh>
  );
}

// Procedural Low-Poly Soldier Geometry Generator
function createSoldierGeometry() {
  const head = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  head.translate(0, 3.5, 0);
  
  const body = new THREE.BoxGeometry(1.2, 2, 0.8);
  body.translate(0, 2, 0);
  
  const leftLeg = new THREE.BoxGeometry(0.4, 1.5, 0.4);
  leftLeg.translate(-0.3, 0.5, 0);
  
  const rightLeg = new THREE.BoxGeometry(0.4, 1.5, 0.4);
  rightLeg.translate(0.3, 0.5, 0);

  const weapon = new THREE.BoxGeometry(0.2, 0.2, 2);
  weapon.translate(0.5, 2, 0.8);

  // Merge them into one geometry
  const merged = BufferGeometryUtils.mergeGeometries([head, body, leftLeg, rightLeg, weapon]);
  return merged;
}

function Armies() {
  const armyCount = 200;
  const greenArmyRef = useRef<THREE.InstancedMesh>(null);
  const redArmyRef = useRef<THREE.InstancedMesh>(null);
  
  const soldierGeometry = useMemo(() => createSoldierGeometry(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (greenArmyRef.current && redArmyRef.current) {
      for (let i = 0; i < armyCount; i++) {
        // Green Army (Left)
        const gx = -10 - Math.random() * 50;
        const gz = (Math.random() - 0.5) * 80;
        dummy.position.set(gx, 0, gz);
        dummy.lookAt(0, 0, gz); // Face center
        dummy.updateMatrix();
        greenArmyRef.current.setMatrixAt(i, dummy.matrix);

        // Red Army (Right)
        const rx = 10 + Math.random() * 50;
        const rz = (Math.random() - 0.5) * 80;
        dummy.position.set(rx, 0, rz);
        dummy.lookAt(0, 0, rz); // Face center
        dummy.updateMatrix();
        redArmyRef.current.setMatrixAt(i, dummy.matrix);
      }
      greenArmyRef.current.instanceMatrix.needsUpdate = true;
      redArmyRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (greenArmyRef.current && redArmyRef.current) {
      for (let i = 0; i < armyCount; i++) {
        // Minimal marching bobbing animation
        const bob = Math.abs(Math.sin(time * 5 + i)) * 0.2;
        
        greenArmyRef.current.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
        dummy.position.y = bob;
        dummy.updateMatrix();
        greenArmyRef.current.setMatrixAt(i, dummy.matrix);

        redArmyRef.current.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
        dummy.position.y = bob;
        dummy.updateMatrix();
        redArmyRef.current.setMatrixAt(i, dummy.matrix);
      }
      greenArmyRef.current.instanceMatrix.needsUpdate = true;
      redArmyRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={greenArmyRef} args={[soldierGeometry, undefined, armyCount]} castShadow>
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} roughness={0.7} />
      </instancedMesh>
      
      <instancedMesh ref={redArmyRef} args={[soldierGeometry, undefined, armyCount]} castShadow>
        <meshStandardMaterial color="#ff4455" emissive="#ff4455" emissiveIntensity={0.8} roughness={0.7} />
      </instancedMesh>
    </>
  );
}

function Atmosphere() {
  const particleCount = 300;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positionsArray = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 200;
      arr[i + 1] = Math.random() * 40;
      arr[i + 2] = (Math.random() - 0.5) * 200;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positionAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      if (!positionAttr) return;
      const positions = positionAttr.array as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        const currentY = positions[i + 1];
        if (currentY !== undefined) {
          positions[i + 1] = currentY > 40 ? 0 : currentY + 0.05;
        }
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Ash/Dust */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positionsArray} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.3} color="#ffaa00" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </points>

      {/* Lighting */}
      <ambientLight intensity={0.05} color="#222" />
      
      {/* Background Horizon glow */}
      <directionalLight position={[0, 10, -100]} intensity={2} color="#ff6600" />
      
      {/* Sweeping Searchlights */}
      <spotLight position={[-50, 40, 0]} angle={0.2} penumbra={1} intensity={1500} color="#00ff88" castShadow target-position={[0, 0, 0]} />
      <spotLight position={[50, 40, 0]} angle={0.2} penumbra={1} intensity={1500} color="#ff4455" castShadow target-position={[0, 0, 0]} />
    </>
  );
}

function LeaderboardMonument() {
  return (
    <group position={[0, 0, -100]}>
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[40, 16, 8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      {/* Name plates */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 12 - i * 2.5, 4.1]}>
          <planeGeometry args={[30, 1.8]} />
          <meshBasicMaterial color={i === 0 ? "#ffaa00" : "#222"} transparent opacity={0.8} />
        </mesh>
      ))}
      <pointLight position={[0, 10, 15]} intensity={500} color="#ffaa00" distance={50} />
    </group>
  );
}

export function Scene3D() {
  return (
    <>
      <color attach="background" args={["#000005"]} />
      <fogExp2 attach="fog" color="#1a0a00" density={0.015} />
      
      <CameraRig />
      <Atmosphere />
      <Terrain />
      <Armies />
      <LeaderboardMonument />

      {/* AAA Post Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}
