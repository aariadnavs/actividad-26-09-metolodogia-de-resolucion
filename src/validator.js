/**
 * Módulo de Validadores
 *
 * Este módulo contiene funciones para validar datos de transacciones.
 * Sigue el principio de responsabilidad única: solo se encarga de validaciones.
 *
 * @author Estudiante UPC
 * @version 1.0.0
 */

/**
 * Valida si un objeto es una transacción válida
 * @param {Object} transaction - Objeto transacción a validar
 * @returns {boolean} - true si es válida, false si no
 */
function validarTransaccion(transaction) {
  // Verificar que sea un objeto
  if (typeof transaction !== 'object' || transaction === null) {
    return false;
  }

  // Verificar propiedades requeridas
  const tieneId = typeof transaction.id === 'number' && transaction.id > 0;
  const tieneDescripcion =
    typeof transaction.description === 'string' &&
    transaction.description.trim().length > 0;
  const tieneMonto =
    typeof transaction.amount === 'number' && transaction.amount >= 0;
  const tieneTipo =
    transaction.type === 'income' || transaction.type === 'expense';

  return tieneId && tieneDescripcion && tieneMonto && tieneTipo;
}

/**
 * Valida si un array contiene solo transacciones válidas
 * @param {Array} transactions - Array de transacciones a validar
 * @returns {Object} - { esValido: boolean, errores: Array }
 */
function validarArrayTransacciones(transactions) {
  // Verificar que sea un array
  if (!Array.isArray(transactions)) {
    return {
      esValido: false,
      errores: ['Las transacciones deben ser un array']
    };
  }

  // Verificar que no esté vacío
  if (transactions.length === 0) {
    return {
      esValido: false,
      errores: ['El array de transacciones no puede estar vacío']
    };
  }

  // Validar cada transacción
  const errores = [];
  transactions.forEach((transaction, index) => {
    if (!validarTransaccion(transaction)) {
      errores.push(`Transacción en índice ${index} es inválida`);
    }
  });

  return {
    esValido: errores.length === 0,
    errores: errores
  };
}

/**
 * Valida el parámetro de umbral (threshold)
 * @param {number} threshold - Valor del umbral a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validarUmbral(threshold) {
  return typeof threshold === 'number' && threshold >= 0;
}

// Exportar funciones para uso en otros módulos
module.exports = {
  validarTransaccion,
  validarArrayTransacciones,
  validarUmbral
};
