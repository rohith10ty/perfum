import { useEffect, useRef, useState } from "react";
import { Renderer, Camera, Transform, Texture, Program, Mesh } from "ogl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

import {
  images,
  perspectives,
  cylinderConfig,
  particleConfig,
  imageConfig,
} from "../../lib/photoWheel/data";
import {
  drawImageCover,
  createCylinderGeometry,
  createParticleGeometry,
} from "../../lib/photoWheel/utils";
import {
  cylinderVertex,
  cylinderFragment,
  particleVertex,
  particleFragment,
} from "../../lib/photoWheel/shaders";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  try {
    CustomEase.create("cinematicSilk", "0.45, 0.05, 0.55, 0.95");
    CustomEase.create("cinematicSmooth", "0.25, 0.1, 0.25, 1");
    CustomEase.create("cinematicFlow", "0.33, 0, 0.2, 1");
  } catch {
    // ignore if already registered
  }
}

const PhotoWheel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRefs = useRef([]);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const cylinderRef = useRef(null);
  const cameraAnimRef = useRef({ x: 0, y: 0, z: 6.8 });
  const particlesRef = useRef([]);
  const lastRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const renderer = new Renderer({
      canvas: canvasRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0.05, 0.05, 0.06, 1);
    gl.disable(gl.CULL_FACE);
    rendererRef.current = renderer;

    const getResponsiveDimensions = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      const maxRadius = isMobile ? 2.3 : isTablet ? 2.5 : 2.8;
      const cameraZ = isMobile ? 7.8 : isTablet ? 7.2 : 6.8;
      const fov = isMobile ? 46 : 42;

      return {
        cylinderScale: maxRadius / cylinderConfig.radius,
        cameraZ,
        fov,
        isMobile,
      };
    };

    const dimensions = getResponsiveDimensions();

    const camera = new Camera(gl, {
      fov: dimensions.fov,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 100,
    });
    camera.perspective({
      fov: dimensions.fov,
      aspect: window.innerWidth / window.innerHeight,
    });
    camera.position.set(0, 0, dimensions.cameraZ);
    cameraRef.current = camera;
    cameraAnimRef.current.z = dimensions.cameraZ;

    const scene = new Transform();
    sceneRef.current = scene;

    const geometry = createCylinderGeometry(gl, cylinderConfig);
    const hardwareLimit = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 8192;
    const isMobileDevice = window.innerWidth < 768;
    const safeLimit = isMobileDevice ? 4096 : Math.min(hardwareLimit, 16384);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", {
      willReadFrequently: false,
      alpha: false,
    });
    const numImages = images.length;
    const totalWidthOriginal = imageConfig.width * numImages;
    const heightOriginal = imageConfig.height;
    const scale = Math.min(1, safeLimit / totalWidthOriginal);

    canvas.width = Math.floor(totalWidthOriginal * scale);
    canvas.height = Math.floor(heightOriginal * scale);

    let loadedImages = 0;
    const imageElements = [];

    const circumference = 2 * Math.PI * cylinderConfig.radius;
    const textureAspectRatio = imageConfig.height / (imageConfig.width * images.length);
    const idealHeight = circumference * textureAspectRatio;
    const heightCorrection = idealHeight / cylinderConfig.height;

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current) {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        const newDimensions = getResponsiveDimensions();

        rendererRef.current.setSize(currentWidth, currentHeight);

        cameraRef.current.perspective({
          fov: newDimensions.fov,
          aspect: currentWidth / currentHeight,
        });

        if (cylinderRef.current) {
          cylinderRef.current.scale.set(
            newDimensions.cylinderScale,
            newDimensions.cylinderScale * heightCorrection,
            newDimensions.cylinderScale
          );
        }

        cameraAnimRef.current.z = newDimensions.cameraZ;
      }
    };

    window.addEventListener("resize", handleResize);

    let isMounted = true;
    let animId;
    let mainTl;

    images.forEach((imageSrc, index) => {
      const img = new Image();
      img.onload = () => {
        if (!isMounted) return;
        imageElements[index] = img;
        loadedImages++;

        const totalCanvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        if (loadedImages === numImages) {
          ctx.fillStyle = "#0c0b0c";
          ctx.fillRect(0, 0, totalCanvasWidth, canvasHeight);

          imageElements.forEach((loadedImg, i) => {
            const xStartExact = (i / numImages) * totalCanvasWidth;
            const xEndExact = ((i + 1) / numImages) * totalCanvasWidth;

            const xPos = Math.floor(xStartExact);
            const xEnd = Math.floor(xEndExact);
            const drawWidthActual = xEnd - xPos;

            drawImageCover(
              ctx,
              loadedImg,
              xPos,
              0,
              drawWidthActual,
              canvasHeight,
              0.045,
              Math.round(24 * scale)
            );
          });

          const texture = new Texture(gl, {
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
            generateMipmaps: false,
          });

          texture.image = canvas;
          texture.needsUpdate = true;

          const program = new Program(gl, {
            vertex: cylinderVertex,
            fragment: cylinderFragment,
            uniforms: {
              tMap: { value: texture },
              uDarkness: { value: 0.05 },
            },
            cullFace: null,
          });

          const cylinder = new Mesh(gl, { geometry, program });
          cylinder.setParent(scene);
          cylinder.rotation.y = 0.5;
          cylinder.scale.set(
            dimensions.cylinderScale,
            dimensions.cylinderScale * heightCorrection,
            dimensions.cylinderScale
          );
          cylinderRef.current = cylinder;

          handleResize();
          setIsLoading(false);

          // GSAP Master Timeline with PINNING: Section is pinned in center while scrolling
          mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=2600",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          // 1. Continuous smooth rotation of the 3D cylinder
          mainTl.to(
            cylinderRef.current.rotation,
            {
              y: "+=12.56", // 2 full revolutions
              duration: 8,
              ease: "none",
            },
            0
          );

          // 2. Centered camera framing (keeps y=0 for upright, straight perspective)
          mainTl.to(
            cameraAnimRef.current,
            {
              x: 0,
              y: 0,
              z: dimensions.cameraZ * 0.78,
              duration: 3,
              ease: "cinematicSilk",
            },
            0.5
          );

          mainTl.to(
            cameraAnimRef.current,
            {
              x: 0,
              y: 0,
              z: dimensions.cameraZ,
              duration: 3,
              ease: "cinematicSilk",
            },
            4.5
          );

          // 3. Perspective titles sequence
          perspectives.forEach((_, pIdx) => {
            const el = textRefs.current[pIdx];
            if (!el) return;

            const startTime = pIdx * 1.85;
            mainTl.fromTo(
              el,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
              startTime
            );

            mainTl.to(
              el,
              { opacity: 0, y: -15, duration: 0.4, ease: "power2.in" },
              startTime + 1.45
            );
          });

          // Particles Setup
          particlesRef.current = [];
          for (let i = 0; i < particleConfig.numParticles; i++) {
            const { geometry: lineGeometry, userData } = createParticleGeometry(
              gl,
              particleConfig,
              i,
              cylinderConfig.height
            );

            const lineProgram = new Program(gl, {
              vertex: particleVertex,
              fragment: particleFragment,
              uniforms: {
                uColor: { value: [1.0, 0.85, 0.7] },
                uOpacity: { value: 0.0 },
              },
              transparent: true,
              depthTest: true,
            });

            const particle = new Mesh(gl, {
              geometry: lineGeometry,
              program: lineProgram,
              mode: gl.LINE_STRIP,
            });

            particle.userData = userData;
            particle.setParent(scene);
            particlesRef.current.push(particle);
          }

          // Main WebGL Render Loop
          const animate = () => {
            if (!isMounted) return;
            animId = requestAnimationFrame(animate);

            camera.position.set(
              cameraAnimRef.current.x,
              cameraAnimRef.current.y,
              cameraAnimRef.current.z
            );
            camera.lookAt([0, 0, 0]);

            if (cylinderRef.current) {
              const currentRotation = cylinderRef.current.rotation.y;
              velocityRef.current = currentRotation - lastRotationRef.current;
              lastRotationRef.current = currentRotation;

              const inertiaFactor = 0.15;
              const decayFactor = 0.92;
              momentumRef.current =
                momentumRef.current * decayFactor +
                velocityRef.current * inertiaFactor;

              const speed = Math.abs(velocityRef.current) * 100;
              const isRotating = Math.abs(velocityRef.current) > 0.0001;

              particlesRef.current.forEach((particle) => {
                const userData = particle.userData;
                const targetOpacity = isRotating ? Math.min(speed * 3, 0.95) : 0;
                const currentOpacity = particle.program.uniforms.uOpacity.value;
                particle.program.uniforms.uOpacity.value =
                  currentOpacity + (targetOpacity - currentOpacity) * 0.15;

                if (isRotating) {
                  const rotationOffset = velocityRef.current * userData.speed * 1.5;
                  const newBaseAngle = userData.baseAngle + rotationOffset;
                  userData.baseAngle = newBaseAngle;

                  const segments = particleConfig.segments;
                  const positions = particle.geometry.attributes.position.data;

                  for (let j = 0; j <= segments; j++) {
                    const t = j / segments;
                    const angle = newBaseAngle + userData.angleSpan * t;
                    const radiusWithSpeed = userData.radius;

                    positions[j * 3] = Math.cos(angle) * radiusWithSpeed;
                    positions[j * 3 + 1] = userData.baseY;
                    positions[j * 3 + 2] = Math.sin(angle) * radiusWithSpeed;
                  }

                  particle.geometry.attributes.position.needsUpdate = true;
                }
              });
            }

            renderer.render({ scene, camera });
          };

          animate();
          ScrollTrigger.refresh();
        }
      };

      img.onerror = () => {
        console.error("Failed to load image for photo wheel:", imageSrc);
        if (!isMounted) return;
        loadedImages++;
        if (loadedImages === numImages) {
          setIsLoading(false);
        }
      };

      img.src = imageSrc;
    });

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (mainTl) mainTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 h-screen w-full bg-[#0c0b0c] text-white overflow-hidden flex items-center justify-center"
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full block"
      />

      {/* Top & Bottom Vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0c0b0c] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0c0b0c] to-transparent z-10" />

      {/* Brand Badge */}
      <div className="pointer-events-none absolute top-6 left-6 md:top-10 md:left-10 z-20 flex items-center gap-2.5">
        <div className="h-2 w-2 rounded-full bg-[#ff4d4d] animate-pulse" />
        <span className="font-heading text-xs uppercase tracking-[0.25em] text-white/60">
          Perfum · 3D Showcase
        </span>
      </div>

      {/* Perspective Overlays - Centered Top */}
      <div className="pointer-events-none absolute top-20 md:top-24 inset-x-0 mx-auto text-center px-4 max-w-3xl z-20">
        {perspectives.map((perspective, index) => (
          <div
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className="absolute inset-x-0 top-0 opacity-0"
          >
            {perspective.eyebrow && (
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d4d] mb-2 bg-[#ff4d4d]/10 px-3 py-1 rounded-full border border-[#ff4d4d]/30 backdrop-blur-sm">
                {perspective.eyebrow}
              </span>
            )}
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-md">
              {perspective.title}
            </h2>
            {perspective.description && (
              <p className="mt-2 text-sm sm:text-lg font-normal text-white/70 leading-relaxed drop-shadow">
                {perspective.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="pointer-events-none absolute bottom-8 right-8 z-20 flex items-center gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
          Scroll to Explore
        </span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="animate-bounce"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0c0b0c] text-white gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#ff4d4d]" />
          <p className="font-heading text-sm uppercase tracking-widest text-white/60">
            Sculpting 3D Fragrance Wheel...
          </p>
        </div>
      )}
    </section>
  );
};

export default PhotoWheel;
