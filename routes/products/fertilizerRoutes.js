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
    .post( fertilizerController.create_fertilizer )

router
    .route('/:id')
    .get(fertilizerController.get_fertilizer)
    .patch(fertilizerController.update_fertilizer)
    .delete(fertilizerController.delete_fertilizer)

module.exports = router