const express = require('express');
const plantController = require('../controller/plantController')
const authController = require('../controller/authController')


const router = express.Router()

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