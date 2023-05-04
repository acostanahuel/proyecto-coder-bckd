import dotenv from 'dotenv';
import {Command} from 'commander';
import { mongoDB_URL } from './setting.js';


// const program = new Command(); //Crea la instancia de comandos de commander.

// program
//     .option('-d', 'Variable para debug', false)
//     .option('-p <port>', 'Puerto del servidor', 8080)
//     .option('--mode <mode>', 'Modo de trabajo', 'develop')
//     //creo es lo de superadmin
//     .requiredOption('-u <user>', 'Usuario superadmin usando aplicación', 'No se ha declarado un usuario');
// program.parse();

// console.log("Options: ", program.opts());
// const environment = program.opts().mode;


dotenv.config();
// dotenv.config({
//     path:environment==="production"?"./src/config/.env.production":"./src/config/.env.development"
// });


export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};

