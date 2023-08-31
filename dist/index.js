/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
    // webpackBootstrap
    /******/ 'use strict';
    /******/ var __webpack_modules__ = {
        /***/ './defeat-page-component.js':
            /*!**********************************!*\
  !*** ./defeat-page-component.js ***!
  \**********************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderDefeatPageComponent: () => (/* binding */ renderDefeatPageComponent)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./index.js");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes.js */ "./routes.js");\n\n\n\nfunction renderDefeatPageComponent({ appEl, time }) {\n    appEl.innerHTML = `<div class="container">\n      <div class="defeat-form">\n      <img src="images/dead.png">\n        <div class="defeat-form__header">\n          Вы проиграли!\n        </div>\n        <div class="defeat-form__time">\n          <div class="defeat-form__time-text">\n            Затраченное время:\n          </div>\n          <div class="defeat-form__time-value">\n             ${time}\n          </div>\n        </div>\n        <button class="defeat-form__restart-button">Играть снова</button>\n      </div>\n    </div>`;\n\n    document\n        .querySelector(\'.defeat-form__restart-button\')\n        .addEventListener(\'click\', () => {\n            (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.START_PAGE);\n        });\n}\n\n\n//# sourceURL=webpack://cardgame/./defeat-page-component.js?',
                );

                /***/
            },

        /***/ './game-logics.js':
            /*!************************!*\
  !*** ./game-logics.js ***!
  \************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateCards: () => (/* binding */ generateCards),\n/* harmony export */   shuffleCards: () => (/* binding */ shuffleCards)\n/* harmony export */ });\nconst suits = ['крести', 'бубны', 'черви', 'пики'];\nconst ranks = ['6', '7', '8', '9', '10', 'валет', 'дама', 'король', 'туз'];\n\n// 1. Функция генерации структуры данных с картами\nfunction generateCards(difficulty) {\n    const pairCount = difficulty * 3;\n    const cards = [];\n    for (let i = 0; i < pairCount; i++) {\n        const suit = suits[Math.floor(Math.random() * suits.length)];\n        const rank = ranks[Math.floor(Math.random() * ranks.length)];\n        const card = { suit, rank };\n        // Добавляем две одинаковые карты, чтобы сформировать пары\n        cards.push(card);\n        cards.push({ ...card });\n    }\n\n    return cards;\n}\n\n// 2. Функция перетасовки карт\nfunction shuffleCards(cards) {\n    for (let i = cards.length - 1; i > 0; i--) {\n        const j = Math.floor(Math.random() * (i + 1));\n        [cards[i], cards[j]] = [cards[j], cards[i]];\n    }\n    return cards;\n}\n\n\n//# sourceURL=webpack://cardgame/./game-logics.js?",
                );

                /***/
            },

        /***/ './game-page-component.js':
            /*!********************************!*\
  !*** ./game-page-component.js ***!
  \********************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGamePageComponent: () => (/* binding */ renderGamePageComponent)\n/* harmony export */ });\n/* harmony import */ var _game_logics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-logics.js */ \"./game-logics.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./index.js\");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes.js */ \"./routes.js\");\n\n\n\n\nfunction timer(minutes, seconds, countdown, timerEl) {\n    function formatTime(num) {\n        return num < 10 ? '0' + num : num.toString();\n    }\n\n    function updateTimer() {\n        timerEl.innerHTML = `${formatTime(minutes)}.${formatTime(seconds)}`;\n    }\n\n    function tick() {\n        if (countdown) {\n            if (seconds === 0 && minutes > 0) {\n                minutes--;\n                seconds = 59;\n            } else {\n                seconds--;\n            }\n        } else {\n            if (seconds < 59) {\n                seconds++;\n            } else {\n                minutes++;\n                seconds = 0;\n            }\n        }\n\n        updateTimer();\n\n        if (countdown && minutes === 0 && seconds === 0) {\n            clearInterval(intervalId);\n        }\n    }\n\n    updateTimer();\n    const intervalId = setInterval(tick, 1000);\n    return () => clearInterval(intervalId);\n}\n\nfunction renderGamePageComponent({ appEl, difficulty }) {\n    let timerStop;\n    function renderCards(cards, gameEl) {\n        const cardsHTML = cards\n            .map(\n                (card) => `\n    <div class=\"game__card\" data-suit=\"${card.suit}\" data-rank=\"${card.rank}\">\n    <img src=\"images/shirt.jpg\" alt=\"Футболка\" class=\"game__card-front\">\n    <img src=\"images/${card.rank} ${card.suit}.jpg\" alt=\"Обратная сторона карточки\" class=\"game__card-back\">\n    </div>`,\n            )\n            .join('');\n\n        gameEl.querySelector('.game__cards').innerHTML = cardsHTML;\n    }\n\n    // Разметка таймера и кнопки\n    appEl.innerHTML = `\n    <div class=\"game \">\n    <div class=\"game__header\">\n        <div class=\"game__timer\">\n        <div class=\"game__timer-labels\">\n            <div class=\"game__timer-label\">мин</div>\n            <div class=\"game__timer-label\">сек</div>\n        </div>\n        <div class=\"game__timer-value\">00.00</div>\n        </div>\n        <button class=\"game__restart-button\">Начать заново</button>\n    </div>\n    <div class=\"game__cards\">\n    </div>\n    </div>`;\n    const timerEl = document.querySelector('.game__timer-value');\n\n    // Обнуление карт для перетосовки\n    let firstCard = null;\n    let secondCard = null;\n    let foundPairs = 0;\n    const gameEl = document.querySelector('.game');\n    // Отключение нажатий\n    let canClick = false;\n\n    // Изменение стиля разметки под 2-й уровень\n    if (difficulty === '2') {\n        document.querySelector('.game__cards').style.width = '750px';\n    }\n\n    // Перетосовка карт\n    const shuffledCards = (0,_game_logics_js__WEBPACK_IMPORTED_MODULE_0__.shuffleCards)((0,_game_logics_js__WEBPACK_IMPORTED_MODULE_0__.generateCards)(difficulty));\n\n    // Отрисовка перетосованных карт\n    renderCards(shuffledCards, gameEl);\n\n    // Показ карт для запоминания\n    setTimeout(() => {\n        gameEl.querySelectorAll('.game__card').forEach((cardEl) => {\n            cardEl.querySelector('.game__card-front').style.display = 'block';\n            cardEl.querySelector('.game__card-back').style.display = 'none';\n        });\n        // Включение нажатий\n        canClick = true;\n        timerStop = timer(0, 0, false, timerEl);\n    }, 5000);\n\n    timer(0, 5, true, timerEl);\n\n    document\n        .querySelector('.game__restart-button')\n        .addEventListener('click', () => {\n            (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_2__.START_PAGE);\n            timerStop();\n        });\n\n    // Обработка кликов по карточкам\n    document\n        .querySelector('.game__cards')\n        .addEventListener('click', (event) => {\n            if (!canClick) {\n                return;\n            }\n\n            const cardEl = event.target.closest('.game__card');\n\n            if (\n                !cardEl ||\n                cardEl.querySelector('.game__card-front').style.display ===\n                    'none' ||\n                firstCard === cardEl ||\n                secondCard === cardEl\n            ) {\n                return;\n            }\n\n            cardEl.querySelector('.game__card-front').style.display = 'none';\n            cardEl.querySelector('.game__card-back').style.display = 'block';\n\n            if (!firstCard) {\n                firstCard = cardEl;\n            } else if (!secondCard) {\n                secondCard = cardEl;\n                setTimeout(() => {\n                    if (\n                        firstCard.dataset.suit === secondCard.dataset.suit &&\n                        firstCard.dataset.rank === secondCard.dataset.rank\n                    ) {\n                        foundPairs++;\n                        if (foundPairs === difficulty * 3) {\n                            timerStop();\n                            (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.setTime)({ newTime: timerEl.textContent });\n                            (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_2__.VICTORY_PAGE);\n                        }\n                    } else {\n                        timerStop();\n                        (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.setTime)({ newTime: timerEl.textContent });\n                        (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_2__.DEFEAT_PAGE);\n                        foundPairs = 0;\n                    }\n\n                    firstCard = null;\n                    secondCard = null;\n                }, 300);\n            }\n        });\n}\n\n\n//# sourceURL=webpack://cardgame/./game-page-component.js?",
                );

                /***/
            },

        /***/ './index.js':
            /*!******************!*\
  !*** ./index.js ***!
  \******************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   difficulty: () => (/* binding */ difficulty),\n/* harmony export */   goToPage: () => (/* binding */ goToPage),\n/* harmony export */   page: () => (/* binding */ page),\n/* harmony export */   renderApp: () => (/* binding */ renderApp),\n/* harmony export */   setDifficulty: () => (/* binding */ setDifficulty),\n/* harmony export */   setTime: () => (/* binding */ setTime)\n/* harmony export */ });\n/* harmony import */ var _defeat_page_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defeat-page-component.js */ "./defeat-page-component.js");\n/* harmony import */ var _game_page_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-page-component.js */ "./game-page-component.js");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes.js */ "./routes.js");\n/* harmony import */ var _start_page_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-page-component.js */ "./start-page-component.js");\n/* harmony import */ var _victory_page_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./victory-page-component.js */ "./victory-page-component.js");\n\n\n\n\n\n\nlet page = null;\n\nlet difficulty = \'\';\nlet time = \'\';\n\nconst setDifficulty = (newDifficulty) => {\n    difficulty = newDifficulty;\n};\n\nconst setTime = ({ newTime }) => {\n    time = newTime;\n};\n\nconst goToPage = (newPage) => {\n    if ([_routes_js__WEBPACK_IMPORTED_MODULE_2__.START_PAGE, _routes_js__WEBPACK_IMPORTED_MODULE_2__.GAME_PAGE, _routes_js__WEBPACK_IMPORTED_MODULE_2__.VICTORY_PAGE, _routes_js__WEBPACK_IMPORTED_MODULE_2__.DEFEAT_PAGE].includes(newPage)) {\n        if (newPage === _routes_js__WEBPACK_IMPORTED_MODULE_2__.START_PAGE) {\n            page = _routes_js__WEBPACK_IMPORTED_MODULE_2__.START_PAGE;\n            return renderApp();\n        }\n\n        if (newPage === _routes_js__WEBPACK_IMPORTED_MODULE_2__.GAME_PAGE) {\n            page = _routes_js__WEBPACK_IMPORTED_MODULE_2__.GAME_PAGE;\n            return renderApp();\n        }\n\n        if (newPage === _routes_js__WEBPACK_IMPORTED_MODULE_2__.VICTORY_PAGE) {\n            page = _routes_js__WEBPACK_IMPORTED_MODULE_2__.VICTORY_PAGE;\n            return renderApp();\n        }\n\n        if (newPage === _routes_js__WEBPACK_IMPORTED_MODULE_2__.DEFEAT_PAGE) {\n            page = _routes_js__WEBPACK_IMPORTED_MODULE_2__.DEFEAT_PAGE;\n            return renderApp();\n        }\n    }\n\n    throw new Error(\'страницы не существует\');\n};\n\nconst renderApp = () => {\n    const appEl = document.getElementById(\'app\');\n    if (page === _routes_js__WEBPACK_IMPORTED_MODULE_2__.START_PAGE) {\n        (0,_start_page_component_js__WEBPACK_IMPORTED_MODULE_3__.renderStartPageComponent)({ appEl: appEl });\n    }\n\n    if (page === _routes_js__WEBPACK_IMPORTED_MODULE_2__.GAME_PAGE) {\n        (0,_game_page_component_js__WEBPACK_IMPORTED_MODULE_1__.renderGamePageComponent)({ appEl: appEl, difficulty: difficulty });\n    }\n\n    if (page === _routes_js__WEBPACK_IMPORTED_MODULE_2__.VICTORY_PAGE) {\n        (0,_victory_page_component_js__WEBPACK_IMPORTED_MODULE_4__.renderVictoryPageComponent)({\n            appEl: appEl,\n            time: time,\n        });\n    }\n\n    if (page === _routes_js__WEBPACK_IMPORTED_MODULE_2__.DEFEAT_PAGE) {\n        (0,_defeat_page_component_js__WEBPACK_IMPORTED_MODULE_0__.renderDefeatPageComponent)({\n            appEl: appEl,\n            time: time,\n        });\n    }\n};\ngoToPage(_routes_js__WEBPACK_IMPORTED_MODULE_2__.START_PAGE);\n\n\n//# sourceURL=webpack://cardgame/./index.js?',
                );

                /***/
            },

        /***/ './routes.js':
            /*!*******************!*\
  !*** ./routes.js ***!
  \*******************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DEFEAT_PAGE: () => (/* binding */ DEFEAT_PAGE),\n/* harmony export */   GAME_PAGE: () => (/* binding */ GAME_PAGE),\n/* harmony export */   START_PAGE: () => (/* binding */ START_PAGE),\n/* harmony export */   VICTORY_PAGE: () => (/* binding */ VICTORY_PAGE)\n/* harmony export */ });\n// Файл со списком страниц приложения\nconst START_PAGE = 'start';\nconst GAME_PAGE = 'game';\nconst VICTORY_PAGE = 'victory';\nconst DEFEAT_PAGE = 'defeat';\n\n\n//# sourceURL=webpack://cardgame/./routes.js?",
                );

                /***/
            },

        /***/ './start-page-component.js':
            /*!*********************************!*\
  !*** ./start-page-component.js ***!
  \*********************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderStartPageComponent: () => (/* binding */ renderStartPageComponent)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./index.js");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes.js */ "./routes.js");\n\n\n\nfunction renderStartPageComponent({ appEl }) {\n    appEl.innerHTML = `\n               <div class="container">\n      <div class="selection-form">\n        <div class="selection-form__header">\n          Выбери <br /> сложность\n        </div>\n        <div class="selection-form__card-container">\n          <input type="radio" id="card1" name="cards" value="1" checked>\n          <label for="card1">1</label>\n          \n          <input type="radio" id="card2" name="cards" value="2">\n          <label for="card2">2</label>\n          \n          <input type="radio" id="card3" name="cards" value="3">\n          <label for="card3">3</label>\n        </div>\n        <button class="selection-form__start-button">Старт</button>\n      </div>\n    </div>`;\n\n    const getSelectedDifficulty = () => {\n        const radioButtons = document.querySelectorAll(\n            ".selection-form__card-container input[type=\'radio\']",\n        );\n        let selectedDifficulty = \'easy\';\n        radioButtons.forEach((radio) => {\n            if (radio.checked) {\n                selectedDifficulty = radio.value;\n            }\n        });\n\n        return selectedDifficulty;\n    };\n\n    const selectionFormStartButton = document.querySelector(\n        \'.selection-form__start-button\',\n    );\n\n    selectionFormStartButton.addEventListener(\'click\', (event) => {\n        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.setDifficulty)(getSelectedDifficulty());\n        (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.GAME_PAGE);\n        event.stopPropagation();\n    });\n}\n\n\n//# sourceURL=webpack://cardgame/./start-page-component.js?',
                );

                /***/
            },

        /***/ './victory-page-component.js':
            /*!***********************************!*\
  !*** ./victory-page-component.js ***!
  \***********************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__,
            ) => {
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderVictoryPageComponent: () => (/* binding */ renderVictoryPageComponent)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./index.js");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes.js */ "./routes.js");\n\n\n\nfunction renderVictoryPageComponent({ appEl, time }) {\n    appEl.innerHTML = `<div class="container">\n      <div class="victory-form">\n      <img src="images/celebration.png">\n        <div class="victory-form__header">\n          Вы выиграли!\n        </div>\n        <div class="victory-form__time">\n          <div class="victory-form__time-text">\n            Затраченное время:\n          </div>\n          <div class="victory-form__time-value">\n             ${time}\n          </div>\n        </div>\n        <button class="victory-form__restart-button">Играть снова</button>\n      </div>\n    </div>`;\n\n    document\n        .querySelector(\'.victory-form__restart-button\')\n        .addEventListener(\'click\', () => {\n            (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.goToPage)(_routes_js__WEBPACK_IMPORTED_MODULE_1__.START_PAGE);\n        });\n}\n\n\n//# sourceURL=webpack://cardgame/./victory-page-component.js?',
                );

                /***/
            },

        /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {},
            /******/
        });
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](
            module,
            module.exports,
            __webpack_require__,
        );
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
            /******/ for (var key in definition) {
                /******/ if (
                    __webpack_require__.o(definition, key) &&
                    !__webpack_require__.o(exports, key)
                ) {
                    /******/ Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key],
                    });
                    /******/
                }
                /******/
            }
            /******/
        };
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
        /******/ __webpack_require__.o = (obj, prop) =>
            Object.prototype.hasOwnProperty.call(obj, prop);
        /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = (exports) => {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module',
                });
                /******/
            }
            /******/ Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            /******/
        };
        /******/
    })();
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module is referenced by other modules so it can't be inlined
    /******/ var __webpack_exports__ = __webpack_require__('./index.js');
    /******/
    /******/
})();
