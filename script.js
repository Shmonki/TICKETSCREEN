<script>
const video = document.getElementById('qr-video');
let isPlaying = false;

// Клик по видео
video.addEventListener('click', function() {
  if (isPlaying) return;
  
  isPlaying = true;
  video.currentTime = 0; // Перемотка в начало
  video.play();
  
  // Событие окончания видео
  video.addEventListener('ended', function() {
    isPlaying = false;
  }, { once: true });
});

// Автозагрузка видео при открытии страницы
window.addEventListener('load', function() {
  video.load();
});
</script>