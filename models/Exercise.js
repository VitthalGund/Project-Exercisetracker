const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// the model to work with
const ExerciseSchema = new Schema({
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    description: String,
    duration: Number,
    date: Date
});

// Create the model class and Exporting the model
module.exports = mongoose.model("exercise", ExerciseSchema);;