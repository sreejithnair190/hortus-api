const express = require('express');
const accessoryController = require('../../controller/products/accessoryController');
const authController = require('./../../controller/users/authController');

const router = express.Router();

router.use('/:id/reviews', reviewRouter)

router.use(authController.protect);


router
    .route('/')
    .get(accessoryController.get_accessories)
    .post(authController.restrictTo("admin"),accessoryController.create_accessory);

router
    .route('/:id')
    .get(accessoryController.get_accessory)
    .patch(authController.restrictTo("admin"),accessoryController.update_accessory)
    .delete(authController.restrictTo("admin"),accessoryController.delete_accessory);

module.exports = router;
