import { goToPage } from './index.js';
import { START_PAGE } from './routes.js';

export function renderVictoryPageComponent({ appEl, time }) {
    appEl.innerHTML = `<div class="container">
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

    document
        .querySelector('.victory-form__restart-button')
        .addEventListener('click', () => {
            goToPage(START_PAGE);
        });
}
