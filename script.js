window.onload=()=>{document.getElementById("loader").style.display="none";}
const text=["Influencer","Leader","Entrepreneur"];
let i=0,j=0,isDeleting=false;
function type(){
let current=text[i];
if(isDeleting){j--;}else{j++;}
document.getElementById("typing").innerHTML=current.substring(0,j);
if(!isDeleting&&j===current.length){isDeleting=true;setTimeout(type,1000);return;}
if(isDeleting&&j===0){isDeleting=false;i=(i+1)%text.length;}
setTimeout(type,isDeleting?50:100);
}
type();

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("bg")});
renderer.setSize(window.innerWidth,window.innerHeight);
const geometry=new THREE.BufferGeometry();
const vertices=[];
for(let i=0;i<3000;i++){
vertices.push(Math.random()*2000-1000,Math.random()*2000-1000,Math.random()*2000-1000);
}
geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
const material=new THREE.PointsMaterial({color:0x00ffff});
const stars=new THREE.Points(geometry,material);
scene.add(stars);
camera.position.z=5;
function animate(){
requestAnimationFrame(animate);
stars.rotation.y+=0.0005;
renderer.render(scene,camera);
}
animate();
