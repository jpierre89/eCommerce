var router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send('API Home');
});

router.use('/user', require('./user'));
router.use('/storeItem', require('./storeItem'));
router.use('/cart', require('./cart'));

module.exports = router;