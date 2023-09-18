import { goToPage, setDifficulty } from './index';
import { GAME_PAGE } from './routes';

export function renderStartPageComponent({
    appEl,
}: {
    appEl: HTMLElement;
}): void {
    appEl.innerHTML = `
               <div class="container">
      <div class="selection-form">
        <div class="selection-form__header">
          Выбери <br /> сложность
        </div>
        <div class="selection-form__card-container">
          <input type="radio" id="card1" name="cards" value="1" checked>
          <label for="card1">1</label>
          
          <input type="radio" id="card2" name="cards" value="2">
          <label for="card2">2</label>
          
          <input type="radio" id="card3" name="cards" value="3">
          <label for="card3">3</label>
        </div>
        <button class="selection-form__start-button">Старт</button>
      </div>
    </div>`;

    const getSelectedDifficulty = (): number => {
        const radioButtons = document.querySelectorAll<HTMLInputElement>(
            ".selection-form__card-container input[type='radio']",
        );
        let selectedDifficulty = 0;
        radioButtons.forEach((radio) => {
            const inputRadio = radio as HTMLInputElement;
            if (inputRadio.checked) {
                selectedDifficulty = Number(inputRadio.value);
            }
        });

        return selectedDifficulty;
    };
    const selectionFormStartButton = document.querySelector(
        '.selection-form__start-button',
    );

    selectionFormStartButton.addEventListener('click', (event) => {
        setDifficulty({ newDifficulty: getSelectedDifficulty() });
        goToPage(GAME_PAGE);
        event.stopPropagation();
    });
}
