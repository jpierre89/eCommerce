// Temporary
var storeItems = [];

class StoreItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.id = StoreItem.getNextItemId++;
        storeItems.push(this);
    }
}

StoreItem.getNextItemId = 0;

module.exports = {
    StoreItem : StoreItem,
    storeItems : storeItems
}