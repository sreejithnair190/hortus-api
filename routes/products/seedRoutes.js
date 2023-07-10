const express = require('express');
const seedController = require('../../controller/products/seedController');
const authController = require('./../../controller/users/authController');
const reviewRouter = require('./../../routes/users/reviewRoutes')

const router = express.Router()

router.use('/:id/reviews', reviewRouter)



router
    .route('/')
    .get( seedController.get_seeds )
    .post(authController.protect,authController.restrictTo("admin"), seedController.create_seed )

router
    .route('/:id')
    .get(seedController.get_seed)
    .patch(authController.protect,authController.restrictTo("admin"),seedController.update_seed)
    .delete(authController.protect,authController.restrictTo("admin"),seedController.delete_seed)

module.exports = router