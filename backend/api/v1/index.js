var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello v1.0 GET API");
});

router.post("/", (req, res) => {
    res.send("Hello v1.0 POST API");
});

module.exports = router;
