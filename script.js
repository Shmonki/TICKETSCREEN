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




// Новый script.js
class VideoPlayer {
  constructor() {
    this.video = document.getElementById('qr-video');
    this.source = 'https://cdn.glitch.global/e01bdc14-9dc5-42f2-b393-aa2f0de7a5be/qr-animation.webm';
    this.isPlaying = false;
    
    this.init();
  }

  init() {
    this.setupVideo();
    this.addEventListeners();
  }

  setupVideo() {
    this.video.innerHTML = `
      <source src="${this.source}" type="video/webm">
      <source src="${this.source.replace('.webm', '.mp4')}" type="video/mp4">
    `;
    
    this.video.load();
    this.video.currentTime = 0.1;
  }

  addEventListeners() {
    this.video.addEventListener('click', this.handleClick.bind(this));
    this.video.addEventListener('ended', this.resetVideo.bind(this));
    this.video.addEventListener('error', this.handleError.bind(this));
  }

  handleClick(e) {
    e.preventDefault();
    if(!this.isPlaying) {
      this.isPlaying = true;
      this.video.play().catch(e => {
        console.error('Playback failed:', e);
        this.isPlaying = false;
      });
    }
  }

  resetVideo() {
    this.isPlaying = false;
    this.video.pause();
    this.video.currentTime = 0.1;
    this.video.load();
  }

  handleError(e) {
    console.error('Video error:', e);
    this.resetVideo();
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const player = new VideoPlayer();
  
  // Фикс для старых iPhone
  if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.body.addEventListener('touchstart', () => {}, false);
  }
});