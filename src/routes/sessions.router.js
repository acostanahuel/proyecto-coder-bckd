import { Router } from 'express';
import  {userModel}  from '../Dao/DB/models/user.model.js';
import { createHash, isValidPassword } from '../util.js';

const router = Router();

router.post("/register", async (req, res)=>{
    const { first_name, last_name, email, age, password} = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    const exists = await userModel.findOne({email});

    if (exists){
        return res.status(400).send({status: "error", message: "El usuario ya existe"});
    }

   const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    };
    const result = await userModel.create(user);
    res.status(201).json({
        status: "success",
        message: `User created successfully, ID: ${result.id}`,
        redirectUrl: '/users/login'
    }); 

});

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email}); 
    console.log("Usuario encontrado para login");
    console.log(user);

    if(!user) return res.status(401).send({status:"error", error:"Los datos ingresados son inválidos"});
    if (!isValidPassword (user, password)) {       ///aca password ya llega hasheado
        return res.status(401).send({status:"error", error:"Los datos ingresados son inválidos"});
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age 
    }
    res.send ({status: "success",  payload: req.session.user, message: "Logeuo realizado con exito"});
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
});

export default router;