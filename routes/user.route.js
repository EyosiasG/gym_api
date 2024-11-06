// routes/user.route.js
const express = require('express');
const UserController = require("../controllers/user.controller");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/register', UserController.registerUser);     // Register route
router.post('/login', UserController.loginUser);           // Login route
router.get('/profile', verifyToken, UserController.getUserDetails);  // Protected route to get user details
router.get('/getAllUsers', UserController.getAllUsers);

router.post('/register', UserController.registerUser); 

module.exports = router;
