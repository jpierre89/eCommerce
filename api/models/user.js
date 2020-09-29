const { Cart } = require('./cart');

// Temporary
let users = [];

class User {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.id = User.nextUserId++;
        this.cart = new Cart(this.id);
        users.push(this);
    }

    getFullName() {
        return this.firstName.concat(` ${this.lastName}`);
    };
}

User.nextUserId = 0;

module.exports = {
    User : User,
    users: users
} 


  

   