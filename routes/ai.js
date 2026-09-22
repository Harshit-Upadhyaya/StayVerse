const express = require("express");
const router = express.Router(); //create a router object
const aiController = require("../controllers/ai"); //require aiController and ai route's callbacks

router.get("/", (req, res) => {
    res.render("ai.ejs");
});

router.post("/chat", aiController.chat);

module.exports = router;