const express = require('express');
const plantController = require('../../controller/products/plantController')
const authController = require('./../../controller/users/authController');
const reviewRouter = require('./../../routes/users/reviewRoutes')

const router = express.Router()

router.use('/:id/reviews', reviewRouter)


router
    .route('/')
    .get(plantController.get_plants)
    .post(authController.protect,authController.restrictTo("admin"),plantController.create_plant)

router
    .route('/:id')
    .get(plantController.get_plant)
    .patch(authController.protect,authController.restrictTo("admin"),plantController.update_plant)
    .delete(authController.protect,authController.restrictTo("admin"),plantController.delete_plant)



module.exports = router