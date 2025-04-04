document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('qr-video');
  if (!video) return;

  let isPlaying = false;
  let controller = new AbortController();

  // Функция полного сброса состояния
  const resetVideo = () => {
    controller.abort();
    controller = new AbortController();
    video.pause();
    video.currentTime = 0;
    video.classList.remove('video-active');
  };

  // Инициализация видео
  const initVideo = () => {
    video.classList.add('video-loading');
    video.load();
    
    const signal = controller.signal;
    
    video.addEventListener('loadeddata', () => {
      video.classList.remove('video-loading');
      video.currentTime = 0.1; // Фикс для iOS
    }, { once: true, signal });

    video.addEventListener('error', (e) => {
      console.error('Video error:', e.target.error);
      resetVideo();
    }, { signal });
  };

  // Обработчик клика/тапа
  const handlePlay = async () => {
    if (isPlaying || video.classList.contains('video-loading')) return;
    
    try {
      isPlaying = true;
      video.classList.add('video-active', 'video-loading');
      
      await video.play();
      
      video.addEventListener('ended', () => {
        resetVideo();
        isPlaying = false;
      }, { once: true, signal: controller.signal });
      
    } catch (error) {
      console.error('Playback error:', error);
      resetVideo();
      isPlaying = false;
    }
  };

  // Инициализация при загрузке
  initVideo();

  // Обработчики событий
  video.addEventListener('click', handlePlay);
  video.addEventListener('touchstart', handlePlay, { 
    passive: true,
    signal: controller.signal
  });

  // Периодический сброс
  setInterval(() => {
    if (!isPlaying) initVideo();
  }, 30000); // Каждые 30 секунд
});