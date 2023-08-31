import { generateCards, shuffleCards } from './game-logics.js';
import { goToPage, setTime } from './index.js';
import { DEFEAT_PAGE, START_PAGE, VICTORY_PAGE } from './routes.js';

function timer(minutes, seconds, countdown, timerEl) {
    function formatTime(num) {
        return num < 10 ? '0' + num : num.toString();
    }

    function updateTimer() {
        timerEl.innerHTML = `${formatTime(minutes)}.${formatTime(seconds)}`;
    }

    function tick() {
        if (countdown) {
            if (seconds === 0 && minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
        } else {
            if (seconds < 59) {
                seconds++;
            } else {
                minutes++;
                seconds = 0;
            }
        }

        updateTimer();

        if (countdown && minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
        }
    }

    updateTimer();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
}

export function renderGamePageComponent({ appEl, difficulty }) {
    let timerStop;
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

    // Разметка таймера и кнопки
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
    const timerEl = document.querySelector('.game__timer-value');

    // Обнуление карт для перетосовки
    let firstCard = null;
    let secondCard = null;
    let foundPairs = 0;
    const gameEl = document.querySelector('.game');
    // Отключение нажатий
    let canClick = false;

    // Изменение стиля разметки под 2-й уровень
    if (difficulty === '2') {
        document.querySelector('.game__cards').style.width = '750px';
    }

    // Перетосовка карт
    const shuffledCards = shuffleCards(generateCards(difficulty));

    // Отрисовка перетосованных карт
    renderCards(shuffledCards, gameEl);

    // Показ карт для запоминания
    setTimeout(() => {
        gameEl.querySelectorAll('.game__card').forEach((cardEl) => {
            cardEl.querySelector('.game__card-front').style.display = 'block';
            cardEl.querySelector('.game__card-back').style.display = 'none';
        });
        // Включение нажатий
        canClick = true;
        timerStop = timer(0, 0, false, timerEl);
    }, 5000);

    timer(0, 5, true, timerEl);

    document
        .querySelector('.game__restart-button')
        .addEventListener('click', () => {
            goToPage(START_PAGE);
            timerStop();
        });

    // Обработка кликов по карточкам
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
                    if (
                        firstCard.dataset.suit === secondCard.dataset.suit &&
                        firstCard.dataset.rank === secondCard.dataset.rank
                    ) {
                        foundPairs++;
                        if (foundPairs === difficulty * 3) {
                            timerStop();
                            setTime({ newTime: timerEl.textContent });
                            goToPage(VICTORY_PAGE);
                        }
                    } else {
                        timerStop();
                        setTime({ newTime: timerEl.textContent });
                        goToPage(DEFEAT_PAGE);
                        foundPairs = 0;
                    }

                    firstCard = null;
                    secondCard = null;
                }, 300);
            }
        });
}
