const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../" });

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // TODO: Check if user can edit his data and maybe add an admin. use userData to get data from logged in user
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed",
        });
    }
    next();
};
