const express = require('express');
const authController = require('../../controller/users/authController');
const userController = require('../../controller/users/userController');
const { userImgUpload, resizeUserImage } = require('../../services/multerService')
const { protect, restrictTo } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(protect);

router
    .route("/me")
    .get( userController.getMe, userController.get_user)
    .delete(userController.deleteMe)
    .patch(userImgUpload, resizeUserImage, userController.updateMe)

router.patch("/updateMyPassword", authController.updatePassword);

router.use(restrictTo("admin"));

router.route("/").get(userController.get_all_users);

router
  .route("/:id")
  .get(userController.get_user)
  .patch(userController.update_user)
  .delete(userController.delete_user);

module.exports = router;
