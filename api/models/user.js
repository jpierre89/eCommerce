// Temporary
const users = [];

class User {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return this.firstName.concat(` ${this.lastName}`);
    }

}

exports.User = User
exports.users = users