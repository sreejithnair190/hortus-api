const express = require('express');
const reviewController = require('./../../controller/users/reviewControlller');
const { reviewMiddleware } = require('./../../middlewares/reviewMiddleware');
const { protect, restrictTo } = require('../../middlewares/authMiddleware');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(reviewController.get_reviews)
  .post(
    restrictTo('user'),
    reviewMiddleware,
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