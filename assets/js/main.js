import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create the renderer and set properties
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000, 0); // Transparent background
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Append to body

// Scene and camera setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Adjust the camera position to focus on the model's center more accurately
camera.position.set(0, 1.5, 10); // Increase Z to move it back, adjust Y if necessary

// Create background sphere
const sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
const backgroundSphere = new THREE.Mesh(sphereGeometry);
scene.add(backgroundSphere);

// Load GLTF model
const loader = new GLTFLoader();
// Center and scale the model
loader.load("assets/3d/scene.gltf", (gltf) => {
  const mesh = gltf.scene;
  mesh.scale.set(0.1, 0.1, 0.1); // Adjust scale to fit better on screen
  mesh.position.set(0, 0, 0); // Position it to ensure it's centered on Y axis
  scene.add(mesh);
});

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Window resize event listener
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

animate();
