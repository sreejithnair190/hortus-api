const express = require('express');
const fertilizerController = require('../../controller/products/fertilizerController');
const authController = require('./../../controller/users/authController');
const reviewRouter = require('./../../routes/users/reviewRoutes')

const router = express.Router()

router.use('/:id/reviews', reviewRouter)

router.use(authController.protect);

router
    .route('/')
    .get( fertilizerController.get_fertilizers )
    .post( authController.restrictTo("admin"),fertilizerController.create_fertilizers )

router
    .route('/:id')
    .get(fertilizerController.get_fertilizers)
    .patch(authController.restrictTo("admin"),fertilizerController.update_fertilizers)
    .delete(authController.restrictTo("admin"),fertilizerController.delete_fertilizers)

module.exports = router