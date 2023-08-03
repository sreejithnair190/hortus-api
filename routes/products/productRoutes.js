const express = require('express');
const { protect, restrictTo } = require('../../middlewares/authMiddleware');
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
    .all(protect, restrictTo("admin"))
    .patch(controller.update_product)
    .delete(controller.delete_product)

module.exports = router;