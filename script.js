document.addEventListener('DOMContentLoaded',()=>{
const overlay=document.getElementById('click-overlay')
const video=document.getElementById('videoPlayer')
const mainContent=document.getElementById('main-content')
const boxes=document.querySelectorAll('.profile-box')
const discordBtn=document.getElementById('discord-btn')
const copiedText=document.getElementById('copied-text')
overlay.addEventListener('click',()=>{
overlay.classList.add('blur-away')
setTimeout(()=>{
overlay.classList.add('hidden')
mainContent.classList.remove('hidden')
video.style.opacity=1
video.muted=false
video.play()
boxes.forEach(b=>b.classList.add('visible'))
},1500)
})
boxes.forEach(box=>{
let rotationX=0,rotationY=0,targetX=0,targetY=0
box.addEventListener('mousemove',e=>{
const rect=box.getBoundingClientRect()
const x=e.clientX-rect.left-rect.width/2
const y=e.clientY-rect.top-rect.height/2
targetX=(y/rect.height)*60
targetY=(x/rect.width)*-60
})
box.addEventListener('mouseleave',()=>{targetX=0;targetY=0})
function animateTilt(){
rotationX+=(targetX-rotationX)*0.08
rotationY+=(targetY-rotationY)*0.08
box.style.transform=`rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
requestAnimationFrame(animateTilt)
}
animateTilt()
})
discordBtn.addEventListener('click',()=>{
const username="laghua_"
navigator.clipboard.writeText(username).then(()=>{
copiedText.style.opacity=1
setTimeout(()=>copiedText.style.opacity=0,1200)
})
})
})
