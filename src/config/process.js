import { Command } from "commander";


const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
    //creo es lo de superadmin
    .requiredOption('-u <user>', 'Usuario superadmin usando aplicación', 'No se ha declarado un usuario');
program.parse();


// procces.on("exit", code => {
//     console.log("Este codigo se ejecuta antes de salir de proceso");
//     console.log("Codigo de salida del proceso:" + code);
// });

// process.on("uncaughtException", exception => {
//     console.log("Esta exception no fue capturada, o controlada");
//     console.log();
// });



export default program;
