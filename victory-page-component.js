import { goToPage } from './index.js';
import { START_PAGE } from './routes.js';

export function renderVictoryPageComponent({ appEl, time }) {
    // Создаем элемент `div` с классом `overlay`
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    // Вставляем разметку страницы победы в элемент `overlay`
    overlay.innerHTML = `<div class="container">
      <div class="victory-form">
      <img src="images/celebration.png">
        <div class="victory-form__header">
          Вы выиграли!
        </div>
        <div class="victory-form__time">
          <div class="victory-form__time-text">
            Затраченное время:
          </div>
          <div class="victory-form__time-value">
             ${time}
          </div>
        </div>
        <button class="victory-form__restart-button">Играть снова</button>
      </div>
    </div>`;

    // Добавляем `overlay` в элемент приложения `appEl`
    appEl.appendChild(overlay);

    // Удаляем `overlay` при нажатии на кнопку "Играть снова"
    overlay
        .querySelector('.victory-form__restart-button')
        .addEventListener('click', () => {
            overlay.style.backgroundColor = '';
            appEl.removeChild(overlay);
            goToPage(START_PAGE);
        });
}
