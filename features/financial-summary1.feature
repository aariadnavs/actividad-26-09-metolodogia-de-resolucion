Feature: Resumen financiero
  Para saber mis finanzas
  Como usuario
  Quiero calcular el balance entre ingresos y gastos

  Scenario: Calcular balance positivo
    Given que tengo un ingreso de 1000
    And un gasto de 400
    When calculo el balance
    Then el resultado debe ser 600
