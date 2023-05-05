import { Command } from "commander";


const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
    //creo es lo de superadmin
    .requiredOption('-u <user>', 'Usuario superadmin usando aplicación', 'No se ha declarado un usuario');
program.parse();

export default program;
