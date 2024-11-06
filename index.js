// Importing required modules
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.route');
const sessionRoutes = require('./routes/session.route');
const transactionRoutes = require('./routes/transaction.route');

// Creating an Express application instance
const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://eyosiasgezahegn28:Eyos1818!@cluster0.cqjzwer.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use('/user', userRoutes);
app.use('/session', sessionRoutes);
app.use('/transaction', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the User Registration and Login API!');
});
