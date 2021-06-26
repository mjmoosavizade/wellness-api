const express = require('express');
const router = express.Router();
const userController = require("../controllers/users");
const checkAuth = require("../middleware/chcek-auth");
const checkAdmin = require("../middleware/check-admin");

router.post('/signup', userController.signup);

router.get('/', checkAuth, userController.getAllUsers);

router.get('/search', checkAuth, userController.search);

router.delete('/:id', checkAuth, checkAdmin, userController.deleteUser);

router.post('/login', userController.login);

router.patch('/:id', checkAuth, userController.updateUser);

router.post('/activation', userController.sendActivationCode);

router.post('/activate', userController.activateUser);

router.get('/getOne', checkAuth, userController.getOneUser);


module.exports = router;