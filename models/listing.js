const mongoose = require("mongoose");
const Schema = mongoose.Schema; //for convenience, so that we dont have to write mongoose.Schema again and again
const Review = require("./review.js");

//define schema
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    category: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"  //reference Review model
        }
    ],
    //there will be a single owner for a listing
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"  //reference User model
    },
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
});

//Delete middleware for reviews
listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

//create model
const Listing = mongoose.model("Listing", listingSchema);

//To export model Listing in app.js
module.exports = Listing;

