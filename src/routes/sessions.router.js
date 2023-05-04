import { Router } from 'express';
import userModel  from '../models/user.model.js';
import passport from 'passport';


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

//ESTA EN user.router.js?
// router.post("/register", passport.authenticate(
//     'register', {failureRedirect: '/fail-register'}),  
//     async (req, res)=>{
//     console.log("Registrando usuario nuevo");
//     res.status(201).send ({status: "success", message: "usuario creado con exito"});
// });

/*codigo de login funciona ahora estoy probando que sea con un admin*/
/*router.post("/login", passport.authenticate ('login', {failureRedirect: '/api/sessions/fail-login'}), async (req, res)=>{
   console.log('User found to login:');
   const user = req.user;
   console.log(user);
   if (!user) return res.status(401).send({status:"error", error: "Credentials do not match"});
   req.session.user= {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age
 }    
}); */ 



router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      console.log('Superadmin found to login:');
      console.log(`Email: ${email}, Password: ${password}`);
      req.session.user = {
        name: 'Superadmin',
        email: email
      };
      return res.send({ status: 'success', message: 'Superadmin logged in successfully.' });
    } else {
      passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' })(req, res, () => {
        console.log('User found to login:');
        const user = req.user;
        console.log(user);
        if (!user) return res.status(401).send({ status: 'error', error: 'Credentials do not match' });
        req.session.user = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          age: user.age
        };
        res.send({ status: 'success', message: 'User logged in successfully.' });
      });
    }
  }); 
  




router.get ('/current', (req, res) => {
    res.send({status:"success" });
});


router.get ('/fail-register', (req, res) => {
    res.status(401).send({error: "Failed to process register!"});
})


router.get ('/fail-login', (req, res) => {
    res.status(401).send({error: "Failed to process login!"});
})

export default router;  