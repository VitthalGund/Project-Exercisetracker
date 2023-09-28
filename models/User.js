const id = require("mongoose-shortid-nodeps");
const mongoose = require("mongoose");
// mongoose.plugin(schema => {
//     schema.options.usePushEach = true;
// }); // Needed since Mongo 3.6.2, The $pushAll operator is no longer supported in earlier versions

// the model to work with
const UserSchema = new mongoose.Schema({
    userId: {
        type: id,
        unique: true,
        len: 4,
        base: 62
    },
    name: String,
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "exercise"
        }
    ],
});

UserSchema.virtual("total").get(function () {
    return this.exercises.length;
});

// Create the model class and Exporting the model
module.exports = mongoose.model("user", UserSchema);