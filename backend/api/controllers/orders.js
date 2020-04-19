const Order = require("../models/Order");

exports.ordersGetAll = (req, res, next) => {
    Order.find()
        .select("-__v")
        .populate("product", "-__v")
        .exec()
        .then((docs) =>
            res.status(200).json({
                count: docs.length,
                orders: docs.map((doc) => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: req.protocol + "://" + req.get("host") + req.originalUrl + "/" + doc._id,
                        },
                    };
                }),
            })
        )
        .catch((err) => res.status(500).json({ error: err }));
};
