/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./defeat-page-component.ts":
/*!**********************************!*\
  !*** ./defeat-page-component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderDefeatPageComponent = void 0;
var index_1 = __webpack_require__(/*! ./index */ "./index.ts");
var routes_1 = __webpack_require__(/*! ./routes */ "./routes.ts");
function renderDefeatPageComponent(_a) {
    var appEl = _a.appEl, time = _a.time;
    // Создаем элемент `div` с классом `overlay`
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // Вставляем разметку страницы победы в элемент `overlay`
    overlay.innerHTML = "<div class=\"container\">\n      <div class=\"defeat-form\">\n      <img src=\"static/dead.png\">\n        <div class=\"defeat-form__header\">\n          \u0412\u044B \u043F\u0440\u043E\u0438\u0433\u0440\u0430\u043B\u0438!\n        </div>\n        <div class=\"defeat-form__time\">\n          <div class=\"defeat-form__time-text\">\n            \u0417\u0430\u0442\u0440\u0430\u0447\u0435\u043D\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:\n          </div>\n          <div class=\"defeat-form__time-value\">\n             ".concat(time, "\n          </div>\n        </div>\n        <button class=\"defeat-form__restart-button\">\u0418\u0433\u0440\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430</button>\n      </div>\n    </div>");
    // Добавляем `overlay` в элемент приложения `appEl`
    appEl.appendChild(overlay);
    // Удаляем `overlay` при нажатии на кнопку "Играть снова"
    overlay
        .querySelector('.defeat-form__restart-button')
        .addEventListener('click', function () {
        overlay.style.backgroundColor = '';
        appEl.removeChild(overlay);
        (0, index_1.goToPage)(routes_1.START_PAGE);
    });
}
exports.renderDefeatPageComponent = renderDefeatPageComponent;


/***/ }),

/***/ "./game-logics.ts":
/*!************************!*\
  !*** ./game-logics.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shuffleCards = exports.generateCards = void 0;
var suits = ['крести', 'бубны', 'черви', 'пики'];
var ranks = ['6', '7', '8', '9', '10', 'валет', 'дама', 'король', 'туз'];
// 1. Функция генерации структуры данных с картами
function generateCards(difficulty) {
    var pairCount = difficulty * 3;
    var cards = [];
    for (var i = 0; i < pairCount; i++) {
        var suit = suits[Math.floor(Math.random() * suits.length)];
        var rank = ranks[Math.floor(Math.random() * ranks.length)];
        var card = { suit: suit, rank: rank };
        // Добавляем две одинаковые карты, чтобы сформировать пары
        cards.push(card);
        cards.push(__assign({}, card));
    }
    return cards;
}
exports.generateCards = generateCards;
// 2. Функция перетасовки карт
function shuffleCards(cards) {
    var _a;
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [cards[j], cards[i]], cards[i] = _a[0], cards[j] = _a[1];
    }
    return cards;
}
exports.shuffleCards = shuffleCards;


/***/ }),

