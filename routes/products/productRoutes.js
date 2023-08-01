const express = require('express');
const { protect, restrictTo } = require('./../../controller/users/authController');
const controller = require('./../../controller/products/productsController');
const reviewRouter = require('./../users/reviewRoutes');

const router = express.Router();

router.use('/:id/reviews', reviewRouter);

router
    .route('/')
    .get(controller.get_products)
    .post(protect, restrictTo("admin"), controller.create_product)

router
    .route('/:id')
    .get(controller.get_product)
    .patch(protect, restrictTo("admin"), controller.update_product)
    .delete(protect, restrictTo("admin"), controller.delete_product)

module.exports = router;