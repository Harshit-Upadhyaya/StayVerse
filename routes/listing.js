const express = require("express");
const router = express.Router(); //create a router object
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js"); //require listingController and listings route's callbacks
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 

// index and Create routes
router.route("/")
.get(wrapAsync(listingController.index)) //index route
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)); //Create route

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update, and Delete routes
router.route("/:id")
.get(wrapAsync(listingController.showListing)) //Show route
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing)) //Update route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); //Delete route

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;