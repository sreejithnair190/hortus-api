const express = require('express');
const plantController = require('../../controller/products/plantController')
const authController = require('./../../controller/users/authController');
const reviewRouter = require('./../../routes/users/reviewRoutes')

const router = express.Router()

router.use('/:id/reviews', reviewRouter)

router.use(authController.protect);

router
    .route('/')
    .get(plantController.get_plants)
    .post(plantController.create_plant)

router
    .route('/:id')
    .get(plantController.get_plant)
    .patch(plantController.update_plant)
    .delete(plantController.delete_plant)



module.exports = router