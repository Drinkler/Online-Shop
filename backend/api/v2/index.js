var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello v2 GET API");
});

router.post("/", (req, res) => {
    res.send("Hello v2 POST API");
});

module.exports = router;
