import { Router } from 'express';
import userModel  from '../models/user.model.js';
import { authToken, createHash, isValidPassword } from '../util.js';
import passport from 'passport';
import { generateJWToken } from '../util.js';

const router = Router();

router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/github");
});


router.post("/register", passport.authenticate(
    'register', {failureRedirect: '/fail-register'}),  
    async (req, res)=>{
    console.log("Registrando usuario nuevo");
    res.status(201).send ({status: "success", message: "usuario creado con exito"});
});

router.post("/login", passport.authenticate ('login', {failureRedirect: '/api/sessions/fail-login'}), async (req, res)=>{
   console.log('User found to login:');
   const user = req.user;
   console.log(user);
   if (!user) return res.status(401).send({status:"error", error: "Credentials do not match"});
//    req.session.user= {
//     name: `${user.first_name} ${user.last_name}`,
//     email: user.email,
//     age: user.age
//  }
    const access_token = generateJWToken(user);
    console.log(access_token);
    res.send({access_token: access_token});
});

router.get ('/current', authToken, (req, res) => {
    res.send({status:"success", access_token});
});


router.get ('/fail-register', (req, res) => {
    res.status(401).send({error: "Failed to process register!"});
})


router.get ('/fail-login', (req, res) => {
    res.status(401).send({error: "Failed to process login!"});
})

export default router; 