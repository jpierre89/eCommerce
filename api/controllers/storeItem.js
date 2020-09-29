// External Dependencies
var router = require('express').Router();

// Internal Dependencies
let { storeItem, storeItems, itemId, StoreItem } = require('../models/storeItem');


router.post('/', (req, res) => {
    const body = req.body;
    //let item = Object.assign(StoreItem.prototype , body);
    let item = Object.assign(new StoreItem(), body);
    res.status(201).json(item);
});

router.put('/', (req, res) => {
    const query = req.query;
    const body = req.body;
    item = storeItems.find(item => {
        return item.id == query.itemId;
    });

    if (item) {
        item.name = body.name;
        item.price = body.price;
        res.status(200).json(item);
    } else {
        res.status(404).json({
            "error": "item id not found"
        });
    };  
});

router.get('/', (req, res) => {
    const query = req.query;
    // Get Item by Id
    if (query.itemId) {
        item = storeItems.find(item => {
            return item.id == query.itemId;
        });
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({
                "error": "item id not found"
            });
        };
    // Get Item by query match
    } else if (query.expr) {
        const matches = storeItems.filter(item =>
            item.name.includes(query.expr)
        );
        res.status(200).json(matches);
    // Get Item List
    } else {
        res.status(200).json(storeItems);
    }
});

router.delete('/', (req, res) => {
    const query = req.query;
    const idx = storeItems.findIndex(item => {
        return item.id == query.itemId;
    });
    if (idx < 0) {
        res.status(404).json({
            "error": "item id not found"
        });
    } else {
        const deletedItem = storeItems.splice(idx, 1)[0];
        res.status(200).json(deletedItem);
    }; 
});


module.exports = router;