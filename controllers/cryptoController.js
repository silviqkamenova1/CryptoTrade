const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorutils')

router.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll().lean();
    //TO DO....delete the value of crypto
    res.render('crypto/catalog', { crypto: [1] })
})

router.get('/:cryptoId/details', (req, res) => {
    res.render('crypto/details')
});

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoService.create(req.user._id, cryptoData);
    } catch (error) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(error)})
    }

    res.redirect('crypto/catalog');
});



module.exports = router;