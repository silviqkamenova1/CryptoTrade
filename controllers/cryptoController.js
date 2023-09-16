const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorutils')

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoService.create(cryptoData);
    } catch (error) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(error)})
    }
    res.redirect('/catalog');
});


module.exports = router;