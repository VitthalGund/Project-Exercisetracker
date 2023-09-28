const express = require('express');
const router = express.Router();
const AddUser = require("../controllers/AddUser");
const GetUsers = require("../controllers/GetUsers");
const AddExercise = require('../controllers/AddExercise');
const ShowLogs = require('../controllers/ShowLogs');


router.post('/users', AddUser);
router.get('/users', GetUsers);

router.post("/users/:_id/exercises", AddExercise);

// router.get('/users', userHandler.getUsers);

router.get("/users/:_id/logs?[from][&to][&limit]", ShowLogs);

module.exports = router;