const express = require('express');
const typeController = require('../../controller/products/typeController');
const authController = require('../../controller/users/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(typeController.get_types)
    .post(authController.restrictTo("admin"),typeController.create_type);

router
    .route('/:id')
    .get(typeController.get_type)
    .patch(authController.restrictTo("admin"),typeController.update_type)
    .delete(authController.restrictTo("admin"),typeController.delete_type);

module.exports = router;
