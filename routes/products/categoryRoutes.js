const express = require('express');
const { protect, restrictTo } = require('../../controller/users/authController');
const categoryController = require('../../controller/products/categoryController');


const router = express.Router();

router
    .route('/')
    .get(categoryController.get_categories)
    .post(protect, restrictTo('admin'), categoryController.create_category)

router
    .route('/:id')
    .get(categoryController.get_category)
    .all(protect, restrictTo("admin"))
    .patch(categoryController.update_category)
    .delete(categoryController.delete_category)


module.exports = router;