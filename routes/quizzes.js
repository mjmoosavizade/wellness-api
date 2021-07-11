const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizzes');
const checkAuth = require('../middleware/chcek-auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/quizzes');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'image/png') {
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

const multipleFiles = upload.fields([{ name: "quizAudio", maxCount: 1 }, { name: "quizIcon", maxCount: 1 }]);


router.post('/', checkAuth, multipleFiles, quizController.createQuiz);

router.get('/', checkAuth, quizController.getAllCategories);

router.get('/:id', checkAuth, quizController.getOneCategories);

router.patch('/:id', multipleFiles, quizController.updateQuiz);

module.exports = router;