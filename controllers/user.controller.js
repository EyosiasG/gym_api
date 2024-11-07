// controllers/userController.js
const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // Register a new user
    registerUser: async (req, res) => {
      try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
  
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          dateOfBirth: req.body.dateOfBirth,
          phoneNumber: req.body.phoneNumber,
          membershipType: req.body.membershipType,
          remark: req.body.req,
          subscriptionType: req.body.subscriptionType,
          emergencyContactName: req.body.emergencyContactName,
          emergencyContactNumber: req.body.emergencyContactNumber,
          status: req.body.status,
          role: req.body.role

        });
  
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    // Authenticate and log in a user
    loginUser: async (req, res) => {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        const token = jwt.sign({ email: user.email }, 'secret');
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    // Get user details (protected route)
    getUserDetails: async (req, res) => {
      try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ 
            username: user.username, 
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            honeNumber: user.phoneNumber,
            membershipType: user.membershipType,
            remark: user.req,
            subscriptionType: user.body.subscriptionType,
            emergencyContactName: user.emergencyContactName,
            emergencyContactNumber: user.emergencyContactNumber,
            status: user.status,
            role: user.role
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getAllUsers: async (req, res) => {
      try {
          // Parse limit and offset from query parameters, with defaults
          const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
          const offset = parseInt(req.query.offset) || 0; // Default offset to 0 if not provided
  
          // Fetch users with limit and offset
          const users = await User.find().skip(offset).limit(limit);
  
          res.status(200).json(users); 
      } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
      }
    },

    getAllActiveMembers: async (req, res) => {
      try{
        const activeMembers = await User.find({status: 'active'});
        res.status(200).json({activeMembers});
      }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: 'Internal Server Error'});
      }
    },

    getAllInactiveMembers: async (req, res) => {
      try{
        const inactiveMembers = await User.find({status: 'inactive'});
        res.status(200).json({inactiveMembers});
      }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: 'Internal Server Error'});
      }
    },

    getAllActiveMembersCount: async (req, res) => {
      try{
        const activeUsersCount = await User.countDocuments({status: 'active'});
        res.status(200).json({activeUsersCount});
      }catch(error){
        console.log("Error: ", error);
        res.status(500).json({error: 'Internal Server Error'});
      }
    }
  };
