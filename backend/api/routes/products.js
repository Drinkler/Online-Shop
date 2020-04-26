const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const ProductsController = require("../controllers/products");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        // cb (new Error("message"), false)
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2 MB
    },
    fileFilter: fileFilter,
});

// TODO : Check Auth
// TODO : Upload Images

router.get("/", ProductsController.getAllProducts);

router.get("/:productId", ProductsController.getProduct);

router.post("/", ProductsController.saveProduct);

router.patch("/:productId", ProductsController.updateProduct);

router.delete("/:productId", ProductsController.deleteProduct);

// * Old version with docs.map
// router.get("/", (req, res, next) => {
//     Product.find()
//         .select("-__v")
//         .exec()
//         .then((docs) => {
//             const response = {
//                 count: docs.length,
//                 products: docs.map((doc) => {
//                     return {
//                         _id: doc._id,
//                         name: doc.name,
//                         price: doc.price,
//                         request: {
//                             type: "GET",
//                             url: req.protocol + "://" + req.get("host") + req.originalUrl + doc._id,
//                         },
//                     };
//                 }),
//             };
//             res.status(200).json(response);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// });

// * Old version with checkAuth and picture upload
// router.post("/", checkAuth, upload.single("productImage"), (req, res, next) => {
//     console.log(req.file);
//     const product = new Product({
//         name: req.body.name,
//         price: req.body.price,
//         productImage: req.file.path,
//     });
//     product
//         .save()
//         .then((result) => {
//             res.status(200).json({
//                 message: "Product saved successfully.",
//                 ok: 1,
//                 createdProduct: {
//                     _id: result._id,
//                     name: result.name,
//                     price: result.price,
//                     request: {
//                         type: "GET",
//                         url: req.protocol + "://" + req.get("host") + req.originalUrl + result._id,
//                     },
//                 },
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// });

module.exports = router;
