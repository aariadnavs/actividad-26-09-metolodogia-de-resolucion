/**
 * Script para ejecutar Cucumber
 *
 * Este script ejecuta las pruebas de Cucumber de manera directa
 * sin depender de la configuración de npx.
 */

const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🚀 Ejecutando pruebas de Cucumber...');

  // Ejecutar Cucumber con configuración directa
  const command = `node node_modules/@cucumber/cucumber/bin/cucumber-js --require features/step_definitions/*.js --format progress`;

  execSync(command, {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log('✅ Pruebas de Cucumber completadas exitosamente');
} catch (error) {
  console.error('❌ Error ejecutando Cucumber:', error.message);
  process.exit(1);
}