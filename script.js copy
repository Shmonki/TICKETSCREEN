if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  document.activeElement.blur();
}

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});




document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById('qr-video');
  
  // Настройки видео
  video.controls = false;
  video.currentTime = 0.01;

  // Обработчики событий
  video.addEventListener('click', function(e) {
    e.preventDefault();
    if(this.paused) {
      this.play().catch(() => {});
    }
  });

  video.addEventListener('ended', () => {
    video.currentTime = 0.01;
    video.pause();
  });

  video.addEventListener('webkitbeginfullscreen', (e) => {
    e.preventDefault();
    video.webkitExitFullscreen();
  });

  video.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  video.addEventListener('loadedmetadata', () => {
    video.currentTime = 0.01;
  });
});