const Session = require('../models/session.model');

module.exports = {
    // Create a new session
    createSession: async (req, res) => {
        try {
            const newSession = new Session({
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                time: req.body.date,
                type: req.body.type,
                trainer: "672a2b2982bd376abb24d1b6"  // Trainer's ID from the token
            });

            await newSession.save();
            res.status(201).json({ message: 'Session created successfully', session: newSession });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllSessions: async (req, res) => {
        try {
            // Parse limit and offset from query parameters, with defaults
            const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
            const offset = parseInt(req.query.offset) || 0; // Default offset to 0 if not provided
  
          // Fetch sessions with limit and offset
            const sessions = await Session.find().skip(offset).limit(limit);
            res.status(200).json(sessions);
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({error: 'Internal Server Error' });
        }
    }

    // Additional session-related methods (e.g., getSessions, deleteSession, etc.) can be added here
}