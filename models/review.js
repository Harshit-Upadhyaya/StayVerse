const mongoose = require("mongoose");
const Schema = mongoose.Schema; //for convenience, so that we dont have to write mongoose.Schema again and again

//define schema
const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1, //min rating will be 1
        max: 5  //max rating will be 5
    },
    createdAt: {
        type: Date,
        default: Date.now() //when a document is created its createdAt value will be set to current date and time by default
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User" //as review will be created by author which ultimately is a user
    }
});

//create model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;