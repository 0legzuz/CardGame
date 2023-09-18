import { goToPage } from './index';
import { START_PAGE } from './routes';

export function renderDefeatPageComponent({ appEl, time }) {
    // Создаем элемент `div` с классом `overlay`
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    // Вставляем разметку страницы победы в элемент `overlay`
    overlay.innerHTML = `<div class="container">
      <div class="defeat-form">
      <img src="static/dead.png">
        <div class="defeat-form__header">
          Вы проиграли!
        </div>
        <div class="defeat-form__time">
          <div class="defeat-form__time-text">
            Затраченное время:
          </div>
          <div class="defeat-form__time-value">
             ${time}
          </div>
        </div>
        <button class="defeat-form__restart-button">Играть снова</button>
      </div>
    </div>`;

    // Добавляем `overlay` в элемент приложения `appEl`
    appEl.appendChild(overlay);

    // Удаляем `overlay` при нажатии на кнопку "Играть снова"
    overlay
        .querySelector('.defeat-form__restart-button')
        .addEventListener('click', () => {
            overlay.style.backgroundColor = '';
            appEl.removeChild(overlay);
            goToPage(START_PAGE);
        });
}
