const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categories");



router.get(`/`, categoryController.categoriesGetAll);

router.post(`/`, categoryController.categoryCreate);

module.exports = router;