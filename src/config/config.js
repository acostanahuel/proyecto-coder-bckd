import dotenv from 'dotenv';
import {Command} from 'commander';
import { mongoDB_URL } from './setting.js';
import program from './process.js';




const environment =  program.opts().mode;


dotenv.config();
dotenv.config({ debug: true })





export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};

