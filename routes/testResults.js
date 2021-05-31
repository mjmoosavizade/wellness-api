const express = require('express');
const router = express.Router();
const multer = require('multer');
const testResultsController = require('../controllers/testResults');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/test-results');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'application/pdf') {
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


router.post("/", upload.single('resultFile'), testResultsController.createTestResult);

router.get("/", testResultsController.getAllResults);

router.get("/:id", testResultsController.getOneResults);

router.delete("/:id", testResultsController.deleteResult);

router.patch("/:id", upload.single('resultFile'), testResultsController.updateResult);

module.exports = router;