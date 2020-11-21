var router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');


/* @desc    Create User
 *   
 * @param   req.body.email
 * @param   req.body.password
 * @param   req.body.firstName
 * @param   req.body.lastName
*/
router.post('/', async (req, res) => {
    try {
        const savedUser = await createUser(
            req.body.email,
            req.body.password,
            req.body.firstName,
            req.body.lastName
        )

        res.status(201).json(savedUser);
    }
    catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

async function createUser(email, password, firstName, lastName) {
    const newUser = new User({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    const savedUser = await newUser.save();
    return savedUser
}

/* @desc    Update User
 *   
 * @param   req.query.id
 * @param   req.body.email
 * @param   req.body.password
 * @param   req.body.firstName
 * @param   req.body.lastName
*/
router.put('/', async (req, res) => {
    try {
        const user = await updateUser (
            req.query.id,
            req.body.email,
            req.body.password,
            req.body.firstName,
            req.body.lastName
        )
        res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

async function updateUser(id, email, password, firstName, lastName) {
    const user = await User.findById(id);
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return user
}

/* @desc    Get User by id
 *          Get all Users
 *
 * @param   req.query.id
*/
router.get('/', async (req, res) => {
    try {
        if (req.query.id) {
            const user = await getUserById(req.query.id);
            res.status(200).json(user);
        }
        else {
            const users = await getAllUsers();
            res.status(200).json(users)
        }
    }
    catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});

async function getUserById(id) {
    const user = await User.findById(id);
    return user;
}

async function getAllUsers() {
    const users = await User.find().sort('name');
    return users
}

/* @desc    Delete User
 *
 * @param   req.query.id
*/
router.delete('/', async (req, res) => {
    try {
        const user = await deleteUser(req.query.id);
        res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(404).json({"error": "User id not found"});
    }
});

async function deleteUser(id) {
    const user = await User.findById(id);
    await user.remove();
    return user;
}


module.exports = {
    router : router,
    createUser : createUser,
    updateUser : updateUser,
    getUserById : getUserById,
    getAllUsers : getAllUsers,
    deleteUser : deleteUser
}

/* @desc    User Login
 *   
 * @param   req.body.email
 * @param   req.body.password
*/
router.post('/login', async (req, res) => {

    try {
        const {email, password} = req.body;
        const foundUser = await User.findOne(
            {
                email: email,
                password: password
            }
        )
        .exec()

        if (foundUser) {
            const accessToken = jwt.sign({user: foundUser}, req.jwt_secret)
            res.status(200).json({user: foundUser, jwt: accessToken});
        }
        else {
            res.status(401).json();
        }
    }
    catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});