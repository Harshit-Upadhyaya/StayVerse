if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); //require User model

const listingRouter = require("./routes/listing.js"); //require listings routes
const reviewRouter = require("./routes/review.js"); //require review routes
const userRouter = require("./routes/user.js"); //require user routes
const aiRouter = require("./routes/ai.js"); //require ai routes


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true})); //to parse form data coming in the request
app.use(express.json()); //to parse JSON data coming in the request
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


//connect to DB
const DB_URL = process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(DB_URL);
}

//mongo session store
const store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

//session options
const sessionOptions = {
    store: store, // mongo session store info in session
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // cookie will expire after 7 days from today's 
                      // date (we will calculate in miliseconds as date.now() returns in miliseconds)
                      // i.e. 7 days, 24 hrs, 60 mins, 60 secs, 1000 milisecs
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,  // for security from cross-site scripting attacks
    }
};

//session middleware
app.use(session(sessionOptions));

//flash middleware
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//storing flash msgs, and other other things in res.locals
app.use((req, res, next) => {
    res.locals.success = req.flash("success"); // local variable success will store info of req.flash("success")
    res.locals.error = req.flash("error"); // error will store req.flash("error")
    res.locals.currUser = req.user; // local variable currUser will store info of req.user
    next();
});

app.use("/listings", listingRouter); //all those paths that start from /listings will use listingRouter(./routes/listing.js)

app.use("/listings/:id/reviews", reviewRouter); //all those paths that start from /listings/:id/reviews will use reviewRouter(./routes/review.js)

app.use("/", userRouter); //all those paths that start from / will use userRouter(./routes/user.js)

app.use("/ai", aiRouter); //all those paths that start from /ai will use aiRouter(./routes/ai.js)


app.get("/privacy", (req, res) => {
    res.render("privacy.ejs");
});

app.get("/terms", (req, res) => {
    res.render("terms.ejs");
});

app.use((req, res, next) => { //if above routes does not match with any incoming rqst, then it will match here, with all incoming requests.
    next(new ExpressError(404, "Page Not Found!"));
});

//Error Handling middleware
app.use((err, req, res, next) => {
    // Handle invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(404).render("error.ejs", {
            message: "The requested resource was not found."
        });
    }

    //Deconstruct ExpressError
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message});
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});