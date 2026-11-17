import { getLevel } from '../user.js';
import fetchData from '../http.js';

// Автоматически создаем мок для модуля http.js
jest.mock('../http.js');

test('should return level when status is ok', () => {
  // Настраиваем мок, чтобы fetchData возвращала успешный объект
  fetchData.mockReturnValue({ status: 'ok', level: 4 });

  const result = getLevel(1);

  // Проверяем результат
  expect(result).toBe('Ваш текущий уровень: 4');
  // Проверяем, что функция fetchData вызывалась с правильным URL
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('should return error message when status is not ok', () => {
  // Настраиваем мок для неуспешного ответа
  fetchData.mockReturnValue({ status: 'error' });

  const result = getLevel(2);

  expect(result).toBe('Информация об уровне временно недоступна');
  expect(fetchData).toBeCalledWith('https://server/user/2');
});

test('should return error message when response is null or undefined', () => {
  // Настраиваем мок для ситуации, когда сервер вернул null
  fetchData.mockReturnValue(null);

  const result = getLevel(3);

  expect(result).toBe('Информация об уровне временно недоступна');
  expect(fetchData).toBeCalledWith('https://server/user/3');
});