/* Navegação simples */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      })
    );
  }

  initThree();
});

/* 3D sutil com Three.js (wireframe icosaedro) */
function initThree() {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("scene-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  resize();

  // Geometria e material (wireframe branco translúcido)
  const geometry = new THREE.IcosahedronGeometry(1.8, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.18, transparent: true });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Linhas orbitais leves
  const ringGeo = new THREE.TorusGeometry(2.8, 0.006, 8, 180);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.08, transparent: true });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI * 0.5;
  scene.add(ring);

  // Interatividade com mouse/parallax
  const state = { mx: 0, my: 0, tx: 0, ty: 0 };
  function onPointerMove(e) {
    const point = 'touches' in e ? e.touches[0] : e;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (point.clientX - cx) / Math.max(1, rect.width / 2);
    const ny = (point.clientY - cy) / Math.max(1, rect.height / 2);
    state.mx = THREE.MathUtils.clamp(nx, -1, 1);
    state.my = THREE.MathUtils.clamp(ny, -1, 1);
  }

  if (!prefersReduced) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
  }

  let running = !prefersReduced;

  function animate() {
    if (!running) return; // respeita redução de movimento
    // alvo de rotação puxado pelo mouse
    state.tx = THREE.MathUtils.lerp(state.tx, -state.my * 0.7, 0.05);
    state.ty = THREE.MathUtils.lerp(state.ty,  state.mx * 0.9, 0.05);
    mesh.rotation.x += (state.tx - mesh.rotation.x) * 0.08;
    mesh.rotation.y += (state.ty - mesh.rotation.y) * 0.08;
    ring.rotation.z += 0.0012 + Math.abs(state.mx) * 0.0008;
    // parallax sutil da câmera
    camera.position.x += (state.mx * 0.45 - camera.position.x) * 0.04;
    camera.position.y += (-state.my * 0.35 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  }

  function renderOnce() {
    renderer.render(scene, camera);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }

  let rafId = null;
  if (running) animate(); else renderOnce();

  window.addEventListener("resize", () => { resize(); if (!prefersReduced) renderOnce(); });
  document.addEventListener("visibilitychange", () => {
    const hidden = document.visibilityState !== "visible";
    if (hidden) {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    } else if (!prefersReduced) {
      running = true;
      animate();
    }
  });
}