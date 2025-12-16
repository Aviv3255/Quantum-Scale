/**
 * Create professional YouTube-style thumbnails for lessons
 * Uses node-canvas to generate high-quality gradient images
 */

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Lesson configurations with colors and icons
const lessons = [
  {
    id: 'familiar-surprise-secret',
    title: 'The Familiar\nSurprise Secret',
    gradient: ['#1a1a2e', '#16213e', '#0f3460'],
    accentColor: '#fbbf24',
    icon: 'key'
  },
  {
    id: 'red-button-effect',
    title: 'The Red Button\nEffect',
    gradient: ['#1a0000', '#4a0000', '#8b0000'],
    accentColor: '#ff4444',
    icon: 'button'
  },
  {
    id: 'fred-method',
    title: 'The F.R.E.D.\nMethod',
    gradient: ['#0f172a', '#1e293b', '#334155'],
    accentColor: '#3b82f6',
    icon: 'gear'
  },
  {
    id: 'emotion-decides',
    title: 'Emotion Decides\nLogic Justifies',
    gradient: ['#2d1b4e', '#4c1d95', '#7c3aed'],
    accentColor: '#f472b6',
    icon: 'heart'
  },
  {
    id: 'gatekeeper-method',
    title: 'The Gatekeeper\nMethod',
    gradient: ['#042f2e', '#134e4a', '#0d9488'],
    accentColor: '#a855f7',
    icon: 'gate'
  },
  {
    id: 'three-second-rule',
    title: 'The 3-Second\nRule',
    gradient: ['#1e1b4b', '#312e81', '#4338ca'],
    accentColor: '#f97316',
    icon: 'clock'
  },
  {
    id: 'science-of-selling',
    title: 'The Science\nof Selling',
    gradient: ['#052e16', '#14532d', '#166534'],
    accentColor: '#22c55e',
    icon: 'flask'
  },
  {
    id: 'persuasion-blueprint',
    title: 'The Persuasion\nBlueprint',
    gradient: ['#082f49', '#0c4a6e', '#0369a1'],
    accentColor: '#06b6d4',
    icon: 'blueprint'
  },
  {
    id: 'persuasion-stack',
    title: 'The Persuasion\nStack',
    gradient: ['#3b0764', '#581c87', '#7e22ce'],
    accentColor: '#eab308',
    icon: 'layers'
  },
  {
    id: 'architecture-of-influence',
    title: 'Architecture\nof Influence',
    gradient: ['#172554', '#1e3a8a', '#2563eb'],
    accentColor: '#fbbf24',
    icon: 'building'
  }
];

// Create gradient
function createGradient(ctx, width, height, colors) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.5, colors[1]);
  gradient.addColorStop(1, colors[2]);
  return gradient;
}

