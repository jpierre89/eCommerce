var router = require('express').Router();
var path = require('path');

router.use('/user', require('./user'));
router.use('/storeItem', require('./storeItem'));
router.use('/cart', require('./cart'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/api.html'));
});

module.exports = router;