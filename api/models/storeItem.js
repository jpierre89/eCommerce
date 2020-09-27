// Temporary
var storeItems = [];
var itemId = 0;

class StoreItem {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

exports.storeItems = storeItems;
exports.storeItem = StoreItem;
exports.itemId = itemId;