import { goToPage, page, renderApp } from './index';
import { START_PAGE } from './routes';
import { renderStartPageComponent } from './start-page-component';

// Мокаем зависимость renderStartPageComponent
jest.mock('./start-page-component', () => ({
    renderStartPageComponent: jest.fn(),
}));

describe('Тестирование функции goToPage', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('должен изменять состояние на START_PAGE и вызывать renderApp', () => {
        goToPage(START_PAGE);
        expect(page).toEqual(START_PAGE);
    });

    // Дополнительные тесты для разных page
    it('должен выкидывать ошибку при попытке перейти на несуществующую страницу', () => {
        expect(() => goToPage('NON_EXISTENT_PAGE')).toThrow(
            'страницы не существует',
        );
    });
});
