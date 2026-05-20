// LOADER
window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

// TYPING
const text = ["Influencer","Leader","Entrepreneur"];
let i=0,j=0,isDeleting=false;

function type(){
  let current = text[i];

  if(isDeleting){ j--; } else { j++; }

  document.getElementById("typing").innerHTML = current.substring(0,j);

  if(!isDeleting && j===current.length){
    isDeleting=true;
    setTimeout(type,1000);
    return;
  }

  if(isDeleting && j===0){
    isDeleting=false;
    i=(i+1)%text.length;
  }

  setTimeout(type,isDeleting?50:100);
}
type();


// 3D BACKGROUND
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  alpha:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

const geometry = new THREE.BufferGeometry();
const count = 1500;
const positions = new Float32Array(count * 3);

for(let i=0;i<count*3;i++){
  positions[i] = (Math.random()-0.5)*10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));

const material = new THREE.PointsMaterial({
  size:0.02,
  color:0x00ffcc
});

const mesh = new THREE.Points(geometry, material);
scene.add(mesh);

function animate(){
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.0008;
  mesh.rotation.x += 0.0005;
  renderer.render(scene,camera);
}
animate();

// 3D HOVER
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    let x=e.offsetX;
    let y=e.offsetY;
    card.style.transform = `rotateX(${-(y/10)}deg) rotateY(${x/10}deg)`;
  });

  card.addEventListener("mouseleave",()=>{
    card.style.transform="rotateX(0) rotateY(0)";
  });
});