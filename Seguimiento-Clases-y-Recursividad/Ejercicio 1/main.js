class Universidad { // Creo una estructura principal que encapsule los datos necesarios

    constructor() { // Inicializo estructura de datos usuariosAtendidos

        this.usuariosAtendidos = {

            total: 0, // Cuenta total de usuarios atendidos

            porDia: {}, // Objeto vacío, almacena estadísticas de atención por día

            porModulo: { // Objeto que almacena estadísticas separadas por módulos

                // Objeto dentro del objeto porModulo que separa tipos de usuario en el módulo
                terminal: { 

                    estudiantes: 0,
                    docentes: 0,
                    transferencias: 0
                },
                // Lo mismo que el de arriba, son módulos que contienen info de estudiantes, docentes y transferencias
                oficina: { 

                    estudiantes: 0,
                    docentes: 0,
                    transferencias: 0

                }

             

            } // Fin módulo
        }; // Fin constructor() // Acá cierra this.usuariosAtendidos, por eso ;
    } // Fin constructor

    // Método para atender usuario
    
    atenderUsuario(modulo, tipoUsuario, dia) {

        // Incrementa usuarios atendidos
        this.usuariosAtendidos.total++; // Ingresa a la propiedad "total" del objeto y la incrementa

        // Verifica si ya existe una entrada para el día
        // this.usuariosAtendidos.porDia[dia] accede al objeto que almacena las estadísticas del día `dia`([dia])

        if(!this.usuariosAtendidos.porDia[dia]) { // Evalúa si la entrada no existe
        // La expresión sin ! devuelve undefined si día no se ha registrado, el operador ! convierte undefined en true
        // Esto indica que la entrada para ese día no está presente

        this.usuariosAtendidos.porDia[dia] = { // Si no existe, se ejecuta lo siguiente
        // Se crea una nueva entrada para `dia` en porDia, que contiene subobjetos

            terminal: { estudiantes: 0, docentes: 0 }, // Subobjeto con contador en 0 para est y dctes

            oficina: { estudiantes: 0, docentes: 0 } // Subobjeto con contador en 0 para est y dctes

        }; 
        // Ej, se registra la atención de un usuario el día `2024-05-16`, si es la primera vez que se atiene un usuario en esta fecha,
        // entonces this.usuariosAtendidos.porDia[`2024-05-16`] será indefinido, la condición if es aquella que hace que `undefined`
        // cambie a `true` al momento en que se aplica el operador de negación !, esto hace que se cree una estructura para ese día, es decir,
        // this.usuariosAtendidos.porDia[`2024-05-16`] = { subobjetos } | despúes de que esto suceda, cualquier registro de atención ese día
        // será almacenado en la estructura dependiendo de el módulo de la atención y cuántos estudiantes y/o docentes.
    }
    // Incrementa los usuarios atendidos por día y módulo
    this.usuariosAtendidos.porDia[dia][modulo][tipoUsuario]++;

    // Incrementa los usuarios atendidos por módulo
    this.usuariosAtendidos.porModulo[modulo][tipoUsuario]++;
}
transferirUsuario(fromModulo, toModulo, tipoUsuario){
    
    // Decrementa usuario del módulo en el que estaba originalmente
    this.usuariosAtendidos.porModulo[fromModulo][tipoUsuario]--;

    // Incrementa transferencias en el módulo original
    this.usuariosAtendidos.porModulo[fromModulo].transferencias++;

    // Incrementa usuario en nuevo módulo
    this.usuariosAtendidos.porModulo[toModulo][tipoUsuario]++;

}
// Método que retorne estadísticas acumuladas 
generarEstadisticas(){
    return this.usuariosAtendidos;
}
}

// Se crea una nueva instancia de la clase `Universidad``
// El constructor inicializa los contadores para almacenar la info
const universidad = new Universidad()

// Se llama al método atenderUsuario varias veces simulando la atención de usuarios
universidad.atenderUsuario(`oficina`, `estudiantes`, `2024-05-16`);
universidad.atenderUsuario(`terminal`, `docentes`, `2024-05-16`);
universidad.atenderUsuario(`oficina`, `docentes`, `2024-05-17`);
universidad.atenderUsuario(`terminal`, `estudiantes`, `2024-05-17`);

// Una transferencia de usuario ahí suave
universidad.transferirUsuario(`terminal`, `oficina`, `docentes`);

console.log(universidad.generarEstadisticas());
