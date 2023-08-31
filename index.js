import { renderDefeatPageComponent } from './defeat-page-component.js';
import { renderGamePageComponent } from './game-page-component.js';
import { START_PAGE, GAME_PAGE, VICTORY_PAGE, DEFEAT_PAGE } from './routes.js';
import { renderStartPageComponent } from './start-page-component.js';
import { renderVictoryPageComponent } from './victory-page-component.js';

export let page = null;

export let difficulty = '';
let time = '';

export const setDifficulty = (newDifficulty) => {
    difficulty = newDifficulty;
};

export const setTime = ({ newTime }) => {
    time = newTime;
};

export const goToPage = (newPage) => {
    if ([START_PAGE, GAME_PAGE, VICTORY_PAGE, DEFEAT_PAGE].includes(newPage)) {
        if (newPage === START_PAGE) {
            page = START_PAGE;
            return renderApp();
        }

        if (newPage === GAME_PAGE) {
            page = GAME_PAGE;
            return renderApp();
        }

        if (newPage === VICTORY_PAGE) {
            page = VICTORY_PAGE;
            return renderApp();
        }

        if (newPage === DEFEAT_PAGE) {
            page = DEFEAT_PAGE;
            return renderApp();
        }
    }

    throw new Error('страницы не существует');
};

export const renderApp = () => {
    const appEl = document.getElementById('app');
    if (page === START_PAGE) {
        renderStartPageComponent({ appEl: appEl });
    }

    if (page === GAME_PAGE) {
        renderGamePageComponent({ appEl: appEl, difficulty: difficulty });
    }

    if (page === VICTORY_PAGE) {
        renderVictoryPageComponent({
            appEl: appEl,
            time: time,
        });
    }

    if (page === DEFEAT_PAGE) {
        renderDefeatPageComponent({
            appEl: appEl,
            time: time,
        });
    }
};
goToPage(START_PAGE);
