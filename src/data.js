/**
 * Módulo de Datos de Prueba
 *
 * Este módulo contiene datos de ejemplo para probar la aplicación.
 * En un proyecto real, estos datos vendrían de una base de datos o API.
 *
 * @author Estudiante UPC
 * @version 1.0.0
 */

/**
 * Conjunto de datos de ejemplo para transacciones
 * Cada transacción tiene:
 * - id: Identificador único
 * - description: Descripción de la transacción
 * - amount: Monto en dólares
 * - type: Tipo de transacción ('income' o 'expense')
 */
const transaccionesEjemplo = [
  // Ingresos
  {
    id: 1,
    description: 'Salario mensual',
    amount: 5000,
    type: 'income'
  },
  {
    id: 2,
    description: 'Trabajo freelance',
    amount: 2000,
    type: 'income'
  },
  {
    id: 3,
    description: 'Venta de artículos usados',
    amount: 300,
    type: 'income'
  },
  {
    id: 4,
    description: 'Bono por rendimiento',
    amount: 1500,
    type: 'income'
  },

  // Gastos
  {
    id: 5,
    description: 'Alquiler',
    amount: 1500,
    type: 'expense'
  },
  {
    id: 6,
    description: 'Comestibles',
    amount: 300,
    type: 'expense'
  },
  {
    id: 7,
    description: 'Servicios públicos',
    amount: 200,
    type: 'expense'
  },
  {
    id: 8,
    description: 'Transporte',
    amount: 150,
    type: 'expense'
  },
  {
    id: 9,
    description: 'Entretenimiento',
    amount: 400,
    type: 'expense'
  },
  {
    id: 10,
    description: 'Compra de laptop',
    amount: 2500,
    type: 'expense'
  }
];

/**
 * Conjunto de datos con transacciones problemáticas para probar validaciones
 */
const transaccionesProblematicas = [
  {
    id: 1,
    description: 'Transacción válida',
    amount: 1000,
    type: 'income'
  },
  {
    id: 2,
    description: '', // Descripción vacía - inválida
    amount: 500,
    type: 'expense'
  },
  {
    id: -1, // ID negativo - inválido
    description: 'Transacción con ID negativo',
    amount: 200,
    type: 'income'
  },
  {
    id: 3,
    description: 'Transacción sin tipo',
    amount: 300
    // Falta la propiedad 'type' - inválida
  }
];

/**
 * Conjunto de datos vacío para probar casos edge
 */
const transaccionesVacias = [];

/**
 * Obtiene los datos de ejemplo
 * @returns {Array} - Array de transacciones de ejemplo
 */
function obtenerTransaccionesEjemplo() {
  return [...transaccionesEjemplo]; // Retorna una copia para evitar mutaciones
}

/**
 * Obtiene los datos problemáticos para pruebas de validación
 * @returns {Array} - Array de transacciones problemáticas
 */
function obtenerTransaccionesProblematicas() {
  return [...transaccionesProblematicas];
}

/**
 * Obtiene un array vacío para pruebas
 * @returns {Array} - Array vacío
 */
function obtenerTransaccionesVacias() {
  return [...transaccionesVacias];
}

/**
 * Genera transacciones aleatorias para pruebas de rendimiento
 * @param {number} cantidad - Número de transacciones a generar
 * @returns {Array} - Array de transacciones aleatorias
 */
function generarTransaccionesAleatorias(cantidad = 100) {
  const transacciones = [];
  const tipos = ['income', 'expense'];
  const descripciones = [
    'Salario',
    'Freelance',
    'Venta',
    'Bono',
    'Alquiler',
    'Comestibles',
    'Transporte',
    'Servicios',
    'Entretenimiento',
    'Compras'
  ];

  for (let i = 1; i <= cantidad; i++) {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const descripcion =
      descripciones[Math.floor(Math.random() * descripciones.length)];
    const monto = Math.floor(Math.random() * 5000) + 100; // Entre $100 y $5100

    transacciones.push({
      id: i,
      description: `${descripcion} ${i}`,
      amount: monto,
      type: tipo
    });
  }

  return transacciones;
}

// Exportar funciones y datos
module.exports = {
  obtenerTransaccionesEjemplo,
  obtenerTransaccionesProblematicas,
  obtenerTransaccionesVacias,
  generarTransaccionesAleatorias,
  // También exportar los datos directamente por si se necesitan
  transaccionesEjemplo,
  transaccionesProblematicas,
  transaccionesVacias
};
