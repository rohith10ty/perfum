import { Geometry } from "ogl";

/**
 * Draws an image with object-fit: cover behavior on a canvas, with top-biased framing and card borders
 */
export function drawImageCover(
  ctx,
  img,
  x,
  y,
  w,
  h,
  paddingRatio = 0.045,
  cornerRadius = 24
) {
  const padX = w * paddingRatio;
  const padY = h * paddingRatio;
  const targetX = x + padX;
  const targetY = y + padY;
  const targetW = w - padX * 2;
  const targetH = h - padY * 2;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = targetW / targetH;

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = img.naturalWidth;
  let sourceHeight = img.naturalHeight;

  if (imgRatio > canvasRatio) {
    sourceWidth = img.naturalHeight * canvasRatio;
    sourceX = (img.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = img.naturalWidth / canvasRatio;
    // Top bias (0.2) ensures perfume bottle caps, labels and heads are never cut off
    sourceY = (img.naturalHeight - sourceHeight) * 0.2;
  }

  ctx.save();
  ctx.translate(targetX, targetY + targetH);
  ctx.scale(1, -1);

  // Background fill for transparent images / card base
  if (cornerRadius > 0 && typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(0, 0, targetW, targetH, cornerRadius);
    ctx.clip();
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, targetW, targetH);

  ctx.drawImage(
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    targetW,
    targetH
  );

  // Sleek subtle glowing card outline
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 3;
  if (cornerRadius > 0 && typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(1.5, 1.5, targetW - 3, targetH - 3, cornerRadius);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Returns Tailwind classes for positioning text based on perspective position
 */
export function getPositionClasses(position) {
  switch (position) {
    case "bottom":
      return "bottom-20 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4";
    default:
      return "top-20 md:top-24 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4";
  }
}

/**
 * Creates cylinder geometry with positions, UVs, and indices
 */
export function createCylinderGeometry(gl, config) {
  const { radius, height, radialSegments, heightSegments } = config;

  const positions = [];
  const uvs = [];
  const indices = [];

  for (let y = 0; y <= heightSegments; y++) {
    const v = y / heightSegments;
    const yPos = (v - 0.5) * height;

    for (let x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments;
      const theta = u * Math.PI * 2;

      const xPos = Math.cos(theta) * radius;
      const zPos = Math.sin(theta) * radius;

      positions.push(xPos, yPos, zPos);
      uvs.push(1 - u, 1 - v);
    }
  }

  for (let y = 0; y < heightSegments; y++) {
    for (let x = 0; x < radialSegments; x++) {
      const a = y * (radialSegments + 1) + x;
      const b = a + radialSegments + 1;
      const c = a + 1;
      const d = b + 1;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  return new Geometry(gl, {
    position: { size: 3, data: new Float32Array(positions) },
    uv: { size: 2, data: new Float32Array(uvs) },
    index: { data: new Uint16Array(indices) },
  });
}

/**
 * Creates curved line geometry for a single particle
 */
export function createParticleGeometry(gl, config, index, height) {
  const { numParticles, particleRadius, segments, angleSpan } = config;

  const linePositions = [];
  const startAngle = (index / numParticles) * Math.PI * 2;

  const isTopHalf = index < numParticles / 2;
  const yPosition = isTopHalf
    ? height * 0.7 + Math.random() * height * 0.3
    : -height * 1.0 + Math.random() * height * 0.3;

  for (let j = 0; j <= segments; j++) {
    const t = j / segments;
    const angle = startAngle + angleSpan * t;
    const x = Math.cos(angle) * particleRadius;
    const z = Math.sin(angle) * particleRadius;

    linePositions.push(x, yPosition, z);
  }

  return {
    geometry: new Geometry(gl, {
      position: { size: 3, data: new Float32Array(linePositions) },
    }),
    userData: {
      baseAngle: startAngle,
      angleSpan: angleSpan,
      baseY: yPosition,
      speed: 0.5 + Math.random() * 1.0,
      radius: particleRadius,
    },
  };
}
