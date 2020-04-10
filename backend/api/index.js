const express = require("express");
const router = express.Router();

router.use("/v1", require("./v1"));
router.use(["/v2", "/latest"], require("./v2"));

module.exports = router;
