/**
 * Módulo de Calculadores
 *
 * Este módulo contiene funciones para realizar cálculos matemáticos
 * sobre las transacciones. Cada función tiene una responsabilidad específica.
 *
 * @author Estudiante UPC
 * @version 1.0.0
 */

/**
 * Calcula el total de ingresos
 * @param {Array} transactions - Array de transacciones
 * @returns {number} - Total de ingresos
 */
function calcularTotalIngresos(transactions) {
  return transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
}

/**
 * Calcula el total de gastos
 * @param {Array} transactions - Array de transacciones
 * @returns {number} - Total de gastos
 */
function calcularTotalGastos(transactions) {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
}

/**
 * Calcula el balance total (ingresos - gastos)
 * @param {Array} transactions - Array de transacciones
 * @returns {number} - Balance total
 */
function calcularBalance(transactions) {
  const ingresos = calcularTotalIngresos(transactions);
  const gastos = calcularTotalGastos(transactions);
  return ingresos - gastos;
}

/**
 * Cuenta el número total de transacciones
 * @param {Array} transactions - Array de transacciones
 * @returns {number} - Número total de transacciones
 */
function contarTransacciones(transactions) {
  return transactions.length;
}

/**
 * Cuenta las transacciones de un tipo específico
 * @param {Array} transactions - Array de transacciones
 * @param {string} tipo - Tipo de transacción ('income' o 'expense')
 * @returns {number} - Número de transacciones del tipo especificado
 */
function contarTransaccionesPorTipo(transactions, tipo) {
  return transactions.filter((transaction) => transaction.type === tipo).length;
}

/**
 * Calcula el promedio de un tipo de transacción
 * @param {Array} transactions - Array de transacciones
 * @param {string} tipo - Tipo de transacción ('income' o 'expense')
 * @returns {number} - Promedio de transacciones del tipo especificado
 */
function calcularPromedioPorTipo(transactions, tipo) {
  const transaccionesDelTipo = transactions.filter(
    (transaction) => transaction.type === tipo
  );

  if (transaccionesDelTipo.length === 0) {
    return 0; // Evitar división por cero
  }

  const total = transaccionesDelTipo.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  return total / transaccionesDelTipo.length;
}

/**
 * Filtra transacciones que superan un umbral específico
 * @param {Array} transactions - Array de transacciones
 * @param {number} umbral - Monto mínimo para filtrar
 * @returns {Array} - Array de transacciones que superan el umbral
 */
function filtrarTransaccionesGrandes(transactions, umbral) {
  return transactions.filter((transaction) => transaction.amount >= umbral);
}

// Exportar todas las funciones de cálculo
module.exports = {
  calcularTotalIngresos,
  calcularTotalGastos,
  calcularBalance,
  contarTransacciones,
  contarTransaccionesPorTipo,
  calcularPromedioPorTipo,
  filtrarTransaccionesGrandes
};
