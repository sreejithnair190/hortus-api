const express = require('express');
const seedController = require('../../controller/products/seedController');

const router = express.Router()

router
    .route('/')
    .get( seedController.get_seeds )
    .post( seedController.create_seed )

router
    .route('/:id')
    .get(seedController.get_seed)
    .patch(seedController.update_seed)
    .delete(seedController.delete_seed)

module.exports = router