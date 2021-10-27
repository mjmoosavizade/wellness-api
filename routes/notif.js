const express = require('express');
const router = express.Router();
const notifController = require('../controllers/notif');
const checkAuth = require('../middleware/chcek-auth');

router.post('/', checkAuth, notifController.createNotif);

router.get('/', checkAuth, notifController.getMyNotifs);

router.delete('/:id', checkAuth, notifController.deleteNotif);

module.exports = router;