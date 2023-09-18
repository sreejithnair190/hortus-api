const express = require('express');
const { protect, restrictTo } = require('./../../middlewares/authMiddleware');
const orderController = require("./../../controller/orders/orderController");

const router = express.Router();


router
    .route("/")
    .all(protect)
    .get(restrictTo('admin'), orderController.getOrders);

router
    .route('/checkout-session')
    .all(protect)
    .get(orderController.checkoutSession);

module.exports = router;