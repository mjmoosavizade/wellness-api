const express = require('express');
const router = express.Router();
const userController = require("../controllers/users");
const checkAuth = require("../middleware/chcek-auth");
const checkAdmin = require("../middleware/check-admin");

router.post('/signup', userController.signup);

router.get('/', userController.getAllUsers);

router.get('/search', userController.search);

router.delete('/:id', checkAuth, checkAdmin, userController.deleteUser);

router.post('/login', userController.login);

router.patch('/:id', userController.updateUser);


module.exports = router;