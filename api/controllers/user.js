// External Dependencies
var router = require('express').Router();

// Internal Dependencies
const { User, users } = require('../models/user');


router.post('/', (req, res) => {
    let newUser = req.body;
    currentUser = users.find(user => {
        return user.username == newUser.username;
    });
    if (currentUser) {
        res.status(409).json({
            "error": "Username already exists"
        });
    } else {
        users.push(newUser);
        res.status(201).json(newUser);
    };
});

router.put('/', (req, res) => {
    let updatedUser = req.body;
    foundUser = users.find(user => {
        return user.username == updatedUser.username;
    });
    if (foundUser) {
        foundUser.firstName = updatedUser.firstName;
        foundUser.lastName = updatedUser.lastName;
        if (updatedUser.newUsername) {
            foundUser.username = updatedUser.newUsername;
        };
        res.status(200).json(foundUser);
    } else {
        res.status(404).json({
            "error": "username not found"
        });
    };           
});

router.get('/', (req, res) => {
    foundUser = users.find(user => {
        return user.username == req.query.username;
    });
    res.status(200).json(foundUser);
});


router.delete('/', (req, res) => {
    const username = req.query.username;
    const idx = users.findIndex(user => {
        return user.username == username;
    });
    if (idx < 0) {
        res.status(404).json({
            "error": "username not found"
        });
    } else {
        const deletedUser = users.splice(idx, 1)[0];
        res.status(200).json(deletedUser);
    };        
});

router.get('/list', (req, res) => {
    res.status(200).send(JSON.stringify(users));
});

module.exports = router;