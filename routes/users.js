const express = require('express');
const router = express.Router();
const userController = require("../controllers/users");
const checkAuth = require("../middleware/chcek-auth");
const checkAdmin = require("../middleware/check-admin");

router.post('/signup', userController.signup);

router.get('/', checkAuth, userController.getAllUsers);

router.get('/search', checkAuth, userController.search);

router.get('/checkLogin', checkAuth, userController.checkLogin);

router.delete('/:id', checkAuth, checkAdmin, userController.deleteUser);

router.post('/login', userController.login);

router.patch('/updateMyProfile', checkAuth, userController.updateMyProfile);

router.patch('/updatePassword', checkAuth, userController.updatePassword);

router.patch('/:id', checkAuth, checkAdmin, userController.updateUser);

router.post('/activation', userController.sendActivationCode);

router.post('/activate', userController.activateUser);

router.get('/getMyProfile', checkAuth, userController.getMyProfile);

router.post('/forgotPass', checkAuth, userController.forgotPassword);

router.post('/changeForgottenPass', checkAuth, userController.changeForgottenPass);


module.exports = router;