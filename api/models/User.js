const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    // autogenerated _id property
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CartItem'
        }
    ]
});

userSchema.virtual('fullName').get(() => {
    return this.firstName + ' ' + this.lastName;
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User: User
}


   