const express = require('express');
const authController = require('../../controller/users/authController');
const userController = require('../../controller/users/userController');


const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.get("/me", userController.getMe,userController.get_user)

router.patch("/updateMyPassword", authController.updatePassword);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.get_all_users);


router
  .route("/:id")
  .get(userController.get_user)
  .patch(userController.update_user)
  .delete(userController.delete_user);

module.exports = router;
