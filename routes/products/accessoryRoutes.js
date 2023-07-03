const express = require('express');
const accessoryController = require('../../controller/products/accessoryController');
const authController = require('./../../controller/users/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(accessoryController.get_accessories)
    .post(accessoryController.create_accessory);

router
    .route('/:id')
    .get(accessoryController.get_accessory)
    .patch(accessoryController.update_accessory)
    .delete(accessoryController.delete_accessory);

module.exports = router;
