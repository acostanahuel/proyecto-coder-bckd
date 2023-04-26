import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import { log } from 'console';
import jwt from 'jsonwebtoken';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//crypto functions
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password ${user.password}`);
    return bcrypt.compareSync (password, user.password);
}




//JSON web tokens JWT functions
// const PRIVATE_KEY = "NahuelBackendCoderSecretKeyJWT";

// export const generateJWToken = (user) => {
//     return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h' });
// };

// /**
//  * Metodo que autentica el token JWT para nuestros requests.
//  * OJO: Esto actua como un middleware, observar el next.
//  * @param {*} req Objeto de request
//  * @param {*} res Objeto de response
//  * @param {*} next Pasar al siguiente evento.
//  */

// export const authToken= (req, res, next) => {
//     //El JWT token se guarda en los headers de autorización
//     const authHeader = req.headers.authorization;
//     console.log("Token present in header auth");
//     console.log(authHeader);
//     if (!authHeader) {
//         return res.status(401).send({error: "User not authenticated or missing token."});
//     }
//     const token = authHeader.split (' ')[1]; //Se hace el split para retirar la palabra Bearer
//     //validar token
//     jwt.verify (token, PRIVATE_KEY, (error, credentials) => {
//         if (error) return res.status(403).send({error:"Token invalid, unauthorized!"});
//         //Token OK
//         req.user = credentials.user;
//         next();
//     });
// }


export default __dirname;
