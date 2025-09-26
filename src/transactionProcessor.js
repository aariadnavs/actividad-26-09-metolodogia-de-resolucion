/**
 * Módulo Procesador de Transacciones
 *
 * Este es el módulo principal que orquesta todas las operaciones
 * de procesamiento de transacciones. Utiliza los módulos de validación
 * y cálculo para generar un resumen completo.
 *
 * @author Estudiante UPC
 * @version 1.0.0
 */

// Importar módulos de validación y cálculo
const { validarArrayTransacciones, validarUmbral } = require('./validators');
const {
  calcularBalance,
  contarTransacciones,
  calcularPromedioPorTipo,
  filtrarTransaccionesGrandes
} = require('./calculators');

/**
 * Procesa un array de transacciones y genera un resumen financiero
 *
 * @param {Array} transactions - Array de objetos transacción
 * @param {number} umbral - Monto mínimo para considerar transacciones grandes (default: 1000)
 * @returns {Object} - Objeto con el resumen financiero
 * @throws {Error} - Si los datos de entrada no son válidos
 */
function procesarTransacciones(transactions, umbral = 1000) {
  // PASO 1: Validar entrada
  console.log('🔍 Validando datos de entrada...');

  const validacionTransacciones = validarArrayTransacciones(transactions);
  if (!validacionTransacciones.esValido) {
    throw new Error(
      `Datos inválidos: ${validacionTransacciones.errores.join(', ')}`
    );
  }

  if (!validarUmbral(umbral)) {
    throw new Error('El umbral debe ser un número mayor o igual a 0');
  }

  console.log('✅ Datos validados correctamente');

  // PASO 2: Calcular métricas básicas
  console.log('📊 Calculando métricas básicas...');

  const balance = calcularBalance(transactions);
  const totalTransacciones = contarTransacciones(transactions);

  // PASO 3: Calcular promedios
  console.log('📈 Calculando promedios...');

  const promedioIngresos = calcularPromedioPorTipo(transactions, 'income');
  const promedioGastos = calcularPromedioPorTipo(transactions, 'expense');

  // PASO 4: Filtrar transacciones grandes
  console.log('🔍 Filtrando transacciones grandes...');

  const transaccionesGrandes = filtrarTransaccionesGrandes(
    transactions,
    umbral
  );

  // PASO 5: Generar resumen
  console.log('📋 Generando resumen...');

  const resumen = {
    // Métricas principales
    balance: Math.round(balance * 100) / 100, // Redondear a 2 decimales
    totalTransacciones: totalTransacciones,

    // Promedios
    promedioIngresos: Math.round(promedioIngresos * 100) / 100,
    promedioGastos: Math.round(promedioGastos * 100) / 100,

    // Transacciones grandes
    transaccionesGrandes: transaccionesGrandes,
    cantidadTransaccionesGrandes: transaccionesGrandes.length,

    // Metadatos
    umbralUtilizado: umbral,
    fechaProcesamiento: new Date().toISOString()
  };

  console.log('✅ Procesamiento completado');

  return resumen;
}

/**
 * Genera un reporte formateado del resumen de transacciones
 *
 * @param {Object} resumen - Resumen generado por procesarTransacciones
 * @returns {string} - Reporte formateado en texto
 */
function generarReporte(resumen) {
  let reporte = '\n' + '='.repeat(50) + '\n';
  reporte += '           RESUMEN DE TRANSACCIONES\n';
  reporte += '='.repeat(50) + '\n\n';

  // Información básica
  reporte += `📊 Total de transacciones: ${resumen.totalTransacciones}\n`;
  reporte += `💰 Balance total: $${resumen.balance}\n\n`;

  // Promedios
  reporte += '📈 PROMEDIOS:\n';
  reporte += `   • Ingresos promedio: $${resumen.promedioIngresos}\n`;
  reporte += `   • Gastos promedio: $${resumen.promedioGastos}\n\n`;

  // Transacciones grandes
  reporte += `🔍 TRANSACCIONES GRANDES (≥ $${resumen.umbralUtilizado}):\n`;
  reporte += `   • Cantidad: ${resumen.cantidadTransaccionesGrandes}\n`;

  if (resumen.transaccionesGrandes.length > 0) {
    reporte += '   • Detalles:\n';
    resumen.transaccionesGrandes.forEach((trans, index) => {
      reporte += `     ${index + 1}. ${trans.description}: $${trans.amount} (${
        trans.type
      })\n`;
    });
  } else {
    reporte += '   • No hay transacciones que superen el umbral\n';
  }

  reporte += '\n' + '='.repeat(50) + '\n';
  reporte += `Procesado el: ${new Date(
    resumen.fechaProcesamiento
  ).toLocaleString()}\n`;
  reporte += '='.repeat(50) + '\n';

  return reporte;
}

// Exportar funciones principales
module.exports = {
  procesarTransacciones,
  generarReporte
};
