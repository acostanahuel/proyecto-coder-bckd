import { Router } from "express"

const router = Router ();

router.get ('/login', (req, res) =>{
   res.render('login'); 
});

router.get ('/register', (req, res) =>{
    res.render('register')
});

router.get('/', (req, res) => {
    const user = req.session && req.session.users;
    res.render('profile', { user });
  });
  

export default router;