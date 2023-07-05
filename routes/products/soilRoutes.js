const express = require('express');
const soilController = require('../../controller/products/soilController');
const authController = require('./../../controller/users/authController');
const reviewRouter = require('./../../routes/users/reviewRoutes')

const router = express.Router()

router.use('/:id/reviews', reviewRouter)

router.use(authController.protect);

router
    .route('/')
    .get( soilController.get_soils )
    .post( authController.restrictTo("admin"),soilController.create_soils )

router
    .route('/:id')
    .get(soilController.get_soils)
    .patch(authController.restrictTo("admin"),soilController.update_soils)
    .delete(authController.restrictTo("admin"),soilController.delete_soils)

module.exports = router