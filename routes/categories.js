const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categories");
const checkAuth = require('../middleware/chcek-auth');


router.get(`/`, categoryController.getAllCategories);

router.get(`/:id`, categoryController.getOneCategory);

router.post(`/`, categoryController.createCategory);

router.delete('/:id', checkAuth, categoryController.deleteCategory);

router.put('/:id', categoryController.updateCategory);

module.exports = router;