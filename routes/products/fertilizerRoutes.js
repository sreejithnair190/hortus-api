const express = require('express');
const fertilizerController = require('../../controller/products/fertilizerController');
const authController = require('./../../controller/users/authController');
const reviewRouter = require('./../../routes/users/reviewRoutes')

const router = express.Router()

router.use('/:id/reviews', reviewRouter)


router
    .route('/')
    .get( fertilizerController.get_fertilizers )
    .post( authController.protect,authController.restrictTo("admin"),fertilizerController.create_fertilizer )

router
    .route('/:id')
    .get(fertilizerController.get_fertilizer)
    .patch(authController.protect,authController.restrictTo("admin"),fertilizerController.update_fertilizer)
    .delete(authController.protect,authController.restrictTo("admin"),fertilizerController.delete_fertilizer)

module.exports = router