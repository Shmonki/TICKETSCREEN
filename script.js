// Ожидаем полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Получаем элемент видео
  const video = document.getElementById('qr-animation.webm');
  
  // Если элемент не найден
 // if (!video) {
   // console.error('Элемент #qr-video не найден!');
  //  return;
  }

 // let isPlaying = false;

  // Показываем первый кадр как превью
  video.addEventListener('loadeddata', () => {
    video.pause();
    video.currentTime = 0;
  });

  // Обработчик клика
  video.addEventListener('click', async () => {
    if (isPlaying) return;
    isPlaying = true;

    try {
      await video.play();
    } catch (err) {
      console.error('Ошибка воспроизведения:', err);
      isPlaying = false;
    }

    // Сброс после завершения видео
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      isPlaying = false;
    }, { once: true });
  });
});