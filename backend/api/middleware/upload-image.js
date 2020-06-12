const multer = require("multer");

// Where and how to store product Images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./productImages/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

// Filter image by type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error("Image upload failed."), false);
    }
};

// Set upload configurations
module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2 MB
    },
    fileFilter: fileFilter,
});
