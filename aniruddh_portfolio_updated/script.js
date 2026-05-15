const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealItems.forEach((item) => observer.observe(item));

function drawRadarChart() {
  const canvas = document.getElementById('skillsRadar');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const labels = ['Testing', 'Documentation', 'Simulink', 'Power Systems', 'AutoCAD', 'LabVIEW', 'Building Services', 'DIALux/Bluebeam'];
  const values = [85, 82, 80, 76, 68, 67, 60, 45];
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = 185;
  const levels = 5;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '700 14px Inter, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let level = 1; level <= levels; level += 1) {
    const r = (radius / levels) * level;
    ctx.beginPath();
    labels.forEach((_, i) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * i) / labels.length;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.16)';
    ctx.stroke();
  }

  labels.forEach((label, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / labels.length;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.13)';
    ctx.stroke();
    const labelX = cx + (radius + 48) * Math.cos(angle);
    const labelY = cy + (radius + 34) * Math.sin(angle);
    ctx.fillStyle = '#d8e6f7';
    ctx.fillText(label, labelX, labelY);
  });

  ctx.beginPath();
  values.forEach((value, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / values.length;
    const r = radius * (value / 100);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.closePath();
  const gradient = ctx.createLinearGradient(120, 80, 400, 430);
  gradient.addColorStop(0, 'rgba(86, 204, 242, 0.52)');
  gradient.addColorStop(1, 'rgba(54, 242, 184, 0.25)');
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = '#36f2b8';
  ctx.lineWidth = 3;
  ctx.stroke();

  values.forEach((value, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / values.length;
    const r = radius * (value / 100);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#56ccf2';
    ctx.fill();
  });
}

drawRadarChart();
window.addEventListener('resize', drawRadarChart);
