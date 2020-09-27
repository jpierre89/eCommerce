// External Dependencies
var router = require('express').Router();

// Internal Dependencies
let { storeItem, storeItems, itemId } = require('../models/storeItem');

router.post('/', (req, res) => {
    let newItem = req.query;
    newItem.id = ++itemId;
    storeItems.push(newItem);
    res.status(201).json(newItem);
});

module.exports = router;