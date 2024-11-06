// routes/user.route.js
const express = require('express');
const SessionController = require("../controllers/session.controller");

const router = express.Router();

router.post('/createSession', SessionController.createSession);     // Register route
router.get('/getAllSessions', SessionController.getAllSessions);    // Get all sessions route

module.exports = router;