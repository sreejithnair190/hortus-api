const express = require('express');
const reviewController = require('./../../controller/users/reviewControlller');
const authController = require('./../../controller/users/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.get_reviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourAndUserIds,
    reviewController.create_review
  );

router
  .route('/:id')
  .get(reviewController.get_review)
  .patch(
    authController.restrictTo('user'),
    reviewController.update_review
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.delete_review
  );


module.exports = router;