import { generateCards, shuffleCards } from './game-logics.js';

export function renderGamePageComponent({ appEl, difficulty }) {
    // 3. Функция отображения карт на игровом поле
    function renderCards(cards, gameEl) {
        const cardsHTML = cards
            .map(
                (card) => `
    <div class="game__card" data-suit="${card.suit}" data-rank="${card.rank}">
      <img src="images/shirt.jpg" alt="Футболка" class="game__card-front">
      <img src="images/${card.rank} ${card.suit}.jpg" alt="Обратная сторона карточки" class="game__card-back">
    </div>`,
            )
            .join('');

        gameEl.querySelector('.game__cards').innerHTML = cardsHTML;
    }

    appEl.innerHTML = `
    <div class="game ">
    <div class="game__header">
        <div class="game__timer">
        <div class="game__timer-labels">
            <div class="game__timer-label">мин</div>
            <div class="game__timer-label">сек</div>
        </div>
        <div class="game__timer-value">00.00</div>
        </div>
        <button class="game__restart-button">Начать заново</button>
    </div>
    <div class="game__cards">
    </div>
    </div>`;

    let firstCard = null;
    let secondCard = null;

    let foundPairs = 0;

    if (difficulty === '2') {
        document.querySelector('.game__cards').style.width = '750px';
    }

    const shuffledCards = shuffleCards(generateCards(difficulty));

    const gameEl = document.querySelector('.game');

    renderCards(shuffledCards, gameEl);

    let canClick = false;

    setTimeout(() => {
        gameEl.querySelectorAll('.game__card').forEach((cardEl) => {
            cardEl.querySelector('.game__card-front').style.display = 'block';
            cardEl.querySelector('.game__card-back').style.display = 'none';
        });
        canClick = true;
    }, 5000);

    document
        .querySelector('.game__cards')
        .addEventListener('click', (event) => {
            if (!canClick) {
                return;
            }
            const cardEl = event.target.closest('.game__card');

            if (
                !cardEl ||
                cardEl.querySelector('.game__card-front').style.display ===
                    'none' ||
                firstCard === cardEl ||
                secondCard === cardEl
            ) {
                return;
            }

            cardEl.querySelector('.game__card-front').style.display = 'none';
            cardEl.querySelector('.game__card-back').style.display = 'block';

            if (!firstCard) {
                firstCard = cardEl;
            } else if (!secondCard) {
                secondCard = cardEl;
                setTimeout(() => {
                    // Если выбраны две карты, сравниваем их
                    if (
                        firstCard.dataset.suit === secondCard.dataset.suit &&
                        firstCard.dataset.rank === secondCard.dataset.rank
                    ) {
                        foundPairs++;
                    } else {
                        alert('Вы проиграли!');
                        foundPairs = 0;
                    }

                    // Очищаем выбранные карты
                    firstCard = null;
                    secondCard = null;

                    // Проверяем, выиграли или проиграли

                    if (foundPairs === difficulty * 3) {
                        alert('Вы победили!');
                        foundPairs = 0;
                    }
                }, 300);
            }
        });
}
