const express = require('express');
const authController = require('../../controller/users/authController');
const userController = require('../../controller/users/userController');


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
//router.post('/resetPassword', authController.resetPassword);

router
    .route('/')
    .get( authController.protect, authController.restrictTo('admin'), userController.get_all_users )

router
    .route('/:id')
    .get(authController.protect, authController.restrictTo('admin'),userController.get_user)
    .patch(authController.protect, authController.restrictTo('admin'),userController.update_user)
    .delete(authController.protect, authController.restrictTo('admin'),userController.delete_user)


module.exports = router