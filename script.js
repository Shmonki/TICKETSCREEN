document.addEventListener('DOMContentLoaded', function() {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  // Уникальные классы для элементов
  const elements = {
    today: {
      number: document.querySelector('.frame-1___29-text'), // Число
      month: document.querySelector('.frame-1__fevralyacontainer2') // Контейнер месяца
    },
    tomorrow: {
      number: document.querySelector('.frame-1___30-text'),
      month: document.querySelector('.frame-1__fevralyacontainer3')
    }
  };

  function updateDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Обновляем сегодняшнюю дату
    elements.today.number.textContent = today.getDate();
    elements.today.month.querySelector('div').textContent = months[today.getMonth()];

    // Обновляем завтрашнюю дату
    elements.tomorrow.number.textContent = tomorrow.getDate();
    elements.tomorrow.month.querySelector('div').textContent = months[tomorrow.getMonth()];
  }

  updateDates();
});