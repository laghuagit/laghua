document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('click-overlay');
  const video = document.getElementById('videoPlayer');
  const audio = document.getElementById('bgAudio');
  const mainContent = document.getElementById('main-content');
  const boxes = document.querySelectorAll('.profile-box');
  const discordBtn = document.getElementById('discord-btn');
  const copiedText = document.getElementById('copied-text');
  const muteToggle = document.getElementById('muteToggle');
  const volumeSlider = document.getElementById('volumeSlider');
  const restartBtn = document.getElementById('restartBtn');

  video.volume = 0;
  video.muted = true;
  audio.volume = 0;
  const targetVolume = 0.2;
  audio.muted = false;

  overlay.addEventListener('click', () => {
    overlay.classList.add('fade-away');
    setTimeout(() => {
      overlay.classList.add('hidden');
      mainContent.classList.remove('hidden');

      video.play();
      audio.play();

      let opacity = 0;
      let brightness = 0.2;
      let volume = 0;

      video.style.opacity = opacity;
      video.style.filter = `brightness(${brightness}) contrast(1.1) saturate(1.2)`;

      const fadeInterval = setInterval(() => {
        if(opacity < 1){
          opacity += 0.02;
          brightness += 0.015;
          volume += targetVolume/50;
          video.style.opacity = opacity;
          video.style.filter = `brightness(${brightness}) contrast(1.1) saturate(1.2)`;
          audio.volume = Math.min(volume, targetVolume);
        } else {
          clearInterval(fadeInterval);
        }
      }, 50);

      boxes.forEach(b => b.classList.add('visible'));
    }, 1800);
  });

  boxes.forEach(box => {
    let rotationX = 0, rotationY = 0, targetX = 0, targetY = 0;
    box.addEventListener('mousemove', e => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      targetX = (y/rect.height)*60;
      targetY = (x/rect.width)*-60;
    });
    box.addEventListener('mouseleave', () => { targetX=0; targetY=0; });
    function animateTilt(){
      rotationX += (targetX-rotationX)*0.08;
      rotationY += (targetY-rotationY)*0.08;
      box.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      requestAnimationFrame(animateTilt);
    }
    animateTilt();
  });

  discordBtn.addEventListener('click', () => {
    const username = "laghua_";
    navigator.clipboard.writeText(username).then(() => {
      copiedText.style.opacity = 1;
      setTimeout(() => copiedText.style.opacity = 0, 1200);
    });
  });

  muteToggle.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteToggle.textContent = audio.muted ? '🔇' : '🔊';
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    if(audio.volume > 0) audio.muted = false;
    muteToggle.textContent = audio.muted ? '🔇' : '🔊';
  });

  restartBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
  });
});
