'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface WingPosition {
  x: number;
  y: number;
  visible: boolean;
  wingIndex: number;
}

interface Hero3DCanvasProps {
  activeLayerIndex?: number;
  scrollProgress?: number;
  onSelectNode?: (nodeName: string) => void;
  className?: string;
  showLabels?: boolean;
  onActiveWingPositionChange?: (pos: WingPosition) => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  activeLayerIndex = 0,
  className = '',
  showLabels = true,
  onActiveWingPositionChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.1, y: 0 });
  const currentRotationRef = useRef({ x: 0.1, y: 0 });
  const activeLayerRef = useRef(activeLayerIndex);
  const onActiveWingPosRef = useRef(onActiveWingPositionChange);
  const lastNotifiedPos = useRef({ x: 0, y: 0, wingIndex: -1 });

  useEffect(() => {
    onActiveWingPosRef.current = onActiveWingPositionChange;
  }, [onActiveWingPositionChange]);

  useEffect(() => {
    activeLayerRef.current = activeLayerIndex;
    // Orient the 3D model so the active slab faces the camera
    // Slab i is placed radially at (i / 7) * 2π - π/2
    // Setting root rotation to -angle brings slab i straight to the front (+Z)
    const slabAngle = (activeLayerIndex / 7) * Math.PI * 2 - Math.PI / 2;
    targetRotationRef.current.y = -slabAngle;
    targetRotationRef.current.x = 0.12;
  }, [activeLayerIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Perspective camera positioned with closer distance on mobile/tablet so the 3D model is prominent
    const initialDistance = width < 640 ? 6.2 : (width < 1024 ? 6.8 : 7.6);
    const initialY = width < 640 ? 0.9 : (width < 1024 ? 1.0 : 1.15);
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000);
    camera.position.set(0, initialY, initialDistance);
    camera.lookAt(0, 0.15, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Master Group for rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting setup for high-end warm architectural look
    const ambientLight = new THREE.AmbientLight(0xfff5eb, 1.8);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainKeyLight.position.set(5, 8, 6);
    mainKeyLight.castShadow = true;
    scene.add(mainKeyLight);

    const warmFillLight = new THREE.DirectionalLight(0xf59e0b, 1.4);
    warmFillLight.position.set(-5, -2, -4);
    scene.add(warmFillLight);

    const centerGlowLight = new THREE.PointLight(0xffb74d, 3.5, 12);
    centerGlowLight.position.set(0, 0.4, 0);
    rootGroup.add(centerGlowLight);

    // 1. Central Core: Authentic 3D Lyzr Logo Emblem (Crisp, highly visible & unobstructed)
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, 0.25, 0);

    // Deep Obsidian Titanium Metallic Material (polished reflective enterprise finish)
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0d,
      metalness: 0.96,
      roughness: 0.12,
      emissive: 0x050505,
      emissiveIntensity: 0.15,
    });

    // Electric Lime Luminous Core Material (#E5FE54)
    const limeAccentMat = new THREE.MeshStandardMaterial({
      color: 0xE5FE54,
      metalness: 0.8,
      roughness: 0.15,
      emissive: 0xd4fc24,
      emissiveIntensity: 1.1,
    });

    // Pure Neon Lime Basic Material for intense glow points
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: 0xE5FE54,
    });

    // Authentic Lyzr Ribbon Geometry scaled for maximum clarity and prominence
    // Ribbon 1: Continuous diagonal from top-right antenna down-left to left apex, then down-right
    const ribbon1Points = [
      new THREE.Vector3(0.72, 1.45, 0.10),
      new THREE.Vector3(0.40, 1.05, 0.16),
      new THREE.Vector3(0.0, 0.65, 0.20),   // Front pass (+Z over ribbon 2)
      new THREE.Vector3(-0.46, 0.25, 0.14),
      new THREE.Vector3(-0.95, -0.22, 0.08), // Left apex
      new THREE.Vector3(-0.52, -0.72, 0.0),
      new THREE.Vector3(0.08, -1.20, -0.06),
    ];
    const curve1 = new THREE.CatmullRomCurve3(ribbon1Points);
    const ribbon1Geo = new THREE.TubeGeometry(curve1, 100, 0.105, 24, false);
    const ribbon1Mesh = new THREE.Mesh(ribbon1Geo, obsidianMat);
    ribbon1Mesh.castShadow = true;
    logoGroup.add(ribbon1Mesh);

    // Inner glowing core tracer for Ribbon 1
    const tracer1Geo = new THREE.TubeGeometry(curve1, 100, 0.03, 16, false);
    const tracer1Mesh = new THREE.Mesh(tracer1Geo, limeAccentMat);
    logoGroup.add(tracer1Mesh);

    // End caps for Ribbon 1
    const capGeo = new THREE.SphereGeometry(0.104, 20, 20);
    const cap1A = new THREE.Mesh(capGeo, obsidianMat);
    cap1A.position.copy(ribbon1Points[0]);
    logoGroup.add(cap1A);
    const cap1B = new THREE.Mesh(capGeo, obsidianMat);
    cap1B.position.copy(ribbon1Points[ribbon1Points.length - 1]);
    logoGroup.add(cap1B);

    // Ribbon 2: Top-left antenna down through crossing (weaving BEHIND at -Z) to right apex, then down-left
    const ribbon2Points = [
      new THREE.Vector3(-0.72, 1.45, -0.10),
      new THREE.Vector3(-0.40, 1.05, -0.16),
      new THREE.Vector3(0.0, 0.65, -0.20),  // Back pass (-Z weave)
      new THREE.Vector3(0.46, 0.25, -0.14),
      new THREE.Vector3(0.95, -0.22, -0.08), // Right apex
      new THREE.Vector3(0.68, -0.58, 0.0),
      new THREE.Vector3(0.38, -0.88, 0.08),
    ];
    const curve2 = new THREE.CatmullRomCurve3(ribbon2Points);
    const ribbon2Geo = new THREE.TubeGeometry(curve2, 100, 0.105, 24, false);
    const ribbon2Mesh = new THREE.Mesh(ribbon2Geo, obsidianMat);
    ribbon2Mesh.castShadow = true;
    logoGroup.add(ribbon2Mesh);

    // Inner glowing core tracer for Ribbon 2
    const tracer2Geo = new THREE.TubeGeometry(curve2, 100, 0.03, 16, false);
    const tracer2Mesh = new THREE.Mesh(tracer2Geo, limeAccentMat);
    logoGroup.add(tracer2Mesh);

    // End caps for Ribbon 2
    const cap2A = new THREE.Mesh(capGeo, obsidianMat);
    cap2A.position.copy(ribbon2Points[0]);
    logoGroup.add(cap2A);
    const cap2B = new THREE.Mesh(capGeo, obsidianMat);
    cap2B.position.copy(ribbon2Points[ribbon2Points.length - 1]);
    logoGroup.add(cap2B);

    // Signature Bottom Accent Node (from the official Lyzr mark)
    const accentNodeGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const accentNode = new THREE.Mesh(accentNodeGeo, limeAccentMat);
    accentNode.position.set(-0.35, -1.36, 0.0);
    accentNode.castShadow = true;
    logoGroup.add(accentNode);

    // Glowing core telemetry beacon inside the accent node
    const beaconGlow = new THREE.PointLight(0xE5FE54, 2.2, 4);
    beaconGlow.position.set(-0.35, -1.36, 0.1);
    logoGroup.add(beaconGlow);

    // Animated packet tracers along the logo
    const packetGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const packetMesh1 = new THREE.Mesh(packetGeo, coreGlowMat);
    const packetMesh2 = new THREE.Mesh(packetGeo, coreGlowMat);
    logoGroup.add(packetMesh1);
    logoGroup.add(packetMesh2);

    // Scale the Lyzr Logo prominently and center it with dedicated lighting
    logoGroup.scale.set(1.15, 1.15, 1.15);
    rootGroup.add(logoGroup);

    // Dedicated Front Studio Key Light for the Lyzr Logo (Ensures 100% clarity and zero murky shadows)
    const logoFrontLight = new THREE.DirectionalLight(0xffffff, 2.4);
    logoFrontLight.position.set(0, 2, 6);
    scene.add(logoFrontLight);

    // 2. Clean Minimalist Orbital Halo Rings (Replacing the murky thick sphere)
    // Delicate gyroscopic rings that frame the logo without obscuring it
    const haloGroup = new THREE.Group();
    haloGroup.position.set(0, 0.25, 0);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.2,
    });

    const limeRingMat = new THREE.MeshBasicMaterial({
      color: 0xE5FE54,
      transparent: true,
      opacity: 0.85,
    });

    const haloRing1Geo = new THREE.TorusGeometry(1.52, 0.016, 16, 120);
    const haloRing1 = new THREE.Mesh(haloRing1Geo, ringMat);
    haloRing1.rotation.x = Math.PI / 2.3;
    haloGroup.add(haloRing1);

    const haloRing2Geo = new THREE.TorusGeometry(1.48, 0.008, 12, 100);
    const haloRing2 = new THREE.Mesh(haloRing2Geo, limeRingMat);
    haloRing2.rotation.x = -Math.PI / 2.5;
    haloRing2.rotation.y = Math.PI / 5;
    haloGroup.add(haloRing2);

    rootGroup.add(haloGroup);

    // 3. Exactly 7 Clean Architectural Slabs Arranged Radially Around the Lyzr Core
    // Representing the 7-Layer Control Plane architecture with pristine alabaster ceramic
    const slabGroup = new THREE.Group();
    rootGroup.add(slabGroup);

    // Pristine Alabaster Architectural Ceramic Material
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xf6f5f2,
      roughness: 0.24,
      metalness: 0.04,
    });

    // Frosted Crystal Glass for alternating slabs
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      transparent: true,
      roughness: 0.1,
      ior: 1.48,
      thickness: 0.35,
    });

    // Helper to create curved architectural monolith slab segment
    const createCurvedSlab = (
      radius: number,
      arcAngle: number,
      height: number,
      thickness: number,
      material: THREE.Material
    ) => {
      const shape = new THREE.Shape();
      const innerR = radius;
      const outerR = radius + thickness;
      const halfArc = arcAngle / 2;

      // Outer arc
      shape.absarc(0, 0, outerR, -halfArc, halfArc, false);
      // Inner arc
      shape.absarc(0, 0, innerR, halfArc, -halfArc, true);

      const extrudeSettings = {
        depth: height,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.035,
        bevelThickness: 0.035,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    // Configuration for the 7 Slabs around the Lyzr Logo
    const TOTAL_SLABS = 7;
    const slabMeshes: THREE.Mesh[] = [];
    const slabPivots: THREE.Group[] = [];
    const slabIndicators: THREE.Mesh[] = [];

    // Radial distance from center (generous clearance so central Lyzr logo is fully unobstructed)
    const slabRadius = 2.15;
    const slabArc = Math.PI * 0.22; // ~40 degrees arc per slab
    const slabThickness = 0.22;

    for (let i = 0; i < TOTAL_SLABS; i++) {
      const angle = (i / TOTAL_SLABS) * Math.PI * 2 - Math.PI / 2;
      
      // Rhythmic height variation for architectural dynamism
      const heights = [1.55, 1.35, 1.65, 1.4, 1.6, 1.35, 1.5];
      const slabHeight = heights[i];

      // Alternate materials: majority ceramic with select crystal glass slabs
      const mat = (i === 1 || i === 4) ? crystalMat : ceramicMat;
      const slabMesh = createCurvedSlab(slabRadius, slabArc, slabHeight, slabThickness, mat);

      // Pivot group at radial angle
      const pivot = new THREE.Group();
      pivot.rotation.y = angle;

      // Position slab radially outwards along the angle
      // Slabs are elevated comfortably to wrap like an architectural crown around the core
      const elevation = (i % 2 === 0 ? 0.35 : 0.2) + (i === 3 ? 0.1 : 0);
      slabMesh.position.set(0, elevation, slabRadius + slabThickness / 2);
      
      // Subtle inward slant for a protective, sculpted amphitheater silhouette
      slabMesh.rotation.x = -0.06;

      // Add a clean illuminated neon lime indicator beacon on top of each of the 7 slabs
      const indicatorGeo = new THREE.BoxGeometry(0.18, 0.04, 0.08);
      const indicatorMat = new THREE.MeshStandardMaterial({
        color: 0xE5FE54,
        emissive: 0xd4fc24,
        emissiveIntensity: 0.9,
      });
      const indicator = new THREE.Mesh(indicatorGeo, indicatorMat);
      indicator.position.set(0, slabHeight / 2 + 0.03, 0);
      slabMesh.add(indicator);
      slabIndicators.push(indicator);

      pivot.add(slabMesh);
      slabGroup.add(pivot);

      slabMeshes.push(slabMesh);
      slabPivots.push(pivot);
    }

    // 4. Clean Minimalist Radial Data Traces (Floor lines to each of the 7 slabs)
    const traceGroup = new THREE.Group();
    traceGroup.position.set(0, -1.3, 0);
    rootGroup.add(traceGroup);

    const traceLineMat = new THREE.LineBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0.35,
    });

    const activeTraceMat = new THREE.LineBasicMaterial({
      color: 0xE5FE54,
      transparent: true,
      opacity: 0.95,
      linewidth: 2,
    });

    const traceLines: THREE.Line[] = [];

    for (let i = 0; i < TOTAL_SLABS; i++) {
      const angle = (i / TOTAL_SLABS) * Math.PI * 2 - Math.PI / 2;
      const x = Math.sin(angle) * (slabRadius + 0.1);
      const z = Math.cos(angle) * (slabRadius + 0.1);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.05, 0),
        new THREE.Vector3(x, 0.05, z),
      ]);
      const traceLine = new THREE.Line(lineGeo, i === activeLayerIndex ? activeTraceMat : traceLineMat);
      traceGroup.add(traceLine);
      traceLines.push(traceLine);
    }

    // 5. Architectural Base Pedestal / Dais
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.5, 0);
    scene.add(pedestalGroup);

    // Large base ground disk
    const baseDiskGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.12, 64);
    const baseDiskMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeec,
      roughness: 0.35,
      metalness: 0.05,
    });
    const baseDisk = new THREE.Mesh(baseDiskGeo, baseDiskMat);
    baseDisk.receiveShadow = true;
    pedestalGroup.add(baseDisk);

    // Inner concentric tiered rings
    const ring1Geo = new THREE.CylinderGeometry(2.7, 2.75, 0.08, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f2,
      roughness: 0.25,
      metalness: 0.1,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.y = 0.08;
    pedestalGroup.add(ring1);

    const ring2Geo = new THREE.CylinderGeometry(2.0, 2.05, 0.08, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ring1Mat);
    ring2.position.y = 0.14;
    pedestalGroup.add(ring2);

    // Warm glowing embedded LED rim lights on the dais
    const ledCount = 18;
    const ledGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xffd285 });

    for (let i = 0; i < ledCount; i++) {
      const angle = (i / ledCount) * Math.PI * 2;
      const x = Math.cos(angle) * 2.5;
      const z = Math.sin(angle) * 2.5;
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(x, 0.14, z);
      pedestalGroup.add(led);
    }

    // Interactive pointer handling
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingRef.current) {
        const deltaX = clientX - prevPointerRef.current.x;
        const deltaY = clientY - prevPointerRef.current.y;

        targetRotationRef.current.y += deltaX * 0.007;
        targetRotationRef.current.x += deltaY * 0.004;

        // Limit vertical rotation to avoid flipping upside down
        targetRotationRef.current.x = Math.max(
          -0.4,
          Math.min(0.5, targetRotationRef.current.x)
        );

        prevPointerRef.current = { x: clientX, y: clientY };
      } else {
        // Subtle parallax when merely moving mouse
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((clientY - rect.top) / rect.height - 0.5) * 2;

        targetRotationRef.current.y = 0.4 + normX * 0.35;
        targetRotationRef.current.x = 0.1 - normY * 0.2;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    // Resize observer with adaptive camera framing
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      if (width < 640) {
        camera.position.set(0, 0.9, 6.2);
        camera.lookAt(0, 0.15, 0);
      } else if (width < 1024) {
        camera.position.set(0, 1.0, 6.8);
        camera.lookAt(0, 0.15, 0);
      } else {
        camera.position.set(0, 1.15, 7.6);
        camera.lookAt(0, 0.2, 0);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Intersection observer: only render WebGL when visible
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const prev = isVisible;
        isVisible = entry.isIntersecting;
        if (!prev && isVisible) {
          clock.start();
          animate();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping rotation towards active layer orientation
      currentRotationRef.current.x +=
        (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y +=
        (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      rootGroup.rotation.x = currentRotationRef.current.x;
      // Gentle presentation organic sway
      rootGroup.rotation.y = currentRotationRef.current.y + Math.sin(elapsedTime * 0.5) * 0.015;

      // Logo presentation: Gentle floating breathing motion with subtle angular sway so it remains clearly identifiable
      logoGroup.rotation.y = Math.sin(elapsedTime * 0.45) * 0.28;
      logoGroup.position.y = 0.25 + Math.sin(elapsedTime * 1.4) * 0.04;

      // Subtle gyroscopic motion for the orbital halo rings
      haloRing1.rotation.z = elapsedTime * 0.18;
      haloRing2.rotation.z = -elapsedTime * 0.24;

      // Animate live packet light beads along the 3D Lyzr curves
      const t1 = (elapsedTime * 0.35) % 1;
      const t2 = (elapsedTime * 0.35 + 0.5) % 1;
      packetMesh1.position.copy(curve1.getPointAt(t1));
      packetMesh2.position.copy(curve2.getPointAt(t2));

      // 7 Slabs: Gentle harmonic architectural floating micro-motions with active layer reactivity
      slabMeshes.forEach((mesh, i) => {
        const isActive = i === (activeLayerRef.current ?? 0);
        const baseElevation = (i % 2 === 0 ? 0.35 : 0.2) + (isActive ? 0.24 : 0);
        mesh.position.y = baseElevation + Math.sin(elapsedTime * 1.15 + i * 0.9) * 0.035;

        // Reactive glow for active layer beacon indicator
        if (slabIndicators[i]) {
          const mat = slabIndicators[i].material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = isActive ? 1.8 : 0.4;
        }
      });

      // Highlight active floor laser trace line
      traceLines.forEach((line, i) => {
        const isActive = i === (activeLayerRef.current ?? 0);
        line.material = isActive ? activeTraceMat : traceLineMat;
      });

      // Pulse center light and beacon softly
      centerGlowLight.intensity = 3.0 + Math.sin(elapsedTime * 2.8) * 0.5;
      beaconGlow.intensity = 2.0 + Math.sin(elapsedTime * 3.2) * 0.6;

      renderer.render(scene, camera);

      // Project active wing 3D beacon position to 2D screen coordinates for real-time graph line
      if (onActiveWingPosRef.current && slabIndicators.length > 0) {
        const currentIdx = activeLayerRef.current ?? 0;
        const activeBeacon = slabIndicators[currentIdx] || slabMeshes[currentIdx];
        if (activeBeacon) {
          const worldPos = new THREE.Vector3();
          activeBeacon.getWorldPosition(worldPos);

          const proj = worldPos.clone().project(camera);
          const px = (proj.x * 0.5 + 0.5) * width;
          const py = (-(proj.y * 0.5) + 0.5) * height;
          const isVisible = proj.z > -1 && proj.z < 1;

          const dx = Math.abs(px - lastNotifiedPos.current.x);
          const dy = Math.abs(py - lastNotifiedPos.current.y);

          if (lastNotifiedPos.current.wingIndex !== currentIdx || dx > 1 || dy > 1) {
            lastNotifiedPos.current = { x: px, y: py, wingIndex: currentIdx };
            onActiveWingPosRef.current({
              x: px,
              y: py,
              visible: isVisible,
              wingIndex: currentIdx,
            });
          }
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      id="lyzr-3d-model-stage"
      className={`relative w-full h-[320px] sm:h-[380px] md:h-[440px] lg:h-[600px] xl:h-[640px] flex items-center justify-center select-none ${className}`}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D Lyzr Model — Rotates with scroll, or click and drag"
      />
    </div>
  );
};
