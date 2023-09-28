const User = require('../models/User');

const getUsers = async function (req, res, next) {
    let ret = {};
    const users = await User.find({})
    if (users) {
        ret = users.map(el => ({
            username: el.username,
            _id: el._id
        }));
        console.log(ret)
        res.json(ret);
    } else {
        next(err, { message: 'no users found' });
    }

}

module.exports = getUsers;