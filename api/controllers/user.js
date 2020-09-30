// External Dependencies
var router = require('express').Router();

// Internal Dependencies
const { User, users } = require('../models/user');


router.post('/', (req, res) => {
    const body = req.body;
    currentUser = users.find(user => {
        return user.email == body.email;
    });
    if (currentUser) {
        res.status(409).json({
            "error": "Email already exists"
        });
    } else {
        //newUser = Object.assign(User.prototype , body);
        let newUser = Object.assign(new User(), body);
        res.status(201).json(newUser);
    };
});

router.put('/', (req, res) => {
    const query = req.query;
    const body = req.body;
    user = users.find(user => {
        return user.id == query.userId;
    });
    if (user) {
        user.email = body.email;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        res.status(200).json(user);
    } else {
        res.status(404).json({
            "error": "user id not found"
        });
    };
});

router.get('/', (req, res) => {
    const query = req.query;
    // Get by userId
    if (query.userId) {
        user = users.find(user => {
            return user.id == query.userId;
        });
        res.status(200).json(user);
    // Get by email
    } else if (query.email) {
        user = users.find(user => {
            return user.email == query.email;
        });
        res.status(200).json(user);
    // Get list
    } else {
        res.status(200).json(users);
    };
});


router.delete('/', (req, res) => {
    const query = req.query;
    const user = users.find(user => {
        return user.id == query.userId;
    });
    if (!user) {
        res.status(404).json({
            "error": "User id not found"
        });
    } else {
        user.delete();
        res.status(200).json(user);
    };        
});


module.exports = router;