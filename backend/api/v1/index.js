var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello v1 GET API");
});

router.post("/", (req, res) => {
    res.send("Hello v1 POST API");
});

module.exports = router;