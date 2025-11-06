document.addEventListener('DOMContentLoaded',()=>{
const overlay=document.getElementById('click-overlay');
const video=document.getElementById('videoPlayer');
const mainContent=document.getElementById('main-content');
const profileBox=document.querySelector('.profile-box');
const discordBtn=document.getElementById('discord-btn');
const copiedText=document.getElementById('copied-text');
overlay.addEventListener('click',()=>{
overlay.style.transition='opacity 0.8s ease';
overlay.style.opacity=0;
setTimeout(()=>{
overlay.classList.add('hidden');
mainContent.classList.remove('hidden');
video.style.opacity=1;
profileBox.style.opacity=1;
video.muted=false;
video.play();
},800);
});
let rotationX=0,rotationY=0,targetX=0,targetY=0;
profileBox.addEventListener('mousemove',e=>{
const box=profileBox.getBoundingClientRect();
const x=e.clientX-box.left;
const y=e.clientY-box.top;
const centerX=box.width/2;
const centerY=box.height/2;
targetX=((y-centerY)/centerY)*20;
targetY=((x-centerX)/centerX)*-20;
});
profileBox.addEventListener('mouseleave',()=>{
targetX=0;targetY=0;
});
function animateTilt(){
rotationX+=(targetX-rotationX)*0.1;
rotationY+=(targetY-rotationY)*0.1;
profileBox.style.transform=`translate(-50%,-50%) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
requestAnimationFrame(animateTilt);
}
animateTilt();
discordBtn.addEventListener('click',()=>{
const username="laghua_"; 
navigator.clipboard.writeText(username).then(()=>{
copiedText.style.opacity=1;
setTimeout(()=>copiedText.style.opacity=0,1200);
});
});
});
