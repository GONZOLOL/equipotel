'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

useGLTF.preload('/models/safe.glb');

function useCenteredScene(gltf) {
    return useMemo(() => {
        const cloned = gltf.scene.clone(true);
        const box = new THREE.Box3().setFromObject(cloned);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.9 / maxDimension;

        cloned.position.sub(center);
        cloned.scale.setScalar(scale);

        cloned.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        return cloned;
    }, [gltf]);
}

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);

    return isMobile;
}

function SafeModel() {
    const body = useCenteredScene(useGLTF('/models/safe.glb'));
    const group = useRef(null);

    return <primitive ref={group} object={body} />;
}

export default function SafeCanvas() {
    const isMobile = useIsMobile();
    const { theme } = useTheme();
    const containerHeight = isMobile ? 'h-[35vh]' : 'h-[60vh]';
    const camera = isMobile
        ? { position: [0, 0.2, 5.2], fov: 32 }
        : { position: [0.25, 1.5, 3.8], fov: 42 };
    const backgroundColor = theme === 'dark' ? '#0c1b2a' : '#ffffff';
    const ambientIntensity = theme === 'dark' ? 0.45 : 0.4;
    const directionalIntensity = theme === 'dark' ? 1.2 : 0.95;

    return (
        <div className={`relative w-full ${containerHeight}`}>
            <Canvas shadows camera={camera}>
                <color attach="background" args={[backgroundColor]} />
                <ambientLight intensity={ambientIntensity} />
                <directionalLight
                    position={[4, 6, 4]}
                    intensity={directionalIntensity}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <Environment preset="city" />
                <SafeModel />
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    target={[0, 0.35, 0]}
                    maxPolarAngle={Math.PI / 2.2}
                    minPolarAngle={Math.PI / 3.3}
                />
            </Canvas>
        </div>
    );
}
