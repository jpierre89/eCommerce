var router = require('express').Router();
let { StoreItem } = require('../models/StoreItem');


/* @desc    Create StoreItem
 *
 * @param   req.body.name
 * @param   req.body.price        
*/
router.post('/', async (req, res) => {
    try {
        const savedItem = await createStoreItem(
            req.body.name,
            req.body.price
        )
        res.status(201).json(savedItem);
    }
    catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

async function createStoreItem(name, price) {
    const newItem = new StoreItem({
        name: name,
        price: price,
    });

    const savedItem = await newItem.save();
    return savedItem;
}

/* @desc    Update StoreItem
 *
 * @param   req.query.id
 * @param   req.body.name
 * @param   req.body.price
*/
router.put('/', async (req, res) => {
    try {
        const item = await updateStoreItem(
            req.query.id,
            req.body.name,
            req.body.price
        )
        res.status(200).json(item);
    }
    catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

async function updateStoreItem(id, name, price) {
    const item = await StoreItem.findById(id);
    if (item) {
        item.name = name;
        item.price = price;
        await item.save();
        return item;
    }
    else {
        return;
    }
}

/* @desc    Get StoreItem by id
 *          Get StoreItems that match expression
 *          Get all StoreItems
 * 
 * @param   req.query.id
 * @param   req.query.expr
*/
router.get('/', async (req, res) => {
    try {
        if (req.query.id) {
            const item = await getStoreItemById(req.query.id);
            res.status(200).json(item);
        }
        else if (req.query.expr) {
            const matchingStoreItems = await getMatchingStoreItems(req.query.expr);
            res.status(200).json(matchingStoreItems);
        }
        else {
            const storeItems = await getAllStoreItems();
            res.status(200).json(storeItems);
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

async function getStoreItemById(id) {
    const item = await StoreItem.findById(id);
    return item;
}

async function getMatchingStoreItems(expr) {
    const re = new RegExp(expr);
    const items = await StoreItem.find({ name: re });
    return items;
}

async function getAllStoreItems() {
    const storeItems = await StoreItem.find().sort('name');
    return storeItems;
}

/* @desc    Delete StoreItem
 *
 * @param   req.query.id
*/
router.delete('/', async (req, res) => {
    try {
        const storeItem = await deleteStoreItem(req.query.id);
        res.status(200).json(storeItem);
    }
    catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

async function deleteStoreItem(id) {
    const storeItem = await StoreItem.findById(id);
    await storeItem.remove();
    return storeItem;
}


module.exports = {
    router : router,
    createStoreItem : createStoreItem,
    updateStoreItem : updateStoreItem,
    getStoreItemById : getStoreItemById,
    getAllStoreItems : getAllStoreItems,
    deleteStoreItem : deleteStoreItem
}