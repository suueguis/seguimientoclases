    class Cliente {
        constructor(tipo, tipoAtencion) {
            this.tipo = tipo;
            this.tipoAtencion = tipoAtencion;
        }
    }
    class Banco {
        constructor() {
            this.cajas = [
                { id: 1, tipo: 'retiro', ocupada: false },
                { id: 2, tipo: 'retiro', ocupada: false },
                { id: 3, tipo: 'deposito', ocupada: false },
                { id: 4, tipo: 'deposito', ocupada: false },
                { id: 5, tipo: 'asesoria', ocupada: false }
            ];
            this.colaPreferencial = [];
            this.colaGeneral = [];
            this.colaSinCuenta = [];
        }
    
        agregarCliente(cliente) {
            switch (cliente.tipo) {
                case 'preferencial':
                    this.colaPreferencial.push(cliente);
                    break;
                case 'general':
                    this.colaGeneral.push(cliente);
                    break;
                case 'sinCuenta':
                    this.colaSinCuenta.push(cliente);
                    break;
            }
        }
    
        asignarCajas() {
            const atenderCliente = (cola, tipoCaja) => {
                for (let caja of this.cajas) {
                    if (!caja.ocupada && caja.tipo === tipoCaja) {
                        if (cola.length > 0) {
                            let cliente = cola.shift();
                            caja.ocupada = true;
                            setTimeout(() => {
                                caja.ocupada = false;
                                this.asignarCajas();
                            }, Math.random() * 3000 + 2000); // Simular tiempo de atención
                            alert(`Atendiendo a cliente ${cliente.tipo} en caja ${caja.id} para ${cliente.tipoAtencion}`);
                        }
                    }
                }
            };
    
            atenderCliente(this.colaPreferencial, 'retiro');
            atenderCliente(this.colaPreferencial, 'deposito');
            atenderCliente(this.colaPreferencial, 'asesoria');
    
            atenderCliente(this.colaGeneral, 'retiro');
            atenderCliente(this.colaGeneral, 'deposito');
            atenderCliente(this.colaGeneral, 'asesoria');
    
            atenderCliente(this.colaSinCuenta, 'retiro');
            atenderCliente(this.colaSinCuenta, 'deposito');
            atenderCliente(this.colaSinCuenta, 'asesoria');
        }
    
        mostrarEstadoCajas() {
            let estado = 'Estado de las cajas:\n';
            for (let caja of this.cajas) {
                estado += `Caja ${caja.id} (${caja.tipo}): ${caja.ocupada ? 'Ocupada' : 'Libre'}\n`;
            }
            alert(estado);
        }
    }
    
    function menu() {
        const banco = new Banco();
        let salir = false;
    
        while (!salir) {
            let eleccion = prompt("Elija una opción:\n1. Agregar cliente\n2. Asignar cajas\n3. Mostrar estado de cajas\n4. Salir");
            switch (eleccion) {
                case '1':
                    let tipo = prompt("Ingrese el tipo de cliente (preferencial, general, sinCuenta):");
                    let tipoAtencion = prompt("Ingrese el tipo de atención (retiro, deposito, asesoria):");
                    if ((tipo === 'preferencial' || tipo === 'general' || tipo === 'sinCuenta') &&
                        (tipoAtencion === 'retiro' || tipoAtencion === 'deposito' || tipoAtencion === 'asesoria')) {
                        const cliente = new Cliente(tipo, tipoAtencion);
                        banco.agregarCliente(cliente);
                    } else {
                        alert("Tipo de cliente o atención inválido.");
                    }
                    break;
                case '2':
                    banco.asignarCajas();
                    break;
                case '3':
                    banco.mostrarEstadoCajas();
                    break;
                case '4':
                    salir = true;
                    break;
                default:
                    alert("Opción inválida. Por favor, elija de nuevo.");
            }
        }
    }
    
    menu();
    