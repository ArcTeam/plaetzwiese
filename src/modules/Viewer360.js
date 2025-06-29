import * as THREE from 'three';

export class Viewer360 {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    
    // Interaction variables
    this.isUserInteracting = false;
    this.onPointerDownMouseX = 0;
    this.onPointerDownMouseY = 0;
    this.lon = 0;
    this.onPointerDownLon = 0;
    this.lat = 0;
    this.onPointerDownLat = 0;
    this.phi = 0;
    this.theta = 0;
  }

  init360(filename) {
    this.container.innerHTML = '';
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    this.scene = new THREE.Scene();
    
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert geometry on x-axis
    
    const texture = new THREE.TextureLoader().load(`assets/camera360/${filename}`);
    texture.colorSpace = THREE.SRGBColorSpace;
    
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.container.offsetWidth - 20, this.container.offsetHeight - 20);
    this.container.appendChild(this.renderer.domElement);
    this.container.style.touchAction = 'none';
    
    this.addEventListeners();
  }

  addEventListeners() {
    this.container.addEventListener('pointerdown', this.onPointerDown.bind(this));
    document.addEventListener('wheel', this.onDocumentMouseWheel.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onPointerDown(event) {
    if (event.isPrimary === false) return;
    
    this.isUserInteracting = true;
    this.onPointerDownMouseX = event.clientX;
    this.onPointerDownMouseY = event.clientY;
    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;
    
    document.addEventListener('pointermove', this.onPointerMove.bind(this));
    document.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  onPointerMove(event) {
    if (event.isPrimary === false) return;
    
    this.lon = (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
    this.lat = (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
  }

  onPointerUp(event) {
    if (event.isPrimary === false) return;
    
    this.isUserInteracting = false;
    document.removeEventListener('pointermove', this.onPointerMove.bind(this));
    document.removeEventListener('pointerup', this.onPointerUp.bind(this));
  }

  onDocumentMouseWheel(event) {
    if (!this.camera) return;
    
    const fov = this.camera.fov + event.deltaY * 0.05;
    this.camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
    this.camera.updateProjectionMatrix();
  }

  animate() {
    if (!this.camera || !this.renderer || !this.scene) return;
    
    requestAnimationFrame(this.animate.bind(this));
    this.update();
  }

  update() {
    if (!this.camera) return;
    
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);
    
    const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const y = 500 * Math.cos(this.phi);
    const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
    
    this.camera.lookAt(x, y, z);
    this.renderer.render(this.scene, this.camera);
  }
}
