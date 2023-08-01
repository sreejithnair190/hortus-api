const express = require('express');
const Categories = require('../../model/products/categoryModel');
const authController = require('../../controller/users/authController');
const categoryController = require('../../controller/products/categoryController');


const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));

router
    .route('/')
    .get(categoryController.get_categories)
    .post(categoryController.create_category)

router
    .route('/:id')
    .get(categoryController.get_category)
    .patch(categoryController.update_category)
    .delete(categoryController.delete_category)


module.exports = router;