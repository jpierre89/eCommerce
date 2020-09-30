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

    delete() {
        // Deletes this User from users, and deletes this User's Cart
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == this.id) {
                users.splice(i, 1);
                break;
            }
        };
        this.cart.delete();
    };
}

User.nextUserId = 0;

module.exports = {
    User : User,
    users: users
} 


  

   