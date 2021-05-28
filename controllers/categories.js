const { Category } = require('../models/categories');

exports.categoriesGetAll = (req, res) => {
    Category.find().then(categoryList => {
        if (!categoryList) {
            res.status(204).json({ success: false, message: 'No Content' });
        } else {
            res.status(200).json({ success: true, data: categoryList });
        }
    }).catch(err => {
        res.status(500).json({ success: false, message: err })
    });

};

exports.categoryCreate = (req, res) => {
    const category = new Category({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
        image: req.body.image,
    });
    category.save().then(createdCategory => {
        res.status(201).json(createdCategory)
    }).catch(err => {
        res.status(500).json({
            error: err,
            success: false
        })
    });
}