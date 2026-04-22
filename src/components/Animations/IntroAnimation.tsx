import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { COLORS } from "../../constants";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load("/logo-portfolio.png", (tex) => {
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.colorSpace = THREE.SRGBColorSpace;
      // Mejor calidad para reescalado (mipmaps)
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;

      // Ajuste dinámico de proporción para que NO se estire
      const aspect = tex.image.width / tex.image.height;
      const baseHeight = isMobile ? 1.8 : 2.5; // Tamaño más elegante y menos "gigante"
      logoMesh.scale.set(baseHeight * aspect, baseHeight, 1);
      
      tex.needsUpdate = true;
    });

    // ... (rest of the setup)
    
    // 1. The Living Neural Core (Sphere with high-end organic shader)
    const sphereGeometry = new THREE.IcosahedronGeometry(1.2, isMobile ? 32 : 64);
    
    const sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        explodeProgress: { value: 0 },
        pulse: { value: 0 },
        color1: { value: new THREE.Color("#000000") },
        color2: { value: new THREE.Color(COLORS.accent) },
      },
      vertexShader: `
        uniform float time;
        uniform float explodeProgress;
        uniform float pulse;
        varying vec3 vNormal;
        varying float vDistortion;

        // Simplex 3D Noise for organic movement
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          vec4 j = p - 49.0 * floor(p * (1.0/49.0));
          vec4 x_ = floor(j * (1.0/7.0));
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * (1.0/7.0) + vec4(0.01);
          vec4 y = y_ * (1.0/7.0) + vec4(0.01);
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vNormal = normal;
          
          // Living matter breathing effect
          float noise = snoise(position * (1.5 + pulse * 0.5) + time * 0.4);
          vDistortion = noise;
          
          vec3 pos = position;
          // Apply organic distortion (swell and contract)
          pos += normal * noise * (0.3 + pulse * 0.2) * (1.0 - explodeProgress);
          
          // Exponential explosion stretch
          pos += normal * pow(explodeProgress, 2.5) * 20.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float explodeProgress;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying float vDistortion;

        void main() {
          // Fade out as it shreds
          float alpha = 1.0 - smoothstep(0.1, 0.8, explodeProgress);
          if (alpha <= 0.01) discard;
          
          // Internal glow based on distortion
          float intensity = smoothstep(-0.2, 0.5, vDistortion);
          vec3 finalColor = mix(color1, color2, intensity);
          
          // Bio-luminescent rim lighting
          float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
          finalColor += color2 * pow(rim, 4.0) * 2.0;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
    });
    
    const coreSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(coreSphere);

    // 2. Advanced Particle Swarm (The "Living Matter" explosion)
    const particleCount = isMobile ? 1500 : 3000;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 0.1;
      positions[idx+1] = (Math.random() - 0.5) * 0.1;
      positions[idx+2] = (Math.random() - 0.5) * 0.1;
      
      const speed = 0.02 + Math.random() * 0.15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      velocities[idx] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[idx+1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[idx+2] = Math.cos(phi) * speed;
      
      sizes[i] = Math.random() * 2.0 + 0.5;
      randoms[i] = Math.random();
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particlesMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(COLORS.accent) },
        opacity: { value: 0 },
        explodeProgress: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        uniform float explodeProgress;
        varying float vOpacity;
        void main() {
          vOpacity = 1.0 - explodeProgress;
          vec3 pos = position;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (30.0 / -mvPosition.z) * (1.0 + explodeProgress);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        varying float vOpacity;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float strength = 1.0 - (d * 2.0);
          gl_FragColor = vec4(color, opacity * vOpacity * strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 2.1 Connection Lines (Constellation Effect from particulas.txt)
    const lineCount = isMobile ? 500 : 1000;
    const linesGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 2 * 3);
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const linesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(COLORS.accent),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);

    // 3. Logo Reveal
    const logoGeometry = new THREE.PlaneGeometry(3.5, 3.5);
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
    logoMesh.position.z = -0.2;
    scene.add(logoMesh);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    const clock = new THREE.Clock();
    let animationId: number;
    let hasTriggeredComplete = false;

    // Timeline constants
    const TIME_EXPLODE = 2.0;
    const TIME_LOGO = 2.3;
    const TIME_ZOOM = 4.2;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Phase 1: Heartbeat and breathing
      sphereMaterial.uniforms.time.value = elapsedTime;
      // Rapid pulse before explosion
      const pulseVal = Math.sin(elapsedTime * (elapsedTime * 4)) * 0.5 + 0.5;
      sphereMaterial.uniforms.pulse.value = (elapsedTime / TIME_EXPLODE) * pulseVal;
      coreSphere.rotation.y += 0.005;

      // Phase 2: Particle physics (Swarm life)
      if (elapsedTime > TIME_EXPLODE) {
        const explodeT = Math.min((elapsedTime - TIME_EXPLODE) / 0.8, 1.0);
        sphereMaterial.uniforms.explodeProgress.value = explodeT;
        
        particlesMat.uniforms.opacity.value = Math.min(1.0, (1.0 - explodeT) * 3.0);
        particlesMat.uniforms.explodeProgress.value = explodeT;
        
        linesMat.opacity = Math.min(0.3, (1.0 - explodeT) * 1.5);
        
        const posAttr = particlesGeo.attributes.position;
        const posArray = posAttr.array as Float32Array;
        
        const linePosAttr = linesGeo.attributes.position;
        const linePosArray = linePosAttr.array as Float32Array;
        let lineIdx = 0;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const r = randoms[i];
          
          // Organic movement (turbulence)
          const swirl = Math.sin(elapsedTime * 2 + r * 10) * 0.02;
          
          posArray[idx] += velocities[idx] + swirl;
          posArray[idx+1] += velocities[idx+1] + swirl;
          posArray[idx+2] += velocities[idx+2];
          
          // Air friction (organic slowing down)
          velocities[idx] *= 0.95;
          velocities[idx+1] *= 0.95;
          velocities[idx+2] *= 0.95;
          
          // Slight attraction to center (reforming energy)
          if (elapsedTime > TIME_LOGO) {
            velocities[idx] += (0 - posArray[idx]) * 0.001;
            velocities[idx+1] += (0 - posArray[idx+1]) * 0.001;
          }

          // Connection logic (Constellation Effect)
          // We only check a subset of particles for performance
          if (i < lineCount && lineIdx < lineCount * 2 * 3) {
            const nextIdx = ((i + 1) % particleCount) * 3;
            const dist = Math.sqrt(
              Math.pow(posArray[idx] - posArray[nextIdx], 2) +
              Math.pow(posArray[idx+1] - posArray[nextIdx+1], 2)
            );

            if (dist < 1.5) {
              linePosArray[lineIdx++] = posArray[idx];
              linePosArray[lineIdx++] = posArray[idx+1];
              linePosArray[lineIdx++] = posArray[idx+2];
              linePosArray[lineIdx++] = posArray[nextIdx];
              linePosArray[lineIdx++] = posArray[nextIdx+1];
              linePosArray[lineIdx++] = posArray[nextIdx+2];
            }
          }
        }
        posAttr.needsUpdate = true;
        linePosAttr.needsUpdate = true;
      }

      // Phase 3: Logo Reveal
      if (elapsedTime > TIME_LOGO) {
        const revealT = Math.min((elapsedTime - TIME_LOGO) / 1.0, 1.0);
        logoMaterial.opacity = revealT;
        logoMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.1;
        logoMesh.scale.setScalar(0.95 + revealT * 0.05);
      }

      // Phase 4: Cinematic zoom
      if (elapsedTime > TIME_ZOOM) {
        const zoomT = Math.min((elapsedTime - TIME_ZOOM) / 1.0, 1.0);
        const easeZoom = Math.pow(zoomT, 6);
        camera.position.z = 5 - easeZoom * 8.0;
        
        if (zoomT > 0.5 && !hasTriggeredComplete) {
          hasTriggeredComplete = true;
          setIsFadingOut(true);
          setTimeout(onComplete, 800);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationId);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      logoGeometry.dispose();
      logoMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      logoTexture.dispose();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 z-[999] bg-black transition-opacity duration-700 pointer-events-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    />
  );
}
