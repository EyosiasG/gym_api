// routes/user.route.js
const express = require('express');
const UserController = require("../controllers/user.controller");
const verifyToken = require("../middleware/authMiddleware");
const upload = require('../middleware/upload.middleware.js');
const router = express.Router();

router.post('/register', upload.single('image'), UserController.registerUser);     // Register route
router.post('/login', UserController.loginUser);           // Login route
router.get('/profile', verifyToken, UserController.getUserDetails);  // Protected route to get user details
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getAllActiveMembersCount', UserController.getAllActiveMembersCount);
router.get('/getAllActiveMembers', UserController.getAllActiveMembers);
router.get('/getAllInactiveMembers', UserController.getAllInactiveMembers);
router.post('/register', UserController.registerUser); 

module.exports = router;
