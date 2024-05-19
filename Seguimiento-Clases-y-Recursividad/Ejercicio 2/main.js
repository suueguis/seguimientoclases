class cuenta {
    constructor(numCuenta, saldo = 0){
        this.numCuenta = numCuenta;
        this.saldo = saldo;
    }

    depositar(cantidad){
        this.saldo += cantidad;
        return this.saldo
    }

    retirar(cantidad){
        if(this.saldo >= cantidad){
            return true;
        }
        return false;
    }

    verSaldo(){
        return this.saldo;
    }
}

class cliente {
    constructor(id, pin){
        this.id = id;
        this.pin = pin;
        this.cuentas = [];
    }

    agregarCuenta(cuenta){
        this.cuentas.push(cuenta);

    }

    elegirCuenta(numCuenta){
        return this.cuentas.find(cuenta => cuenta.numCuenta === numCuenta);

    }

    validarPin(pin){
        return this.pin === pin;

    }
}

class banco{
    constructor(){
        this.clientes = new Map()
    }

    agregarCliente(cliente){
        this.clientes.set(cliente.id, cliente);
    }

    validarCliente(id, pin){
        const cliente = this.clientes.get(id);
        if(cliente && this.validarCliente(pin)){
            return cliente;
        }
        return null;
    }
    
    aprobarRetiro(cuenta, cantidad){
       return cuenta.retirar(cantidad);

    }

    aprobarDeposito(cuenta, cantidad){
        return cuenta.depositar(cantidad);
    }

    transferirDinero(deCuenta, paraCuenta, cantidad){
        if (deCuenta.retirar(cantidad)){
            paraCuenta.depositar(cantidad);
            return true;
        }
        return false;
    }
}
class panelOperador{
    constructor(){
        this.encendido = false;
    }

    prender(){
        this.encendido = true;
    }

    apagar(){
        this.encendido = false;
    }
}
class cajero{
    constructor(banco){
        this.banco = banco;
        this.panelOperador = panelOperador;
        this.clienteActual = null
        this.intentosPin = 0;
    }

    start(){
        if(!this.panelOperador.encendido){
            console.log('El cajero está apagado.')
            return;
        }

        this.autenticarCliente();
            if(this.clienteActual){
                this.mostrarMenu();
            }
    }

    autenticarCliente(){
        const id = prompt('Ingrese el número de su documento de identidad.');
        const pin = prompt('Ingrese su pin de 4 dígitos.');

        this.clienteActual = this.banco.autenticarCliente(id, pin);
        this.intentosPin++;

        while(!this.clienteActual && this.intentosPin < 3){
            console.log('Su PIN es incorrecto. Vuelva a intentarlo.');
            const pin = prompt('Ingrese su pin de 4 dígitos.');
            this.clienteActual = this.banco.autenticarCliente(id, pin);
            this.intentosPin++;
        }

        if(!this.clienteActual){
            console.log('Usted ha alcanzado el número máximo de intentos. Por favor, intente más tarde.');

        }
    }

    mostrarMenu(){
        let opcion;
        do {
        console.log("1. Retiro de efectivo");
        console.log("2. Depósito");
        console.log("3. Transferencia");
        console.log("4. Consulta de saldo");
        console.log("5. Salir");
        opcion = prompt("Seleccione una opción:");

        switch (opcion) {
            case "1":
                this.realizarRetiro();
                break;
            case "2":
                this.realizarDeposito();
                break;
            case "3":
                this.realizarTransferencia();
                break;
            case "4":
                this.realizarConsultaSaldo();
                break;
            case "5":
                console.log("Gracias por usar el cajero. Vuelva pronto.");
                break;
            default:
                console.log("Opción no válida. Inténtelo de nuevo.");
        }
    } while (option !== "5");
}

realizarRetiro() {
    const numCuenta = prompt("Ingrese el número de cuenta:");
    const cantidad = parseInt(prompt("Ingrese el monto a retirar (múltiplos de $50000):"), 10);
    const cuenta = this.clienteActual.elegirCuenta(numCuenta);
    if (cuenta && this.banco.aprobarRetiro(cuenta, cantidad)) {
        console.log(`Retiro exitoso, puede tomar $${cantidad} de la bandeja principal.`);
    } else {
        console.log('Retiro fallido. Fondos insuficientes o cuenta no válida.');
    }
}

realizarDeposito() {
    const numCuenta = prompt("Ingrese el número de cuenta:");
    const cantidad = parseInt(prompt("Ingrese el monto a depositar:"), 10);
    const tipo = prompt("Ingrese el tipo de depósito (efectivo/cheque):");
    const cuenta = this.clienteActual.elegirCuenta(numCuenta);
    if (cuenta) {
        this.banco.aprobarDeposito(cuenta, cantidad);
        console.log(`Depósito de ${cantidad} en ${tipo} exitoso.`);
    } else {
        console.log("Depósito fallido. Cuenta no válida.");
    }
}

realizarTransferencia() {
    const deCuentaNum = prompt("Ingrese el número de cuenta origen:");
    const paraCuentaNum = prompt("Ingrese el número de cuenta destino:");
    const cantidad = parseInt(prompt("Ingrese el monto a transferir:"), 10);
    const deCuenta = this.clienteActual.elegirCuenta(deCuentaNum);
    const paraCuenta = this.clienteActual.elegirCuenta(paraCuentaNum);
    if (deCuenta && paraCuenta && this.banco.transferirDinero(deCuenta, paraCuenta, cantidad)) {
        console.log(`Transferencia de ${amount} exitosa.`);
    } else {
        console.log("Transferencia fallida. Fondos insuficientes o cuentas no válidas.");
    }
}

realizarConsultaSaldo() {
    const numCuenta = prompt("Ingrese el número de cuenta:");
    const cuenta = this.clienteActual.elegirCuenta(numCuenta);
    if (cuenta) {
        console.log(`El saldo de la cuenta es ${cuenta.verSaldo()}.`);
    } else {
        console.log("Consulta fallida. Cuenta no válida.");
    }
  }
}

cajero();