/***/ "./game-page-component.ts":
/*!********************************!*\
  !*** ./game-page-component.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderGamePageComponent = void 0;
var game_logics_1 = __webpack_require__(/*! ./game-logics */ "./game-logics.ts");
var index_1 = __webpack_require__(/*! ./index */ "./index.ts");
var routes_1 = __webpack_require__(/*! ./routes */ "./routes.ts");
function timer(minutes, seconds, countdown, timerEl) {
    function formatTime(num) {
        return num < 10 ? '0' + num : num.toString();
    }
    function updateTimer() {
        timerEl.innerHTML = "".concat(formatTime(minutes), ".").concat(formatTime(seconds));
    }
    function tick() {
        if (countdown) {
            if (seconds === 0 && minutes > 0) {
                minutes--;
                seconds = 59;
            }
            else {
                seconds--;
            }
        }
        else {
            if (seconds < 59) {
                seconds++;
            }
            else {
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
    var intervalId = setInterval(tick, 1000);
    return function () { return clearInterval(intervalId); };
}
function renderGamePageComponent(_a) {
    var appEl = _a.appEl, difficulty = _a.difficulty;
    var timerStop;
    function renderCards(cards, gameEl) {
        var cardsHTML = cards
            .map(function (card) { return "\n    <div class=\"game__card\" data-suit=\"".concat(card.suit, "\" data-rank=\"").concat(card.rank, "\">\n    <img src=\"static/shirt.jpg\" alt=\"\u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0430\" class=\"game__card-front\">\n    <img src=\"static/").concat(card.rank, " ").concat(card.suit, ".jpg\" alt=\"\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438\" class=\"game__card-back\">\n    </div>"); })
            .join('');
        gameEl.querySelector('.game__cards').innerHTML = cardsHTML;
    }
    // Разметка таймера и кнопки
    appEl.innerHTML = "\n    <div class=\"game \">\n    <div class=\"game__header\">\n        <div class=\"game__timer\">\n        <div class=\"game__timer-labels\">\n            <div class=\"game__timer-label\">\u043C\u0438\u043D</div>\n            <div class=\"game__timer-label\">\u0441\u0435\u043A</div>\n        </div>\n        <div class=\"game__timer-value\">00.00</div>\n        </div>\n        <button class=\"game__restart-button\">\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E</button>\n    </div>\n    <div class=\"game__cards\">\n    </div>\n    </div>";
    var timerEl = document.querySelector('.game__timer-value');
    // Обнуление карт для перетосовки
    var firstCard = null;
    var secondCard = null;
    var foundPairs = 0;
    var gameEl = document.querySelector('.game');
    // Отключение нажатий
    var canClick = false;
    // Изменение стиля разметки под 2-й уровень
    if (difficulty === 2) {
        var gameCardsElement = document.querySelector('.game__cards');
        gameCardsElement.style.width = '750px';
    }
    // Перетосовка карт
    var shuffledCards = (0, game_logics_1.shuffleCards)((0, game_logics_1.generateCards)(difficulty));
    // Отрисовка перетосованных карт
    renderCards(shuffledCards, gameEl);
    // Показ карт для запоминания
    setTimeout(function () {
        gameEl.querySelectorAll('.game__card').forEach(function (cardEl) {
            var front = cardEl.querySelector('.game__card-front');
            var back = cardEl.querySelector('.game__card-back');
            front.style.display = 'block';
            back.style.display = 'none';
        });
        // Включение нажатий
        canClick = true;
        timerStop = timer(0, 0, false, timerEl);
    }, 5000);
    timer(0, 5, true, timerEl);
    document
        .querySelector('.game__restart-button')
        .addEventListener('click', function () {
        (0, index_1.goToPage)(routes_1.START_PAGE);
        timerStop();
    });
    // Обработка кликов по карточкам
    document
        .querySelector('.game__cards')
        .addEventListener('click', function (event) {
        // Замените стрелочную функцию на обычную
        if (!canClick) {
            return;
        }
        // Указать тип event.target как HTMLElement
        var target = event.target;
        var cardEl = target.closest('.game__card');
        if (!cardEl ||
            cardEl.querySelector('.game__card-front').style
                .display === 'none' ||
            firstCard === cardEl ||
            secondCard === cardEl) {
            return;
        }
        cardEl.querySelector('.game__card-front').style.display = 'none';
        cardEl.querySelector('.game__card-back').style.display = 'block';
        if (!firstCard) {
            firstCard = cardEl;
        }
        else if (!secondCard) {
            secondCard = cardEl;
            setTimeout(function () {
                if (firstCard.dataset.suit === secondCard.dataset.suit &&
                    firstCard.dataset.rank === secondCard.dataset.rank) {
                    foundPairs++;
                    if (foundPairs === difficulty * 3) {
                        timerStop();
                        (0, index_1.setTime)({ newTime: Number(timerEl.textContent) });
                        (0, index_1.goToPage)(routes_1.VICTORY_PAGE);
                    }
                }
                else {
                    timerStop();
                    (0, index_1.setTime)({ newTime: Number(timerEl.textContent) });
                    (0, index_1.goToPage)(routes_1.DEFEAT_PAGE);
                    foundPairs = 0;
                }
                firstCard = null;
                secondCard = null;
            }, 300);
        }
    });
}
exports.renderGamePageComponent = renderGamePageComponent;


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderApp = exports.goToPage = exports.setTime = exports.setDifficulty = exports.difficulty = exports.page = void 0;
var defeat_page_component_1 = __webpack_require__(/*! ./defeat-page-component */ "./defeat-page-component.ts");
var game_page_component_1 = __webpack_require__(/*! ./game-page-component */ "./game-page-component.ts");
var routes_1 = __webpack_require__(/*! ./routes */ "./routes.ts");
var start_page_component_1 = __webpack_require__(/*! ./start-page-component */ "./start-page-component.ts");
var victory_page_component_1 = __webpack_require__(/*! ./victory-page-component */ "./victory-page-component.ts");
exports.page = null;
exports.difficulty = 0;
var time = 0;
function setDifficulty(_a) {
    var newDifficulty = _a.newDifficulty;
    var difficulty = newDifficulty;
}
exports.setDifficulty = setDifficulty;
var setTime = function (_a) {
    var newTime = _a.newTime;
    var time = newTime;
};
exports.setTime = setTime;
var goToPage = function (newPage) {
    if ([routes_1.START_PAGE, routes_1.GAME_PAGE, routes_1.VICTORY_PAGE, routes_1.DEFEAT_PAGE].includes(newPage)) {
        if (newPage === routes_1.START_PAGE) {
            exports.page = routes_1.START_PAGE;
            return (0, exports.renderApp)();
        }
        if (newPage === routes_1.GAME_PAGE) {
            exports.page = routes_1.GAME_PAGE;
            return (0, exports.renderApp)();
        }
        if (newPage === routes_1.VICTORY_PAGE) {
            exports.page = routes_1.VICTORY_PAGE;
            return (0, exports.renderApp)();
        }
        if (newPage === routes_1.DEFEAT_PAGE) {
            exports.page = routes_1.DEFEAT_PAGE;
            return (0, exports.renderApp)();
        }
    }
    throw new Error('страницы не существует');
};
exports.goToPage = goToPage;
var renderApp = function () {
    var appEl = document.getElementById('app');
    if (exports.page === routes_1.START_PAGE) {
        (0, start_page_component_1.renderStartPageComponent)({ appEl: appEl });
    }
    if (exports.page === routes_1.GAME_PAGE) {
        (0, game_page_component_1.renderGamePageComponent)({ appEl: appEl, difficulty: exports.difficulty });
    }
    if (exports.page === routes_1.VICTORY_PAGE) {
        (0, victory_page_component_1.renderVictoryPageComponent)({
            appEl: appEl,
            time: time,
        });
    }
    if (exports.page === routes_1.DEFEAT_PAGE) {
        (0, defeat_page_component_1.renderDefeatPageComponent)({
            appEl: appEl,
            time: time,
        });
    }
};
exports.renderApp = renderApp;
(0, exports.goToPage)(routes_1.START_PAGE);


/***/ }),

/***/ "./routes.ts":
/*!*******************!*\
  !*** ./routes.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFEAT_PAGE = exports.VICTORY_PAGE = exports.GAME_PAGE = exports.START_PAGE = void 0;
// Файл со списком страниц приложения
exports.START_PAGE = 'start';
exports.GAME_PAGE = 'game';
exports.VICTORY_PAGE = 'victory';
exports.DEFEAT_PAGE = 'defeat';


/***/ }),

