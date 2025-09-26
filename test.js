/**
 * Archivo de Pruebas - Procesador de Transacciones
 *
 * Este archivo contiene pruebas manuales para verificar que todas
 * las funcionalidades de la aplicación funcionen correctamente.
 *
 * @author Estudiante UPC
 * @version 1.0.0
 */

// Importar módulos necesarios
const {
  procesarTransacciones,
  generarReporte
} = require('./src/transactionProcessor');
const {
  obtenerTransaccionesEjemplo,
  obtenerTransaccionesProblematicas,
  obtenerTransaccionesVacias,
  generarTransaccionesAleatorias
} = require('./src/data');

/**
 * Función para ejecutar una prueba individual
 * @param {string} nombre - Nombre de la prueba
 * @param {Function} funcionPrueba - Función que ejecuta la prueba
 */
function ejecutarPrueba(nombre, funcionPrueba) {
  console.log(`\n🧪 PRUEBA: ${nombre}`);
  console.log('='.repeat(50));

  try {
    funcionPrueba();
    console.log('✅ Prueba PASÓ correctamente');
  } catch (error) {
    console.log('❌ Prueba FALLÓ:');
    console.log(`   Error: ${error.message}`);
  }
}

/**
 * Prueba 1: Procesamiento básico con datos válidos
 */
function pruebaProcesamientoBasico() {
  const transacciones = obtenerTransaccionesEjemplo();
  const resumen = procesarTransacciones(transacciones, 1000);

  console.log('📊 Resultados del procesamiento:');
  console.log(`   • Balance: $${resumen.balance}`);
  console.log(`   • Total transacciones: ${resumen.totalTransacciones}`);
  console.log(`   • Promedio ingresos: $${resumen.promedioIngresos}`);
  console.log(`   • Promedio gastos: $${resumen.promedioGastos}`);
  console.log(
    `   • Transacciones grandes: ${resumen.cantidadTransaccionesGrandes}`
  );

  // Verificar que los cálculos sean correctos
  if (resumen.balance !== 3750) {
    throw new Error(`Balance esperado: $3750, obtenido: $${resumen.balance}`);
  }

  if (resumen.totalTransacciones !== 10) {
    throw new Error(
      `Total transacciones esperado: 10, obtenido: ${resumen.totalTransacciones}`
    );
  }
}

/**
 * Prueba 2: Manejo de errores con datos inválidos
 */
function pruebaManejoErrores() {
  const transaccionesProblematicas = obtenerTransaccionesProblematicas();

  try {
    procesarTransacciones(transaccionesProblematicas);
    throw new Error('Debería haber lanzado un error con datos inválidos');
  } catch (error) {
    console.log('✅ Error capturado correctamente:');
    console.log(`   ${error.message}`);
  }
}

/**
 * Prueba 3: Array vacío
 */
function pruebaArrayVacio() {
  const transaccionesVacias = obtenerTransaccionesVacias();

  try {
    procesarTransacciones(transaccionesVacias);
    throw new Error('Debería haber lanzado un error con array vacío');
  } catch (error) {
    console.log('✅ Error capturado correctamente:');
    console.log(`   ${error.message}`);
  }
}

/**
 * Prueba 4: Diferentes umbrales
 */
function pruebaDiferentesUmbrales() {
  const transacciones = obtenerTransaccionesEjemplo();

  console.log('📊 Probando diferentes umbrales:');

  // Umbral bajo
  const resumenBajo = procesarTransacciones(transacciones, 100);
  console.log(
    `   • Umbral $100: ${resumenBajo.cantidadTransaccionesGrandes} transacciones grandes`
  );

  // Umbral medio
  const resumenMedio = procesarTransacciones(transacciones, 1000);
  console.log(
    `   • Umbral $1000: ${resumenMedio.cantidadTransaccionesGrandes} transacciones grandes`
  );

  // Umbral alto
  const resumenAlto = procesarTransacciones(transacciones, 3000);
  console.log(
    `   • Umbral $3000: ${resumenAlto.cantidadTransaccionesGrandes} transacciones grandes`
  );

  // Verificar que el número de transacciones grandes disminuya con umbrales más altos
  if (
    resumenBajo.cantidadTransaccionesGrandes <=
    resumenMedio.cantidadTransaccionesGrandes
  ) {
    throw new Error(
      'El número de transacciones grandes debería disminuir con umbrales más altos'
    );
  }
}

