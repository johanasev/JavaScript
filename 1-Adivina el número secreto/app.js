// Definición de variables
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = generarNumeroSecreto();
let intentos = 0;

// Función general para llamar elementos DOM y asignarles nuevos valores
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

// Verifica si el número ingresado es igual al número secreto
function verificarIntento() {
    let numeroDelUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDelUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Si el usuario no acertó se aconseja
        if (numeroDelUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número es mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

// Limpia la caja de ingreso del número
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Genera el número secreto y verifica si ya salió para no repetir
function generarNumeroSecreto() {
    // Si ya se sortearon todos los números
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        return null; // Para evitar un loop infinito
    }

    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // Si el número generado ya está en la lista, generamos otro
    if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

// Reinicia a las condiciones iniciales
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', 'Indica un número del 1 al ' + numeroMaximo);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

// Habilita las condiciones iniciales para un nuevo juego y habilita el botón nuevo juego
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Se llama a la función condiciones iniciales para empezar el juego
condicionesIniciales();
