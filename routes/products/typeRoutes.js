const express = require('express');
const typeController = require('../../controller/products/typeController');
const { protect, restrictTo } = require('../../controller/users/authController');


const router = express.Router();


router
    .route('/')
    .get(typeController.get_types)
    .post(protect, restrictTo("admin"),typeController.create_type);

router
    .route('/:id')
    .get(typeController.get_type)
    .all(protect, restrictTo("admin"))
    .patch(typeController.update_type)
    .delete(typeController.delete_type);

module.exports = router;
