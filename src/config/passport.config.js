import passport from "passport";
import passportLocal from 'passport-local';
import gitHubStrategy from 'passport-github2'
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from "../util.js";
import router from '../routes/sessions.router.js';
import bcrypt from 'bcrypt';

//reglas, comenzamos a crear una estrategia
const localStrategy = passportLocal.Strategy

const initializePassport = () => {


    //user sera mail, iniciamos la estregia local y gitHub
    //done sera nuestra callback

//gitHub
passport.use ('github', new gitHubStrategy(
    {
        clientID: 'Iv1.3da33b8054af9ae9',
        clientSecret: '6cc5c19ed67ce5794a03cddc18259811431aba87',
        callbackURl: 'http://localhost:8080/api/sessions/githubcallback'
    },
    async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obteained from user");
            console.log(profile);
            try {
                const user = await userModel.findOne({email: profile._json.email});
                console.log(("User found to login"));
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username" + profile._json.email);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name:'',
                        age: 25 ,
                        email: profile._json.email,
                        password: '',
                        loggedBy: 'GitHub'
                    };
                    
                    const result = await userModel.create(newUser);
                    return done(null, result);
                }else{ 
                    //Si entramos por acá significa que el usuario ya existía
                    return done (null, user);
                }
            } catch (error) {
                return done (error);
            }



    })
);



//register
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req,username,password, done) =>{
            const {first_name, last_name, email, age} = req.body;
            try {
                const exists = await userModel.findOne({email});

                if (exists){
                   console.log("El usuario ya existe");
                   console.log ("ENTRA ACA");
                   return done (null, false);
                }
            
               const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    loggedBy: "App"
                };
                const result = await userModel.create(user);
                //Todo sale ok
                return done (null, result);
            }catch  (error) {
                return done ("Error registrando usuario:" + error);
        }
    }
    ));


 ///login
 passport.use ('login', new localStrategy(
    {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
        try {
            const user= await userModel.findOne({email: username});
            console.log("Usuario encontrado para login:");
            console.log(user);
            if(!user){
                console.warn ("User doesn't exists with username:" + username);
                return done (null, false);
            }
            if (!isValidPassword (user, password)) {
                console.warn ("Invalid credentials for user:" + username);
                return done (null, false);
            }
            return done (null, user);
        } catch (error) {
            return done (error);
        }
    }
 ));  


 
//funciones de Serializacion y Deserializacion
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user =await userModel.findById(id);
        done (null, user);
    } catch (error) {
        console.error ('Error deserializando el usuario:' + error);
    }
});

};



export default initializePassport;