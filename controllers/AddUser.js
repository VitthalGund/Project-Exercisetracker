const User = require('../models/User.js');
// const Exercise = require('../models/Execise.js');
// const moment = require('moment');

const newUser = function (req, res) {
    let name = req.body.username;
    if (!name) name = 'Mr/Mrs Doe';

    User.findOne({ name: name })
        .then((user) => {
            if (user) return new Promise((resolve, reject) => reject('User already exists'));
            else return new User({ name }).save();
        })
        .then((newUser) => {
            if (!newUser.isNew) res.json({ userId: newUser.userId, name: newUser.name });
        })
        .catch((error) => res.status(422).json({ error }));
};

module.exports = newUser;