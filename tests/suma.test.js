const sum = require('../lib/suma');

// Suite de Pruebas para la función 'sum'
describe('Función de Suma', () => {

  test('Prueba de suma positiva: 2 + 3 debe ser 5', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('Prueba de suma con cero: 10 + 0 debe ser 10', () => {
    expect(sum(10, 0)).toBe(10);
  });

  test('Prueba de suma con negativos: -5 + 10 debe ser 5', () => {
    expect(sum(-5, 10)).toBe(5);
  });

});