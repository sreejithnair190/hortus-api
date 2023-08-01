const express = require('express');
const reviewController = require('./../../controller/users/reviewControlller');
const { protect, restrictTo } = require('../../controller/users/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(reviewController.get_reviews)
  .post(
    restrictTo('user'),
    reviewController.reviewMiddleware,
    reviewController.create_review
  );

router
  .route('/:id')
  .get(reviewController.get_review)
  .patch(
    restrictTo('user'),
    reviewController.update_review
  )
  .delete(
    restrictTo('user', 'admin'),
    reviewController.delete_review
  );


module.exports = router;