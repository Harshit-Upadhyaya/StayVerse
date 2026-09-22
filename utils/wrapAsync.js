// we are directly exporting the above wrapAsync fn and will require it in app.js
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}