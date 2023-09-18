const suits = ['крести', 'бубны', 'черви', 'пики'];
const ranks = ['6', '7', '8', '9', '10', 'валет', 'дама', 'король', 'туз'];

// 1. Функция генерации структуры данных с картами
export function generateCards(difficulty) {
    const pairCount = difficulty * 3;
    const cards = [];
    for (let i = 0; i < pairCount; i++) {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        const card = { suit, rank };
        // Добавляем две одинаковые карты, чтобы сформировать пары
        cards.push(card);
        cards.push({ ...card });
    }

    return cards;
}

// 2. Функция перетасовки карт
export function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}
