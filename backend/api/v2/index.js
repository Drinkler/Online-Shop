var express = require("express");
var router = express.Router();

router.all("/", (req, res) => {
    res.send("Dies ist die zweite Version der REST-API.");
});

module.exports = router;
