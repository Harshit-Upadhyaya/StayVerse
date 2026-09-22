const express = require("express");
const router = express.Router(); // create a router object
const User = require("../models/user.js"); //require User model
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js"); //require userController and users route's callbacks

// GET - signup route and POST - signup route
router.route("/signup")
.get(userController.renderSignUpForm) //GET - signup route
.post(wrapAsync(userController.signUp)); //POST - signup route

// GET - login route and POST - login route
router.route("/login")
.get(userController.renderLoginForm) //GET - login route
.post(  //POST - login route
    saveRedirectUrl,
    passport.authenticate("local", { 
      failureRedirect: '/login',
      failureFlash: true
    }), 
    userController.login
);

// GET - logout route
router.get("/logout", userController.logout);

module.exports = router;