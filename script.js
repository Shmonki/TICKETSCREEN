// Ждём полной загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
  // ПОЛУЧАЕМ ЭЛЕМЕНТ ВИДЕО (УБЕДИТЕСЬ ЧТО ID СОВПАДАЕТ)
  const video = document.getElementById('https://cdn.glitch.global/e01bdc14-9dc5-42f2-b393-aa2f0de7a5be/qr-animation.webm');
  let isPlaying = false;

  // ПОКАЗЫВАЕМ ПЕРВЫЙ КАДР КАК ПРЕВЬЮ
  video.addEventListener('loadeddata', () => {
    video.pause();
    video.currentTime = 0;
  });

  // ОБРАБОТЧИК КЛИКА (ТАПА НА МОБИЛЬНЫХ)
  video.addEventListener('click', async () => {
    // ЗАЩИТА ОТ ПОВТОРНЫХ НАЖАТИЙ
    if(isPlaying) return;
    isPlaying = true;

    try {
      // ЗАПУСК ВОСПРОИЗВЕДЕНИЯ
      await video.play();
      
      // ПО ОКОНЧАНИИ ВИДЕО
      video.addEventListener('ended', () => {
        // ВОЗВРАЩАЕМ ПРЕВЬЮ
        video.currentTime = 0;
        // ЗАДЕРЖКА 1 СЕКУНДА МЕЖДУ КЛИКАМИ
        setTimeout(() => {
          isPlaying = false;
        }, 1000);
      }, { once: true });

    } catch(error) {
      // ЕСЛИ ВОЗНИКЛА ОШИБКА
      console.error('Ошибка воспроизведения:', error);
      isPlaying = false;
    }
  });

  // ПРЕДЗАГРУЗКА ВИДЕО
  video.load();
});