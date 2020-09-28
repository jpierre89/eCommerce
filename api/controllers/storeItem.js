// External Dependencies
var router = require('express').Router();

// Internal Dependencies
let { storeItem, storeItems, itemId } = require('../models/storeItem');


router.post('/', (req, res) => {
    let newItem = req.body;
    newItem.id = ++itemId;
    storeItems.push(newItem);
    res.status(201).json(newItem);
});

router.put('/', (req, res) => {
    let updatedItem = req.body;
    foundItem = storeItems.find(item => {
        return item.id == updatedItem.id;
    });
    if (foundItem) {
        foundItem.name = updatedItem.name;
        res.status(200).json(foundItem);
    } else {
        res.status(404).json({
            "error": "item id not found"
        });
    };  
});


router.get('/', (req, res) => {
    // Get Item by Id
    if (req.query.id) {
        const itemId = req.query.id;
        foundItem = storeItems.find(item => {
            return item.id == itemId;
        });
        if (foundItem) {
            res.status(200).json(foundItem);
        } else {
            res.status(404).json({
                "error": "item id not found"
            });
        };
    // Get Item by query  
    } else if (req.query.query) {
        const expr = req.query.expr;
        if (!expr) { res.status(400).json({"error": "expr required"}) }
        const matches = storeItems.filter(item =>
            item.name.includes(expr)
        );
        res.status(200).json(matches);
    // Get Item List
    } else {
        res.status(200).json(storeItems);
    }
});

router.delete('/', (req, res) => {
    const itemId = req.query.id;
    const idx = storeItems.findIndex(item => {
        return item.id == itemId;
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