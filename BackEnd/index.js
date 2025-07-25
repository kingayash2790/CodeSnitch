
require('dotenv').config(); // Load environment variables from a .env file into process.env
const app = require('./src/app'); // Importing the app instance from the app.js file

app.listen(3000, () =>{
    console.log('Server is running on http://localhost:3000');
})