const express = require('express');
const seasonController = require('../../controller/products/seasonController');
const { protect, restrictTo } = require('../../middlewares/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(seasonController.get_seasons)
    .post(protect, restrictTo("admin"),seasonController.create_season);

router
    .route('/:id')
    .get(seasonController.get_season)
    .all(protect, restrictTo("admin"))
    .patch(seasonController.update_season)
    .delete(seasonController.delete_season);

module.exports = router;
