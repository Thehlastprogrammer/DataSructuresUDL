const lambdaValue = 5; // Número promedio de llegada de clientes por hora
const numHours = 8;
const numCashiers = 4;
const globalCycleMinutes = 480; // Ciclo global en minutos

let arrivalTime = 0;
const queueOfCustomers = [];
const cashierTimers = new Array(numCashiers).fill(0);
const customersServedByCashier = new Array(numCashiers).fill(0);

for (let globalMinute = 0; globalMinute < globalCycleMinutes; globalMinute++) {
  console.log(`----- Minuto ${globalMinute + 1} -----`);
  
  // Generar llegada de clientes según distribución de Poisson
  const numCustomers = poissonRandom(lambdaValue);
  console.log(`Número de clientes llegados: ${numCustomers}`);
  
  for (let i = 0; i < numCustomers; i++) {
    queueOfCustomers.push(arrivalTime);
    arrivalTime += 1;
  }
  
  // Atender a los clientes
  for (let cashier = 0; cashier < numCashiers; cashier++) {
    if (queueOfCustomers.length > 0 && cashierTimers[cashier] <= 0) {
      const customerArrivalTime = queueOfCustomers.shift();
      const serviceTime = getRandomInt(1, 10);
      cashierTimers[cashier] = serviceTime;
      customersServedByCashier[cashier] += 1;
    }
  }
  
  // Actualizar los temporizadores de los cajeros
  for (let cashier = 0; cashier < numCashiers; cashier++) {
    if (cashierTimers[cashier] > 0) {
      cashierTimers[cashier] -= 1;
    }
  }
  
  // Mostrar estado de las cajas y la cola de personas
  for (let cashier = 0; cashier < numCashiers; cashier++) {
    console.log(`Caja ${cashier + 1}: Tiempo restante ${cashierTimers[cashier]} segundos`);
  }
  console.log("Clientes en fila:", queueOfCustomers);
  
  console.log();
}

// Determinar la caja más ocupada
const mostBusyCashier = customersServedByCashier.indexOf(Math.max(...customersServedByCashier)) + 1;
console.log(`La caja más ocupada fue la Caja ${mostBusyCashier}.`);

// Determinar el cajero más ocupado
const mostBusyCashierIndex = cashierTimers.indexOf(Math.max(...cashierTimers));
const mostBusyCashierTime = Math.max(...cashierTimers);
console.log(`El cajero más ocupado fue el Cajero ${mostBusyCashierIndex + 1} con un tiempo de ${mostBusyCashierTime} segundos.`);

// Función para generar números aleatorios según distribución de Poisson
function poissonRandom(mean) {
  const L = Math.exp(-mean);
  let p = 1.0;
  let k = 0;
  
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  
  return k - 1;
}

// Función para generar un número entero aleatorio en un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

