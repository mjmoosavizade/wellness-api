const express = require('express');
const router = express.Router();
const userController = require("../controllers/users");

router.post('/signup', userController.signup);

router.get('/', userController.getAllUsers);

router.get('/search', userController.search);

router.delete('/:id', userController.deleteUser);

router.post('/login', userController.login);

module.exports = router;