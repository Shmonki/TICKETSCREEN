document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('qr-video');
  if (!video) return;

  let isPlaying = false;
  let abortController = null;

  // Жесткий сброс состояния видео
  const hardResetVideo = () => {
    video.pause();
    video.currentTime = 0;
    video.removeAttribute('src');
    video.load();
    if (abortController) abortController.abort();
    abortController = new AbortController();
  };

  // Восстановление источника
  const restoreSource = () => {
    video.innerHTML = '';
    const webmSource = document.createElement('source');
    webmSource.src = '/assets/qr-animation.webm';
    webmSource.type = 'video/webm';
    video.appendChild(webmSource);
    
    const mp4Source = document.createElement('source');
    mp4Source.src = '/assets/qr-animation.mp4';
    mp4Source.type = 'video/mp4';
    video.appendChild(mp4Source);
    
    video.load();
  };

  video.addEventListener('click', async () => {
    if (isPlaying) {
      hardResetVideo();
      await new Promise(r => setTimeout(r, 300));
      restoreSource();
      return;
    }

    try {
      isPlaying = true;
      const signal = abortController.signal;
      
      await Promise.race([
        video.play(),
        new Promise((_, reject) => {
          if (signal.aborted) reject(new DOMException('Aborted', 'AbortError'));
          signal.addEventListener('abort', () => 
            reject(new DOMException('Aborted', 'AbortError')));
        })
      ]);

      video.addEventListener('ended', () => {
        hardResetVideo();
        isPlaying = false;
      }, { once: true, signal: abortController.signal });

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Playback failed:', err);
        hardResetVideo();
        restoreSource();
      }
      isPlaying = false;
    }
  });

  // Периодический сброс каждые 5 кликов
  let clickCounter = 0;
  video.addEventListener('click', () => {
    if (++clickCounter % 5 === 0) {
      hardResetVideo();
      restoreSource();
    }
  });
});