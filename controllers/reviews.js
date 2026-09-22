const Listing = require("../models/listing");
const Review = require("../models/review");

// For Post/add review route
module.exports.createReview = async (req, res) => {
    //access the listing with this id to add reviews
    let listing = await Listing.findById(req.params.id);
    
    //create new review by passing the review object(containing rating and comment) that came in the req.body
    let newReview = new Review(req.body.review);
    
    //author of created newReview will bt the user who is logged in (i.e. author set to id of req.user)
    newReview.author = req.user._id; 

    //push newReview in reviews array of listing
    listing.reviews.push(newReview);

    //save in DB
    await newReview.save();
    await listing.save();

    //create/display a new flash message after a new review is created
    req.flash("success", "New Review Created!");  //success is key

    res.redirect(`/listings/${listing._id}`);
};


// For Delete review route
module.exports.deleteReview = async (req, res) => {
    //access listing id and reviewId
    let {id, reviewId} = req.params;

    //delete review from this listing's(with this id) reviews array
    //update-as we are updating the listing by removing a review from reviews
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); //The review of reviews array which will match with this reviewId will be removed/pulled
    
    //Now delete the review with this reviewId from Review model in DB
    await Review.findByIdAndDelete(reviewId);

    //create/display a new flash message after a new review is created
    req.flash("success", "Review Deleted!");  //success is key

    res.redirect(`/listings/${id}`);
};