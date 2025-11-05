document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('click-overlay');
    const video = document.getElementById('videoPlayer');
    const mainContent = document.getElementById('main-content');
    const profileContainer = document.querySelector('.profile-container');

    overlay.addEventListener('click', (e) => {
        if (e.button === 0) { // left click
            // Fade out overlay
            overlay.style.transition = 'opacity 0.8s ease';
            overlay.style.opacity = 0;

            setTimeout(() => {
                overlay.classList.add('hidden');

                // Show main content
                mainContent.classList.remove('hidden');

                // Fade in video and profile
                video.style.opacity = 1;
                profileContainer.style.opacity = 1;

                // Play video with sound
                video.muted = false;
                video.play();
            }, 800);
        }
    });
});
