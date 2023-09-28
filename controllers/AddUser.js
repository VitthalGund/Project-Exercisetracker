const User = require('../models/User.js');
// const Exercise = require('../models/Execise.js');
// const moment = require('moment');

const newUser = async function (req, res) {
    let username = req.body.username;
    if (!username) {
        res.status(204).json({ message: 'Insufficient' });
        return;
    };

    const user = await User.findOne({ username: username });
    if (user) {
        res.status(208).json({ message: 'User already exists' });
        return;
    }

    const newUser = new User({ username });
    await newUser.save();

    if (newUser && !newUser.isNew) {
        res.status(201).json({ userId: newUser.userId, username: newUser.username });
        return;
    } else {
        res.status(422).json({ newUser });
    }
};

module.exports = newUser;