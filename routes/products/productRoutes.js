const express = require('express');
const { protect, restrictTo } = require('../../middlewares/authMiddleware');
const controller = require('./../../controller/products/productsController');
const reviewRouter = require('./../users/reviewRoutes');
const { productImgUpload, resizeProductImage } = require('../../services/multerService');

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
    .patch(productImgUpload, resizeProductImage, controller.update_product)
    .delete(controller.delete_product)

module.exports = router;