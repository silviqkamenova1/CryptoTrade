const router = require('express').Router();

const authService = require('../services/authService');

router.get('/login', (req, res) => {
   res.render('auth/login');
});

router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   const token = await authService.login(email, password);

   res.cookie('auth', token);
   res.redirect('/');
});

router.get('/register', (req, res) => {
   res.render('auth/register');
});

router.post('/register', async (req, res) => {
   const { username, email, password, repeatPassword } = req.body;

   await authService.register(username, email, password, repeatPassword);

   res.redirect('/login')
});
module.exports = router;