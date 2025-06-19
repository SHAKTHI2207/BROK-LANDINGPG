// Star Canvas Animation
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 120;
let shootingStars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    velocity: Math.random() * 0.3 + 0.05
  });
}

function spawnShootingStar() {
  if (Math.random() < 0.003) { // very rare, subtle
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: 0,
      vx: Math.random() * 5 + 4,
      vy: Math.random() * 1.5 + 1,
      length: Math.random() * 60 + 80,
      alpha: 1
    });
  }
}

function drawShootingStars() {
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const star = shootingStars[i];
    ctx.beginPath();
    const grad = ctx.createLinearGradient(star.x, star.y, star.x - star.length, star.y - star.length * 0.5);
    grad.addColorStop(0, `rgba(255,255,255,${star.alpha})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.2;
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y - star.length * 0.5);
    ctx.stroke();

    star.x += star.vx;
    star.y += star.vy;
    star.alpha -= 0.01;

    if (star.alpha <= 0 || star.x > canvas.width || star.y > canvas.height) {
      shootingStars.splice(i, 1);
    }
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#aaa';

  // background stars
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();

    star.y += star.velocity;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }

  // maybe spawn a shooting star
  spawnShootingStar();

  // draw them
  drawShootingStars();

  requestAnimationFrame(animateStars);
}
animateStars();

// Waitlist Confirmation Script
function showThankYou(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;

  if (!email || !email.includes('@')) return;

  form.style.display = 'none';
  document.getElementById('thankYouMessage').style.display = 'block';

  form.submit();
}
