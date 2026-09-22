const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

// Define Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// We need to plugin passport-local-mongoose into our User schema
userSchema.plugin(passportLocalMongoose);

//export User model
module.exports = mongoose.model("User", userSchema);