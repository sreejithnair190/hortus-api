const express = require('express');
const fertilizerController = require('../../controller/products/fertilizerController');
const authController = require('./../../controller/users/authController');

const router = express.Router()

router.use(authController.protect);

router
    .route('/')
    .get( fertilizerController.get_fertilizers )
    .post( fertilizerController.create_fertilizers )

router
    .route('/:id')
    .get(fertilizerController.get_fertilizers)
    .patch(fertilizerController.update_fertilizers)
    .delete(fertilizerController.delete_fertilizers)

module.exports = router