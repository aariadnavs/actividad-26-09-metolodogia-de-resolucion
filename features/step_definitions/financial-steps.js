const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { calcularResumenFinanciero } = require('../../src/financialSummary');

let ingresos, gastos, resultado;

Given('que tengo un ingreso de {int}', function (valor) {
  ingresos = valor;
});

Given('un gasto de {int}', function (valor) {
  gastos = valor;
});

When('calculo el balance', function () {
  resultado = calcularResumenFinanciero(ingresos, gastos);
});

Then('el resultado debe ser {int}', function (valorEsperado) {
  expect(resultado).to.equal(valorEsperado);
});
