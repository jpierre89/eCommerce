// Temporary
let users = [];

class User {
    constructor(username, firstName, lastName) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return this.firstName.concat(` ${this.lastName}`);
    }

}

exports.User = User;
exports.users = users;

  

   