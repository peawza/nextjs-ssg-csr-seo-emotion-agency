'use client';

import { useEffect, useRef } from 'react';
import type { BufferGeometry, Material, Object3D, Texture } from 'three';
import styles from './CinematicScene.module.css';

function createRandom(seed = 1988) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function CinematicScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let cancelled = false;
    let disposeScene = () => undefined;

    const setup = async () => {
      const THREE = await import('three');
      if (cancelled) return;

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const compact = window.matchMedia('(max-width: 700px)').matches;
      const random = createRandom(compact ? 844 : 1440);
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: false,
          antialias: !compact,
          powerPreference: 'high-performance',
        });
      } catch {
        host.dataset.webgl = 'unsupported';
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.15 : 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;

      const scene = new THREE.Scene();
      const skyColor = new THREE.Color('#aa98dc');
      scene.background = skyColor;
      scene.fog = new THREE.FogExp2(skyColor, 0.036);

      const camera = new THREE.PerspectiveCamera(compact ? 54 : 46, 1, 0.1, 60);
      camera.position.set(0, compact ? 2.1 : 1.85, compact ? 8.8 : 8.2);
      const cameraTarget = new THREE.Vector3(0, 0.05, -1.4);
      camera.lookAt(cameraTarget);

      scene.add(new THREE.HemisphereLight('#f4e9ff', '#4c185f', 3.2));
      const keyLight = new THREE.DirectionalLight('#ffd8ff', 4.2);
      keyLight.position.set(-3, 6, 5);
      scene.add(keyLight);
      const portalLight = new THREE.PointLight('#ff76f2', 28, 10, 1.8);
      portalLight.position.set(0, 1.1, -1.4);
      scene.add(portalLight);

      const textures: Texture[] = [];
      const makeGlowTexture = (inner: string, outer: string) => {
        const glowCanvas = document.createElement('canvas');
        glowCanvas.width = 256;
        glowCanvas.height = 256;
        const context = glowCanvas.getContext('2d');
        if (context) {
          const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
          gradient.addColorStop(0, inner);
          gradient.addColorStop(0.28, inner);
          gradient.addColorStop(1, outer);
          context.fillStyle = gradient;
          context.fillRect(0, 0, 256, 256);
        }
        const texture = new THREE.CanvasTexture(glowCanvas);
        textures.push(texture);
        return texture;
      };

      const cloudTexture = makeGlowTexture('rgba(255,235,255,.34)', 'rgba(255,220,255,0)');
      for (let index = 0; index < 10; index += 1) {
        const cloud = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: cloudTexture, transparent: true, depthWrite: false, opacity: 0.4 }),
        );
        cloud.position.set((random() - 0.5) * 18, 2.8 + random() * 4.5, -8 - random() * 6);
        cloud.scale.set(4 + random() * 6, 1.4 + random() * 2.5, 1);
        scene.add(cloud);
      }

      const groundMaterial = new THREE.MeshStandardMaterial({ color: '#3e1556', roughness: 1, metalness: 0 });
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(32, 11), groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, -0.92, -5.4);
      scene.add(ground);

      const waterMaterial = new THREE.ShaderMaterial({
        transparent: false,
        uniforms: {
          uTime: { value: 0 },
          uGlow: { value: new THREE.Color('#ffd8ff') },
          uWater: { value: new THREE.Color('#8f79c7') },
        },
        vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying float vWave;
          void main() {
            vUv = uv;
            vec3 p = position;
            float wave = sin(p.x * 1.9 + uTime * .55) * .025 + sin(p.y * 2.7 - uTime * .35) * .018;
            p.z += wave;
            vWave = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uGlow;
          uniform vec3 uWater;
          varying vec2 vUv;
          varying float vWave;
          void main() {
            float lines = sin((vUv.y + vWave) * 620.0 + sin(vUv.x * 16.0) * 2.0 + uTime * 1.2);
            float reflection = exp(-pow((vUv.x - .5) * 6.5, 2.0)) * smoothstep(.15, .72, vUv.y);
            vec3 color = uWater + lines * .025;
            color = mix(color, uGlow, reflection * .34);
            color += pow(max(0.0, lines), 18.0) * .12;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });
      const water = new THREE.Mesh(new THREE.PlaneGeometry(34, 18, 120, 120), waterMaterial);
      water.rotation.x = -Math.PI / 2;
      water.position.set(0, -1.04, 3.4);
      scene.add(water);

      const rockMaterial = new THREE.MeshStandardMaterial({ color: '#43294f', roughness: 1, flatShading: true });
      for (let index = 0; index < 34; index += 1) {
        const radius = 0.22 + random() * 0.48;
        const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 0), rockMaterial);
        const x = -12 + index * 0.72 + (random() - 0.5) * 0.45;
        rock.position.set(x, -0.77 + radius * 0.28, -2.2 - random() * 0.9);
        rock.scale.set(0.7 + random() * 0.9, 0.75 + random() * 1.45, 0.75 + random() * 0.7);
        rock.rotation.set(random() * 0.5, random() * Math.PI, random() * 0.2);
        scene.add(rock);
      }

      const grassGeometry = new THREE.ConeGeometry(0.018, 0.38, 3, 1);
      grassGeometry.translate(0, 0.19, 0);
      const grassMaterial = new THREE.MeshStandardMaterial({ color: '#65109a', roughness: 1 });
      const grassCount = compact ? 700 : 1800;
      const grass = new THREE.InstancedMesh(grassGeometry, grassMaterial, grassCount);
      const transform = new THREE.Object3D();
      const grassColor = new THREE.Color();
      for (let index = 0; index < grassCount; index += 1) {
        const foreground = index < grassCount * 0.62;
        const x = (random() - 0.5) * 22;
        const z = foreground ? 4.3 + random() * 2.4 : -2.05 + random() * 1.5;
        const height = foreground ? 0.45 + random() * 1.0 : 0.2 + random() * 0.48;
        transform.position.set(x, -1.03, z);
        transform.scale.set(0.65 + random(), height, 0.65 + random());
        transform.rotation.set((random() - 0.5) * 0.18, random() * Math.PI, (random() - 0.5) * 0.3);
        transform.updateMatrix();
        grass.setMatrixAt(index, transform.matrix);
        grassColor.setHSL(0.76 + random() * 0.035, 0.74, foreground ? 0.22 + random() * 0.08 : 0.3);
        grass.setColorAt(index, grassColor);
      }
      grass.instanceMatrix.needsUpdate = true;
      if (grass.instanceColor) grass.instanceColor.needsUpdate = true;
      scene.add(grass);

      const portal = new THREE.Group();
      portal.position.set(0, compact ? 0.72 : 0.78, -1.42);
      scene.add(portal);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.68, 5),
        new THREE.MeshPhysicalMaterial({
          color: '#fff7ff',
          emissive: '#ff68ed',
          emissiveIntensity: 1.45,
          roughness: 0.08,
          metalness: 0.12,
          transmission: 0.16,
          transparent: true,
          opacity: 0.72,
        }),
      );
      portal.add(core);
      core.position.y = -0.1;
      portal.scale.setScalar(0.86);

      const particleCount = compact ? 5200 : 10500;
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      const color = new THREE.Color();
      for (let index = 0; index < particleCount; index += 1) {
        const y = random() * 2 - 1;
        const angle = random() * Math.PI * 2;
        const radius = Math.sqrt(1 - y * y);
        const shell = 0.68 + (random() - 0.5) * 0.22;
        const offset = index * 3;
        particlePositions[offset] = Math.cos(angle) * radius * shell;
        particlePositions[offset + 1] = y * shell;
        particlePositions[offset + 2] = Math.sin(angle) * radius * shell;
        if (y > 0.18) color.set(random() > 0.45 ? '#9b16ff' : '#ef42ff');
        else color.set(random() > 0.35 ? '#fff7ff' : '#ff85e7');
        particleColors[offset] = color.r;
        particleColors[offset + 1] = color.g;
        particleColors[offset + 2] = color.b;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          size: compact ? 0.035 : 0.026,
          vertexColors: true,
          transparent: true,
          opacity: 0.94,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        }),
      );
      portal.add(particles);
      particles.position.y = -0.1;

      const crownCount = compact ? 1500 : 3200;
      const crownPositions = new Float32Array(crownCount * 3);
      for (let index = 0; index < crownCount; index += 1) {
        const phi = random() * 1.38;
        const theta = random() * Math.PI * 2;
        const radius = 0.72 + random() * 0.24;
        const offset = index * 3;
        crownPositions[offset] = Math.sin(phi) * Math.cos(theta) * radius;
        crownPositions[offset + 1] = Math.cos(phi) * radius * 0.82 + 0.16;
        crownPositions[offset + 2] = Math.sin(phi) * Math.sin(theta) * radius;
      }
      const crownGeometry = new THREE.BufferGeometry();
      crownGeometry.setAttribute('position', new THREE.BufferAttribute(crownPositions, 3));
      const crown = new THREE.Points(
        crownGeometry,
        new THREE.PointsMaterial({
          color: '#a313ff',
          size: compact ? 0.042 : 0.032,
          transparent: true,
          opacity: 0.96,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      crown.position.y = 0.3;
      crown.scale.set(1.16, 0.9, 1.16);
      portal.add(crown);

      const glowTexture = makeGlowTexture('rgba(255,235,255,.78)', 'rgba(226,83,255,0)');
      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: glowTexture, transparent: true, opacity: 0.42, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      glow.position.y = -0.08;
      glow.scale.set(1.75, 1.75, 1);
      portal.add(glow);

      const debrisCount = compact ? 90 : 220;
      const debrisPositions = new Float32Array(debrisCount * 3);
      for (let index = 0; index < debrisCount; index += 1) {
        const offset = index * 3;
        debrisPositions[offset] = (random() - 0.5) * 19;
        debrisPositions[offset + 1] = -0.1 + random() * 6;
        debrisPositions[offset + 2] = -5 + random() * 8;
      }
      const debrisGeometry = new THREE.BufferGeometry();
      debrisGeometry.setAttribute('position', new THREE.BufferAttribute(debrisPositions, 3));
      const debris = new THREE.Points(
        debrisGeometry,
        new THREE.PointsMaterial({ color: '#6a307d', size: 0.035, transparent: true, opacity: 0.72 }),
      );
      scene.add(debris);

      const satellite = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.15, 3),
        new THREE.MeshPhysicalMaterial({ color: '#fff7ff', emissive: '#9a32ff', emissiveIntensity: 3, roughness: 0.12 }),
      );
      satellite.position.set(compact ? 1.55 : 4.4, compact ? 1.45 : 1.1, -1.1);
      scene.add(satellite);

      let frame = 0;
      let running = false;
      let visible = true;
      let contextLost = false;
      let targetPointerX = 0;
      let targetPointerY = 0;
      let pointerX = 0;
      let pointerY = 0;

      const resize = () => {
        const width = Math.max(1, canvas.clientWidth);
        const height = Math.max(1, canvas.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const render = (time: number) => {
        running = false;
        if (cancelled || contextLost || document.hidden || !visible) return;
        const seconds = time * 0.001;
        pointerX += (targetPointerX - pointerX) * 0.035;
        pointerY += (targetPointerY - pointerY) * 0.035;

        portal.rotation.y = seconds * 0.09 + pointerX * 0.35;
        portal.rotation.x = Math.sin(seconds * 0.32) * 0.08 + pointerY * 0.12;
        portal.position.y = (compact ? 0.72 : 0.78) + Math.sin(seconds * 0.7) * 0.055;
        core.scale.setScalar(1 + Math.sin(seconds * 1.1) * 0.045);
        crown.rotation.z = -Math.PI * 0.1 + Math.sin(seconds * 0.3) * 0.12;
        debris.rotation.y = seconds * 0.012;
        satellite.position.y += Math.sin(seconds * 0.8) * 0.0008;
        waterMaterial.uniforms.uTime.value = seconds;

        camera.position.x = pointerX * (compact ? 0.18 : 0.42);
        camera.position.y = (compact ? 2.1 : 1.85) - pointerY * 0.2;
        camera.lookAt(cameraTarget);
        renderer.render(scene, camera);

        if (!motionQuery.matches) {
          running = true;
          frame = window.requestAnimationFrame(render);
        }
      };

      const start = () => {
        if (running || motionQuery.matches || contextLost || document.hidden || !visible) return;
        running = true;
        frame = window.requestAnimationFrame(render);
      };
      const stop = () => {
        running = false;
        window.cancelAnimationFrame(frame);
      };
      const onPointerMove = (event: PointerEvent) => {
        targetPointerX = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
        targetPointerY = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
      };
      const onVisibility = () => (document.hidden ? stop() : start());
      const onContextLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        stop();
        host.dataset.webgl = 'unsupported';
      };
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });
      const resizeObserver = new ResizeObserver(resize);

      visibilityObserver.observe(host);
      resizeObserver.observe(host);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      canvas.addEventListener('webglcontextlost', onContextLost);

      resize();
      host.dataset.webgl = 'ready';
      if (motionQuery.matches) render(0);
      else start();

      disposeScene = () => {
        stop();
        visibilityObserver.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('visibilitychange', onVisibility);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        scene.traverse((object: Object3D) => {
          const disposable = object as Object3D & { geometry?: BufferGeometry; material?: Material | Material[] };
          disposable.geometry?.dispose();
          if (Array.isArray(disposable.material)) disposable.material.forEach((material) => material.dispose());
          else disposable.material?.dispose();
        });
        textures.forEach((texture) => texture.dispose());
        renderer.dispose();
        if (!contextLost) renderer.forceContextLoss();
      };
    };

    void setup();
    return () => {
      cancelled = true;
      disposeScene();
    };
  }, []);

  return (
    <div ref={hostRef} className={styles.scene} aria-hidden="true" data-webgl="loading">
      <div className={styles.fallback} />
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
    </div>
  );
}
