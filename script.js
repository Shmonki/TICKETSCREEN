document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('qr-video');
  if (!video) return;

  let isPlaying = false;

  video.addEventListener('click', async () => {
    if (isPlaying) return;
    
    try {
      isPlaying = true;
      
      // Перезагружаем видео перед каждым воспроизведением
      if (video.readyState > 2) {
        video.currentTime = 0;
        video.load();
      }
      
      await video.play();
      
      video.onended = () => {
        isPlaying = false;
        video.currentTime = 0;
      };

    } catch (error) {
      console.error('Ошибка:', error);
      isPlaying = false;
      video.currentTime = 0;
    }
  });
});