// Draw icon
function drawIcon(ctx, icon, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const s = size;

  switch (icon) {
    case 'key':
      // Key shape
      ctx.beginPath();
      ctx.arc(x, y, s * 0.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + s * 0.25, y);
      ctx.lineTo(x + s * 0.7, y);
      ctx.lineTo(x + s * 0.7, y + s * 0.15);
      ctx.moveTo(x + s * 0.55, y);
      ctx.lineTo(x + s * 0.55, y + s * 0.1);
      ctx.stroke();
      break;

    case 'button':
      // Button shape
      ctx.beginPath();
      ctx.arc(x, y, s * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(x - s * 0.1, y - s * 0.1, s * 0.15, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'gear':
      // Gear shape
      const teeth = 8;
      ctx.beginPath();
      for (let i = 0; i < teeth * 2; i++) {
        const angle = (i * Math.PI) / teeth;
        const r = i % 2 === 0 ? s * 0.4 : s * 0.28;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, s * 0.1, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'heart':
      // Heart and brain combined
      ctx.beginPath();
      const hx = x - s * 0.15;
      const hy = y;
      ctx.moveTo(hx, hy + s * 0.1);
      ctx.bezierCurveTo(hx - s * 0.3, hy - s * 0.2, hx - s * 0.05, hy - s * 0.35, hx, hy - s * 0.15);
      ctx.bezierCurveTo(hx + s * 0.05, hy - s * 0.35, hx + s * 0.3, hy - s * 0.2, hx, hy + s * 0.1);
      ctx.fill();
      break;

    case 'gate':
      // Gate shape
      ctx.beginPath();
      ctx.moveTo(x - s * 0.35, y + s * 0.4);
      ctx.lineTo(x - s * 0.35, y - s * 0.3);
      ctx.arc(x, y - s * 0.3, s * 0.35, Math.PI, 0);
      ctx.lineTo(x + s * 0.35, y + s * 0.4);
      ctx.stroke();
      // Keyhole
      ctx.beginPath();
      ctx.arc(x, y - s * 0.05, s * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x - s * 0.04, y - s * 0.05, s * 0.08, s * 0.15);
      break;

    case 'clock':
      // Clock with 3
      ctx.beginPath();
      ctx.arc(x, y, s * 0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = `bold ${s * 0.4}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('3', x, y);
      break;

    case 'flask':
      // Flask shape
      ctx.beginPath();
      ctx.moveTo(x - s * 0.1, y - s * 0.35);
      ctx.lineTo(x - s * 0.1, y - s * 0.15);
      ctx.lineTo(x - s * 0.3, y + s * 0.35);
      ctx.lineTo(x + s * 0.3, y + s * 0.35);
      ctx.lineTo(x + s * 0.1, y - s * 0.15);
      ctx.lineTo(x + s * 0.1, y - s * 0.35);
      ctx.closePath();
      ctx.stroke();
      break;

    case 'blueprint':
      // Blueprint grid
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(x - s * 0.35, y - s * 0.35 + i * s * 0.23);
        ctx.lineTo(x + s * 0.35, y - s * 0.35 + i * s * 0.23);
        ctx.stroke();
      }
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(x - s * 0.35 + i * s * 0.23, y - s * 0.35);
        ctx.lineTo(x - s * 0.35 + i * s * 0.23, y + s * 0.35);
        ctx.stroke();
      }
      break;

    case 'layers':
      // Stacked layers
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = i === 3 ? color : `${color}${['33', '66', '99', 'ff'][i]}`;
        ctx.beginPath();
        const ly = y + s * 0.3 - i * s * 0.15;
        ctx.moveTo(x, ly - s * 0.15);
        ctx.lineTo(x + s * 0.35, ly);
        ctx.lineTo(x, ly + s * 0.15);
        ctx.lineTo(x - s * 0.35, ly);
        ctx.closePath();
        ctx.fill();
      }
      break;

    case 'building':
      // Classical building
      ctx.beginPath();
      // Roof
      ctx.moveTo(x - s * 0.4, y - s * 0.15);
      ctx.lineTo(x, y - s * 0.4);
      ctx.lineTo(x + s * 0.4, y - s * 0.15);
      ctx.stroke();
      // Pillars
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x - s * 0.25, y - s * 0.15);
      ctx.lineTo(x - s * 0.25, y + s * 0.35);
      ctx.moveTo(x, y - s * 0.15);
      ctx.lineTo(x, y + s * 0.35);
      ctx.moveTo(x + s * 0.25, y - s * 0.15);
      ctx.lineTo(x + s * 0.25, y + s * 0.35);
      ctx.stroke();
      // Base
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - s * 0.4, y + s * 0.35);
      ctx.lineTo(x + s * 0.4, y + s * 0.35);
      ctx.stroke();
      break;
  }
}

// Draw glow effect
function drawGlow(ctx, x, y, radius, color) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color + '40');
  gradient.addColorStop(0.5, color + '20');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Generate thumbnail
function generateThumbnail(lesson) {
  const width = 1280;
  const height = 720;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  ctx.fillStyle = createGradient(ctx, width, height, lesson.gradient);
  ctx.fillRect(0, 0, width, height);

  // Add subtle noise texture
  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
    ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
  }
  ctx.globalAlpha = 1;

  // Glow effects
  drawGlow(ctx, width * 0.75, height * 0.5, 300, lesson.accentColor);
  drawGlow(ctx, width * 0.2, height * 0.3, 200, lesson.accentColor);

  // Draw icon
  drawIcon(ctx, lesson.icon, width * 0.75, height * 0.5, 200, lesson.accentColor);

  // Draw title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  const lines = lesson.title.split('\n');
  const lineHeight = 85;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, i) => {
    // Text shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(line, 82, startY + i * lineHeight + 3);
    // Main text
    ctx.fillStyle = '#ffffff';
    ctx.fillText(line, 80, startY + i * lineHeight);
  });

  // Add "MASTERCLASS" label
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillStyle = lesson.accentColor;
  ctx.fillText('COPYWRITING MASTERCLASS', 80, height - 60);

  // Add subtle border glow at top
  const topGradient = ctx.createLinearGradient(0, 0, 0, 100);
  topGradient.addColorStop(0, lesson.accentColor + '40');
  topGradient.addColorStop(1, 'transparent');
  ctx.fillStyle = topGradient;
  ctx.fillRect(0, 0, width, 100);

  return canvas;
}

// Main execution
async function main() {
  const outputDir = path.join(__dirname, 'genrok-app', 'public', 'images', 'lessons');

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Generating lesson thumbnails...\n');

  for (const lesson of lessons) {
    console.log(`Creating: ${lesson.id}`);

    const canvas = generateThumbnail(lesson);
    const buffer = canvas.toBuffer('image/png');
    const filepath = path.join(outputDir, `${lesson.id}.png`);

    fs.writeFileSync(filepath, buffer);
    console.log(`  Saved: ${filepath}`);
  }

  console.log('\n=== All thumbnails generated! ===');
  console.log(`Location: ${outputDir}`);
}

main().catch(console.error);
