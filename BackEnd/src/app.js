
// Importing the express module
const express = require('express');

const cors = require('cors'); // Importing the CORS middleware to handle Cross-Origin Resource Sharing

const aiRoutes = require('./routes/ai.routes'); // Importing the AI routes module

// Creating an instance of express. This instance will be used to set up the server and define routes
const app = express();

app.use(cors()); // Using the CORS middleware to allow cross-origin requests. This is important for enabling communication between the frontend and backend, especially when they are hosted on different domains or ports

app.use(express.json()); // Middleware to parse JSON request bodies. This allows the server to understand JSON data sent in requests

app.get('/', (req, res) => {
    // This is the root route. When a GET request is made to the root URL, this callback function will be executed
    res.send('Hello folks! AI is here to review your code'); // Sending a response back to the client
})

app.use('/ai', aiRoutes); // Mounting the AI routes on the '/ai' path. This means that any requests to '/ai' will be handled by the aiRoutes module


module.exports = app; // Exporting the app instance so it can be used in other files, such as the index.js file