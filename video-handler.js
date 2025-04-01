const video = document.getElementById('qr-video');
let isCooldown = false;

// Инициализация: показываем первый кадр
video.addEventListener('loadeddata', () => {
  video.pause();
  video.currentTime = 0;
});

// Клик по видео
video.addEventListener('click', async () => {
  if(isCooldown) return;
  
  try {
    isCooldown = true;
    await video.play();
    
    video.addEventListener('ended', () => {
      setTimeout(() => {
        isCooldown = false;
        video.currentTime = 0;
      }, 1000); // Задержка 1 сек после завершения
    }, { once: true });
    
  } catch(err) {
    console.error('Ошибка воспроизведения:', err);
    isCooldown = false;
  }
});