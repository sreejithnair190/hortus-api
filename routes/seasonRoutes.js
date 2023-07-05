const express = require('express');
const seasonController = require('../controller/seasonController');
const authController = require('../controller/users/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(seasonController.get_seasons)
    .post(authController.restrictTo("admin"),seasonController.create_season);

router
    .route('/:id')
    .get(seasonController.get_season)
    .patch(authController.restrictTo("admin"),seasonController.update_season)
    .delete(authController.restrictTo("admin"),seasonController.delete_season);

module.exports = router;
