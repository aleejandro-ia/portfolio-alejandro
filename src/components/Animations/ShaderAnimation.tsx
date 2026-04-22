import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let resizeTimeout: NodeJS.Timeout | null = null;

    try {
      const vertexShader = `
        void main() {
          gl_Position = vec4( position, 1.0 );
        }
      `;

      const fragmentShader = `
        #define TWO_PI 6.2831853072
        #define PI 3.14159265359

        precision highp float;
        uniform vec2 resolution;
        uniform float time;

        void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
          float t = time*0.05;
          float lineWidth = 0.002;

          vec3 color = vec3(0.0);
          for(int j = 0; j < 3; j++){
            for(int i=0; i < 5; i++){
              float dist = abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
              color[j] += lineWidth*float(i*i) / (dist + 0.001);
            }
          }
          
          gl_FragColor = vec4(color[0],color[1],color[2],1.0);
        }
      `;

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const scene = new THREE.Scene();
      geometry = new THREE.PlaneGeometry(2, 2);

      const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
      };

      material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 1);

      container.appendChild(renderer.domElement);

      const onWindowResize = () => {
        if (!container || !renderer) return;

        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }

        resizeTimeout = setTimeout(() => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          renderer!.setSize(width, height);
          
          const pixelRatio = renderer!.getPixelRatio();
          // Lower resolution multiplier for mobile to save GPU
          const resMultiplier = isMobile ? 0.5 : 1.0;
          
          uniforms.resolution.value.x = width * pixelRatio * resMultiplier;
          uniforms.resolution.value.y = height * pixelRatio * resMultiplier;
        }, 150);
      };

      onWindowResize();
      window.addEventListener("resize", onWindowResize, false);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        uniforms.time.value += 0.05;
        if (renderer) renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener("resize", onWindowResize);
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        if (renderer) {
          if (container && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      };
    } catch (error) {
      console.error("Failed to initialize ShaderAnimation:", error);
      return () => {};
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  );
}
