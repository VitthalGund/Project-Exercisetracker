const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./routes/exercise")
require("dotenv").config();

// Configuration
mongoose.connect(process.env.URI);

app.use(cors());

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());

app.use(express.static('public'));

// Routes
app.use('/api/exercise', router);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



// Not found middleware
app.use((req, res, next) => {
  return next({
    status: 404,
    message: 'not found'
  });
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }
  res.status(errCode).json({ error: errMessage });
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});