/***/ "./start-page-component.ts":
/*!*********************************!*\
  !*** ./start-page-component.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderStartPageComponent = void 0;
var index_1 = __webpack_require__(/*! ./index */ "./index.ts");
var routes_1 = __webpack_require__(/*! ./routes */ "./routes.ts");
function renderStartPageComponent(_a) {
    var appEl = _a.appEl;
    appEl.innerHTML = "\n               <div class=\"container\">\n      <div class=\"selection-form\">\n        <div class=\"selection-form__header\">\n          \u0412\u044B\u0431\u0435\u0440\u0438 <br /> \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u044C\n        </div>\n        <div class=\"selection-form__card-container\">\n          <input type=\"radio\" id=\"card1\" name=\"cards\" value=\"1\" checked>\n          <label for=\"card1\">1</label>\n          \n          <input type=\"radio\" id=\"card2\" name=\"cards\" value=\"2\">\n          <label for=\"card2\">2</label>\n          \n          <input type=\"radio\" id=\"card3\" name=\"cards\" value=\"3\">\n          <label for=\"card3\">3</label>\n        </div>\n        <button class=\"selection-form__start-button\">\u0421\u0442\u0430\u0440\u0442</button>\n      </div>\n    </div>";
    var getSelectedDifficulty = function () {
        var radioButtons = document.querySelectorAll(".selection-form__card-container input[type='radio']");
        var selectedDifficulty = 0;
        radioButtons.forEach(function (radio) {
            var inputRadio = radio;
            if (inputRadio.checked) {
                selectedDifficulty = Number(inputRadio.value);
            }
        });
        return selectedDifficulty;
    };
    var selectionFormStartButton = document.querySelector('.selection-form__start-button');
    selectionFormStartButton.addEventListener('click', function (event) {
        (0, index_1.setDifficulty)({ newDifficulty: getSelectedDifficulty() });
        (0, index_1.goToPage)(routes_1.GAME_PAGE);
        event.stopPropagation();
    });
}
exports.renderStartPageComponent = renderStartPageComponent;


/***/ }),

/***/ "./victory-page-component.ts":
/*!***********************************!*\
  !*** ./victory-page-component.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.renderVictoryPageComponent = void 0;
var index_1 = __webpack_require__(/*! ./index */ "./index.ts");
var routes_1 = __webpack_require__(/*! ./routes */ "./routes.ts");
function renderVictoryPageComponent(_a) {
    var appEl = _a.appEl, time = _a.time;
    // Создаем элемент `div` с классом `overlay`
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // Вставляем разметку страницы победы в элемент `overlay`
    overlay.innerHTML = "<div class=\"container\">\n      <div class=\"victory-form\">\n      <img src=\"static/celebration.png\">\n        <div class=\"victory-form__header\">\n          \u0412\u044B \u0432\u044B\u0438\u0433\u0440\u0430\u043B\u0438!\n        </div>\n        <div class=\"victory-form__time\">\n          <div class=\"victory-form__time-text\">\n            \u0417\u0430\u0442\u0440\u0430\u0447\u0435\u043D\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:\n          </div>\n          <div class=\"victory-form__time-value\">\n             ".concat(time, "\n          </div>\n        </div>\n        <button class=\"victory-form__restart-button\">\u0418\u0433\u0440\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430</button>\n      </div>\n    </div>");
    // Добавляем `overlay` в элемент приложения `appEl`
    appEl.appendChild(overlay);
    // Удаляем `overlay` при нажатии на кнопку "Играть снова"
    overlay
        .querySelector('.victory-form__restart-button')
        .addEventListener('click', function () {
        overlay.style.backgroundColor = '';
        appEl.removeChild(overlay);
        (0, index_1.goToPage)(routes_1.START_PAGE);
    });
}
exports.renderVictoryPageComponent = renderVictoryPageComponent;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map