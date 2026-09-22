const User = require("../models/user");

// For GET - signup route
module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};

// For POST - signup route
module.exports.signUp = async (req, res, next) => {
    try{
        //extract username, email and password from req body
        let {username, email, password} = req.body;
        //create new user with User model
        const newUser = new User({email, username});
        //register newUser in DB
        const registeredUser = await User.register(newUser, password);

        // after successfully signing up, automatically login the registeredUser.
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to StayVerse"); //flash message when user is registered and logged in successfully
            res.redirect("/listings");
        });

    } catch(e) {
        req.flash("error", e.message); //error flash message if any error occurs while registering
        res.redirect("/signup");
    }
};

// For GET - login route
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// For POST - login route
module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to StayVerse!");
    //if redirectUrl exists(not undefined) in res.locals then store it in redirectUrl otherwise store "/listings" in it.
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

// For GET - logout route
module.exports.logout = (req, res, next) => {
    req.logout((err) => {  //if an error encounters at the time of logout, then it is stored in err, if not then err will be undefined/empty
        if(err) { // if an error is encountered at the time of logout
            return next(err);
        }
        //if error is not encountered then logout successfully
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
};