/**
 * Prueba 5: Generación de reporte
 */
function pruebaGeneracionReporte() {
  const transacciones = obtenerTransaccionesEjemplo();
  const resumen = procesarTransacciones(transacciones, 1000);
  const reporte = generarReporte(resumen);

  console.log('📋 Reporte generado:');
  console.log(reporte);

  // Verificar que el reporte contenga información clave
  if (!reporte.includes('RESUMEN DE TRANSACCIONES')) {
    throw new Error('El reporte debería contener el título');
  }

  if (!reporte.includes(`$${resumen.balance}`)) {
    throw new Error('El reporte debería contener el balance');
  }
}

/**
 * Prueba 6: Datos aleatorios
 */
function pruebaDatosAleatorios() {
  const transaccionesAleatorias = generarTransaccionesAleatorias(20);
  const resumen = procesarTransacciones(transaccionesAleatorias, 1000);

  console.log('🎲 Procesando 20 transacciones aleatorias:');
  console.log(`   • Balance: $${resumen.balance}`);
  console.log(`   • Total transacciones: ${resumen.totalTransacciones}`);
  console.log(
    `   • Transacciones grandes: ${resumen.cantidadTransaccionesGrandes}`
  );

  // Verificar que se procesaron todas las transacciones
  if (resumen.totalTransacciones !== 20) {
    throw new Error(
      `Se esperaban 20 transacciones, se procesaron ${resumen.totalTransacciones}`
    );
  }
}

/**
 * Prueba 7: Validación de umbral
 */
function pruebaValidacionUmbral() {
  const transacciones = obtenerTransaccionesEjemplo();

  try {
    procesarTransacciones(transacciones, -100);
    throw new Error('Debería haber lanzado un error con umbral negativo');
  } catch (error) {
    console.log('✅ Error de umbral capturado correctamente:');
    console.log(`   ${error.message}`);
  }
}

/**
 * Función principal que ejecuta todas las pruebas
 */
function ejecutarTodasLasPruebas() {
  console.log('🚀 INICIANDO SUITE DE PRUEBAS');
  console.log('='.repeat(60));

  // Ejecutar todas las pruebas
  ejecutarPrueba('Procesamiento Básico', pruebaProcesamientoBasico);
  ejecutarPrueba('Manejo de Errores', pruebaManejoErrores);
  ejecutarPrueba('Array Vacío', pruebaArrayVacio);
  ejecutarPrueba('Diferentes Umbrales', pruebaDiferentesUmbrales);
  ejecutarPrueba('Generación de Reporte', pruebaGeneracionReporte);
  ejecutarPrueba('Datos Aleatorios', pruebaDatosAleatorios);
  ejecutarPrueba('Validación de Umbral', pruebaValidacionUmbral);

  console.log('\n🎉 TODAS LAS PRUEBAS COMPLETADAS');
  console.log('='.repeat(60));
}

// Verificar argumentos de línea de comandos
const argumentos = process.argv.slice(2);

if (argumentos.includes('--help') || argumentos.includes('-h')) {
  console.log('\n📚 AYUDA - ARCHIVO DE PRUEBAS');
  console.log('='.repeat(40));
  console.log('Este archivo contiene pruebas para verificar la funcionalidad');
  console.log('de la aplicación de procesamiento de transacciones.');
  console.log('\n🚀 COMANDOS:');
  console.log('• node test.js - Ejecutar todas las pruebas');
  console.log('• node test.js --help - Mostrar esta ayuda');
} else {
  // Ejecutar todas las pruebas
  ejecutarTodasLasPruebas();
}

// Exportar funciones para uso en otros archivos
module.exports = {
  ejecutarTodasLasPruebas,
  ejecutarPrueba
};