import { goToPage } from './index.js';
import { START_PAGE } from './routes.js';

export function renderDefeatPageComponent({ appEl, time }) {
    appEl.innerHTML = `<div class="container">
      <div class="defeat-form">
      <img src="images/dead.png">
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

    document
        .querySelector('.defeat-form__restart-button')
        .addEventListener('click', () => {
            goToPage(START_PAGE);
        });
}
