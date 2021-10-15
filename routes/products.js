const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const multer = require('multer');
const checkAuth = require('../middleware/chcek-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

router.get(`/`, productController.getAllProducts);

router.post(`/`, upload.single('image'), productController.createProduct);

router.get(`/search`, productController.searchProducts);

router.post(`/cart`, checkAuth, productController.newCart);

router.delete(`/cart/:id`, checkAuth, productController.deleteCartItem);

router.patch(`/cart/:id`, checkAuth, productController.editCartItem);

router.get(`/cart/:id`, checkAuth, productController.getMyCart);

module.exports = router;