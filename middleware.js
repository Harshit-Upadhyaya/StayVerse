const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// function to check if user is logged in (authenticated) or not
module.exports.isLoggedIn = (req, res, next) => {
    // if user is not logged in
    if(!req.isAuthenticated()){
        // store req.originalUrl in session object in variable/parameter redirectUrl(any name)
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    // if user is authenticated call next()
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    // if redirectUrl is saved in req.session then store it in res.locals
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


//middleware for server side listing validation
module.exports.validateListing = (req, res, next) => {
    //validate req.body through listingSchema i.e. whether req.body is satisfying the constraints/conditions defined in the listingSchema
    //then extract the error from the result of this
    let {error} = listingSchema.validate(req.body);

    //If there is any error then new error will be thrown
    if(error) {
        let errMsg = error.details.map((element) => element.message).join(","); //extract message from error, will
        //map error details, for every individual element(detail) we will return element's(details's) message and then join them with , .
        throw new ExpressError(400, errMsg);
    } else { //If there is no error after validation
        next();
    }
}


//middleware for server side reviews validation
module.exports.validateReview = (req, res, next) => {
    //validate req.body through reviewSchema, then extract the error from the result of this
    let {error} = reviewSchema.validate(req.body);

    //If there is any error then new error will be thrown
    if(error) {
        let errMsg = error.details.map((element) => element.message).join(","); //extract message from error, will
        //map error details, for every individual element(detail) we will return element's(details's) message and then join them with , .
        throw new ExpressError(400, errMsg);
    } else { //If there is no error after validation
        next();
    }
}


//middleware for listing authentication - to check whether current user of listing is listing's owner or not
module.exports.isOwner = async (req, res, next) => {
    //extract id 
    let { id } = req.params;
    //find the listing which user want to update
    let listing = await Listing.findById(id);
    //if owner of the listing which we want to update is not same as listing's current user, then can't update the listing
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing");
        //redirect to show listing page
        return res.redirect(`/listings/${id}`);
    }

    next();
};

//middleware for review authentication - to check whether current user who want to delete the review is review's owner or not
module.exports.isReviewAuthor = async (req, res, next) => {
    //extract listing's and review's id
    let { id, reviewId } = req.params;
    //find the review which user want to delete
    let review = await Review.findById(reviewId);
    //if author of the review which we want to delete is not same as listing's current user, then can't delete the review
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review");
        //redirect to show listing page
        return res.redirect(`/listings/${id}`);
    }

    next();
};