const User = require('../models/User.js');
const Exercise = require('../models/Exercise.js');
const moment = require('moment');

const addExercise = function (req, res) {
    // Dates are coming in in this format = 'YYYY-MM-DD';
    let { userId, description, duration, date } = req.body;
    // console.log('description:', description, ' - duration: ', duration, ' - date: ', date);
    if (!description) description = 'No description provided';
    if (!duration) duration = '0';
    if (!date) date = moment();

    User.findOne({ userId })
        .then((userInfo) => {
            if (userInfo) {
                const exercise = new Exercise({ description, duration, date });
                exercise.userId.push(userInfo);
                userInfo.exercises.push(exercise);
                return Promise.all([exercise.save(), userInfo.save()]);
            }
            else return new Promise((resolve, reject) => reject('UserId not found'));
        })
        .then((exercise) => {
            if (!exercise.isNew) res.json({ userId, description, duration, date: moment(date).format('D MMM, YYYY') });
            else return new Promise((resolve, reject) => reject('Exercise could not be saved'));
        })
        .catch((error) => res.status(422).json({ error }));
};

module.exports = addExercise;