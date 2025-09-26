/**
 * Aplicación Principal - Procesador de Transacciones
 *
 * Este es el punto de entrada de la aplicación. Demuestra cómo usar
 * todos los módulos creados para procesar transacciones financieras.
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
  generarTransaccionesAleatorias
} = require('./src/data');

/**
 * Función principal que ejecuta la aplicación
 */
function ejecutarAplicacion() {
  console.log('🚀 Iniciando Aplicación de Procesamiento de Transacciones');
  console.log('='.repeat(60) + '\n');

  try {
    // DEMO 1: Procesar transacciones de ejemplo
    console.log('📋 DEMO 1: Procesando transacciones de ejemplo');
    console.log('-'.repeat(40));

    const transacciones = obtenerTransaccionesEjemplo();
    console.log(
      `📊 Cargando ${transacciones.length} transacciones de ejemplo...`
    );

    // Procesar con umbral por defecto (1000)
    const resumen1 = procesarTransacciones(transacciones);
    console.log(generarReporte(resumen1));

    // DEMO 2: Procesar con umbral personalizado
    console.log('\n📋 DEMO 2: Procesando con umbral personalizado ($2000)');
    console.log('-'.repeat(40));

    const resumen2 = procesarTransacciones(transacciones, 2000);
    console.log(generarReporte(resumen2));

    // DEMO 3: Probar con datos aleatorios
    console.log('\n📋 DEMO 3: Procesando datos aleatorios (50 transacciones)');
    console.log('-'.repeat(40));

    const transaccionesAleatorias = generarTransaccionesAleatorias(50);
    const resumen3 = procesarTransacciones(transaccionesAleatorias, 1000);
    console.log(generarReporte(resumen3));

    // DEMO 4: Mostrar manejo de errores
    console.log('\n📋 DEMO 4: Probando manejo de errores');
    console.log('-'.repeat(40));

    try {
      const transaccionesProblematicas = obtenerTransaccionesProblematicas();
      procesarTransacciones(transaccionesProblematicas);
    } catch (error) {
      console.log('❌ Error capturado correctamente:');
      console.log(`   ${error.message}`);
    }

    console.log('\n✅ Todas las demostraciones completadas exitosamente!');
  } catch (error) {
    console.error('❌ Error inesperado en la aplicación:', error.message);
    process.exit(1);
  }
}

/**
 * Función para mostrar información de la aplicación
 */
function mostrarInformacion() {
  console.log('\n📚 INFORMACIÓN DE LA APLICACIÓN');
  console.log('='.repeat(40));
  console.log('• Nombre: Procesador de Transacciones Financieras');
  console.log('• Versión: 1.0.0');
  console.log('• Propósito: Aprender programación modular en Node.js');
  console.log('• Metodología: Resolución de problemas paso a paso');
  console.log('\n📁 ESTRUCTURA DE ARCHIVOS:');
  console.log('• src/validators.js - Funciones de validación');
  console.log('• src/calculators.js - Funciones de cálculo');
  console.log('• src/transactionProcessor.js - Lógica principal');
  console.log('• src/data.js - Datos de ejemplo');
  console.log('• index.js - Punto de entrada');
  console.log('\n🚀 COMANDOS DISPONIBLES:');
  console.log('• npm start - Ejecutar la aplicación');
  console.log('• node index.js - Ejecutar directamente');
}

// Verificar argumentos de línea de comandos
const argumentos = process.argv.slice(2);

if (argumentos.includes('--help') || argumentos.includes('-h')) {
  mostrarInformacion();
} else if (argumentos.includes('--info') || argumentos.includes('-i')) {
  mostrarInformacion();
} else {
  // Ejecutar aplicación por defecto
  ejecutarAplicacion();
}

// Exportar funciones para uso en otros archivos
module.exports = {
  ejecutarAplicacion,
  mostrarInformacion
};