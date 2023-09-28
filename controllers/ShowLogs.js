const User = require('../models/User.js');
const moment = require('moment');

const showLogs = function (req, res) {
    const { userIdLogs, fromDate, toDate } = req.query;
    var populateExercises = (from, to) => {
        let params = {
            path: 'exercises',
            select: 'description duration date',
            options: { sort: { date: -1 } }
        };

        if (from && to) params.match = { date: { $gte: from, $lte: to } };
        else if (from) params.match = { date: { $gte: from } };
        else if (to) params.match = { date: { $lte: to } };
        return params;
    };

    // see if the userId exists
    User.findOne({ userId: userIdLogs })
        .populate(populateExercises(fromDate, toDate))
        .then((user) => {
            if (!user) return new Promise((resolve, reject) => reject('UserId not found'));
            else {
                const { userId, name } = user;
                res.json({
                    search: { userId, name, fromDate, toDate },
                    total: user.total,
                    exercises: user.exercises.map(function (exercise) {
                        return {
                            _id: exercise._id,
                            description: exercise.description,
                            duration: exercise.duration,
                            date: moment(exercise.date).format('D MMM, YYYY')
                        };
                    })
                });
            }
        })
        .catch((error) => res.status(422).json({ error }));
};

module.exports = showLogs;