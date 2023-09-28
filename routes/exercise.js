const express = require('express');
const router = express.Router();
const AddUser = require("../controllers/AddUser");
const AddExercise = require('../controllers/AddExercise');
const ShowLogs = require('../controllers/ShowLogs');


router.post('/new-user', AddUser);

router.post("/add", AddExercise);

// router.get('/users', userHandler.getUsers);

router.get("/log", ShowLogs);

module.exports = router;