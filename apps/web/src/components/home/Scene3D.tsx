import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function Scene3D() {
  const particlesRefLeft = useRef<THREE.InstancedMesh>(null);
  const particlesRefRight = useRef<THREE.InstancedMesh>(null);
  const gridRef = useRef<THREE.GridHelper>(null);

  const particleCount = 60;
  
  // Left (Green) Particles
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const leftPositions = useMemo(() => {
    return new Array(particleCount).fill(0).map(() => ({
      x: (Math.random() - 1) * 15 - 2, // Left side
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10,
      speedX: Math.random() * 0.05 + 0.01,
      speedY: (Math.random() - 0.5) * 0.02
    }));
  }, []);

  // Right (Red) Particles
  const rightPositions = useMemo(() => {
    return new Array(particleCount).fill(0).map(() => ({
      x: Math.random() * 15 + 2, // Right side
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10,
      speedX: -(Math.random() * 0.05 + 0.01),
      speedY: (Math.random() - 0.5) * 0.02
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle camera parallax based on mouse
    state.camera.position.x += (state.pointer.x * 2 - state.camera.position.x) * 0.05;
    state.camera.position.y += (state.pointer.y * 2 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);

    // Update Left Particles
    if (particlesRefLeft.current) {
      leftPositions.forEach((pos, i) => {
        pos.x += pos.speedX;
        pos.y += pos.speedY;
        
        if (pos.x > 0) pos.x = -15; // Reset at center line
        if (pos.y > 10) pos.y = -10;
        if (pos.y < -10) pos.y = 10;

        dummy.position.set(pos.x, pos.y, pos.z);
        
        // Gentle hover effect
        dummy.position.y += Math.sin(time + i) * 0.1;
        
        const scale = 0.5 + Math.abs(Math.sin(time + i)) * 0.5;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        particlesRefLeft.current!.setMatrixAt(i, dummy.matrix);
      });
      particlesRefLeft.current.instanceMatrix.needsUpdate = true;
    }

    // Update Right Particles
    if (particlesRefRight.current) {
      rightPositions.forEach((pos, i) => {
        pos.x += pos.speedX;
        pos.y += pos.speedY;
        
        if (pos.x < 0) pos.x = 15; // Reset at center line
        if (pos.y > 10) pos.y = -10;
        if (pos.y < -10) pos.y = 10;

        dummy.position.set(pos.x, pos.y, pos.z);
        dummy.position.y += Math.cos(time + i) * 0.1;
        
        const scale = 0.5 + Math.abs(Math.cos(time + i)) * 0.5;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        particlesRefRight.current!.setMatrixAt(i, dummy.matrix);
      });
      particlesRefRight.current.instanceMatrix.needsUpdate = true;
    }

    if (gridRef.current) {
      gridRef.current.position.y = -5; // Move grid down
      // Slowly move grid towards user
      gridRef.current.position.z = (time * 2) % 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      
      {/* 3D Wireframe Grid below the battlefield */}
      <gridHelper 
        ref={gridRef}
        args={[100, 50, "#333333", "#111111"]} 
        position={[0, -5, 0]}
      />

      {/* Central "Conflict" line using a glowing box */}
      <Box args={[0.05, 20, 0.05]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </Box>

      {/* Green Particles */}
      <instancedMesh ref={particlesRefLeft} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.8} />
      </instancedMesh>

      {/* Red Particles */}
      <instancedMesh ref={particlesRefRight} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ff4455" transparent opacity={0.8} />
      </instancedMesh>

      {/* Adding a few larger floating abstract nodes for visual interest */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-6, 2, -5]}>
        <Box args={[1, 1, 1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.3} />
        </Box>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[6, -2, -3]}>
        <Box args={[1, 1, 1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#ff4455" wireframe transparent opacity={0.3} />
        </Box>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={3} position={[-4, -3, -8]}>
        <Sphere args={[0.8, 8, 8]}>
          <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.2} />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3} position={[4, 3, -6]}>
        <Sphere args={[0.8, 8, 8]}>
          <meshBasicMaterial color="#ff4455" wireframe transparent opacity={0.2} />
        </Sphere>
      </Float>
    </>
  );
}
