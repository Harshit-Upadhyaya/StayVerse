const Listing = require("../models/listing"); //require Listing model
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); //require geocoding services from Mapbox SDK
const mapToken = process.env.MAP_TOKEN; // require access token for map
const geocodingClient = mbxGeocoding({ accessToken: mapToken }); // create a geocodingClient using the map access token
                                                                //this geoCoding client will help to perform geocoding

// For Index route, this async function index will render all listings
module.exports.index = async (req, res) => {
    // extract the searched (search) value, as well as the category from query string
    const { search, category } = req.query;
    // create an empty filter which is initially empty
    let filter = {};

    //Check whether the user actually searched
    if (search && search.trim() !== "") { //Only create a search filter if the user actually entered something.
        //search the listing's title OR location OR country for the searched value
        filter = {
            $or: [
                { title: { $regex: search.trim(), $options: "i" } },
                { location: { $regex: search.trim(), $options: "i" } },
                { country: { $regex: search.trim(), $options: "i" } }
            ]
        };
    }
    
    let allListings;
    // Trending means listings with the most reviews
    if (category && category.trim() === "Trending") {
        allListings = await Listing.find({
            ...filter,
            "reviews.0": { $exists: true }
        })

        // Sort listings by number of reviews
        allListings.sort((a, b) => {
            return b.reviews.length - a.reviews.length;
        });

        // Show only the top 6
        allListings = allListings.slice(0, 6);

    } else {
        if (category && category.trim() !== "") {
            filter.category = category.trim();  //Make a key category in filter object and set it's value to the category recieved from query string
        }

        allListings = await Listing.find(filter); //give the listings matching with search condition/value if filter has a value otherwise return all listings.
    }
    
    res.render("listings/index.ejs", {
        allListings,
        searchQuery: search || "",
        selectedCategory: category || ""
    });
};

// For New route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// For Show route
module.exports.showListing = async (req, res) => {
    //extract id
    let {id} = req.params;
    //find listing/document with this id to show
    const listing = await Listing.findById(id)
      .populate({ //populate all reviews of listing with their details.
        path: "reviews", 
        populate: {
            path: "author",
        },
      })
      .populate("owner"); //populate owner of listing with its details.

    if(!listing) { //If listing does not exist
        req.flash("error", "The requested listing does not exist!"); //create/display a new flash message 
        return res.redirect("/listings"); // and redirect to all listings page
    }

    res.render("listings/show.ejs", { listing });
};

// For Create route
module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
    .send();

    //extract file's/photo's path and filename from req.file object
    let url = req.file.path;
    let filename = req.file.filename;

    //extract details from form and req object
    const newListing = new Listing(req.body.listing); //creating a new listing (Listing is model name)

    newListing.owner = req.user._id; //associate owner with the listing i.e. add current owner(the user who has created it) to the newListing
    newListing.image = {url, filename}; //set newListing's image field's url and filename

    newListing.geometry = response.body.features[0].geometry; //set newListing's geometry field to the geometry returned from the Mapbox i.e. save newListings geometry in DB

    //save newListing in DB
    let savedListing = await newListing.save();
    console.log(savedListing);

    //create/display a new flash message after the new listing is created
    req.flash("success", "New Listing Created!"); //success is key

    //redirect to /listings page
    res.redirect("/listings");
};

// For Edit route
module.exports.renderEditForm = async (req, res) => {
    //extract id
    let { id } = req.params;
    //find listing/document with this id to edit
    const listing = await Listing.findById(id); 

    if(!listing) { //If listing does not exist
        req.flash("error", "The requested listing does not exist!"); //create/display a new flash message 
        return res.redirect("/listings"); // and redirect to all listings page
    }
    
    // For image preview on edit.ejs page
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// For Update route
module.exports.updateListing = async (req, res) => {
    //extract id 
    let { id } = req.params;

    // Convert the updated location into new coordinates using Mapbox
    let response = await geocodingClient.forwardGeocode({
        query: `${req.body.listing.location}, ${req.body.listing.country}`,
        limit: 1
    }).send();

    //extract the listing from form(edit.ejs) and update in Listing model of our DB.
    let updatedListing = await Listing.findByIdAndUpdate(
        id, 
        {
            ...req.body.listing, //...req.body.listing i.e. we will deconstruct
                                 // req.body.listing, it is an object in which it has all the parameters(title,desc,img,loc,country),
                                 // we will deconstruct it and convert parameters into individual values and will update the listing.
    
            geometry: response.body.features[0].geometry // Update new geometry
        }, 
        { new: true }
    ); 
    
    // If a new image was uploaded, update the image
    if(typeof req.file !== "undefined"){
        //extract file's/photo's path and filename from req.file object
        let url = req.file.path;
        let filename = req.file.filename;
        //set updatedListing's image field's url and filename
        updatedListing.image = { url, filename};
        // save updatedListing with new file/photo in DB
        await updatedListing.save();
    }

    //create/display a new flash message after the a listing is updated
    req.flash("success", "Listing Updated!"); //success is key

    res.redirect(`/listings/${id}`); //as we want to redirect to show.ejs i.e. to that updated listing only
};

// For Delete route
module.exports.deleteListing = async (req, res) => {
    //extract id
    let { id } = req.params;
    // find and delete the listing from DB
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing); //to log on console which listing is deleted from DB
    
    //create/display a new flash message after a listing is deleted
    req.flash("success", "Listing Deleted!"); //success is key
    
    res.redirect("/listings");
};