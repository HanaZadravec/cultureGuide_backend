const express = require('express');
const router= express.Router();
const eventController = require('../controllers/eventController');

router.get('/updateStatus', eventController.updateStatus);
router.get('/getAllEvents', eventController.getAllEvents);
router.post('/event/:eventId/register', eventController.registerForEvent);
module.exports = router;