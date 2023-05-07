import { Router } from "express";
import passport from 'passport';
import userModel from "../services/models/user.model.js";
import { cartsModel } from "../services/models/carts.model.js";


const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/fail-register' }), async (req, res) => {
    try {
      // Crear un nuevo usuario
      const user = new userModel({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password,
        loggedBy: req.body.loggedBy
      });
  
      // Guardar el usuario en la base de datos
      const savedUser = await user.save();
      
      // Crear un nuevo carrito vinculado al usuario
      const newCart = new cartsModel({
        user: savedUser._id
      });
  
      // Guardar el carrito en la base de datos
      const savedCart = await newCart.save();
      console.log('carrito guardado en db');
  
      // Actualizar el usuario con el ID del carrito
      savedUser.cart = savedCart._id;
      await savedUser.save();
  
      // Enviar la respuesta al cliente con el usuario y el carrito creados
      res.status(201).json({
        message: 'User and cart created successfully',
        user: savedUser,
        cart: savedCart
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


router.get ('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        //Buscar usuario por su ID incluyendo el carrito que se vincula
        const user = await userModel.findById(userId).populate('carts');

        //Si el usuario no existe, enviar una respuesta con un codigo de estado 404
        if (!user) {
            return res.status(404).json ({message: 'User not found'});
        }

        //Si el usuario existe, enviar una respuesta con el usuario y el carrito vinculado
        res.status(200).json ({
            message: 'User information retrieved successfully',
            user,
            cart: user.cart
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})





export default router