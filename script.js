const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let stars = [];
let glowOpacity = 0;
let fadeDirection = 1;

// Warna random bintang
function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 80%)`;
}

// Buat bintang random bergerak
function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: randomColor(),
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6
    });
  }
}

// Gambar teks glow dengan fade in/out
function drawText() {
  ctx.save();
  ctx.font = "bold 100px Georgia"; // ganti font biar lebih elegan
  ctx.textAlign = "center";
  ctx.fillStyle = `rgba(255, 255, 255, ${glowOpacity})`;
  ctx.shadowBlur = 40;
  ctx.shadowColor = "white";
  ctx.fillText("FAZAH", canvas.width / 2, canvas.height / 2 + 35);
  ctx.restore();

  // Update opacity (fade efek)
  glowOpacity += 0.01 * fadeDirection;
  if (glowOpacity >= 0.7) fadeDirection = -1; 
  if (glowOpacity <= 0) fadeDirection = 1;
}

// Gambar bintang + garis kosmik
function drawStars() {
  // Background gradient
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 100,
    canvas.width / 2, canvas.height / 2, 600
  );
  gradient.addColorStop(0, "#0d0d2b");
  gradient.addColorStop(1, "#000000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Bintang
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = s.color;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Update posisi
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });

  // Garis antar bintang (jika dekat)
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      let dx = stars[i].x - stars[j].x;
      let dy = stars[i].y - stars[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "white";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
  }

  // Tambah teks glow
  drawText();
}

// Animasi
function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

// Tombol regenerate
document.getElementById("newArtBtn").addEventListener("click", () => {
  createStars(100);
});

createStars(100);
animate();
