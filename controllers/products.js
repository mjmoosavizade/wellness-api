const { Product } = require('../models/products');

exports.getAllProducts = (req, res) => {
    res.send('hello API')
};

exports.createProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    });
    product.save().then(createdProduct => {
        res.status(201).json(createdProduct)
    }).catch(err => {
        res.status(500).json({
            error: err,
            success: false
        })
    });
};