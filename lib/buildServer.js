const fs = require('fs');
const path = require('path');

function buildServer(){
    const data = 
`// load env variables
require('dotenv').config();

// require all dependencies
const express = require('express');
const cors = require('cors');
const compression = require('compression');

// Set up the express app
const app = express();

// Middleware
// ==============================================================================

// use compression
app.use(compression())

// configure cors
app.use(cors());

// configure app to use data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set static assets path
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// API routing
// ==============================================================================
app.use(require('./routes'))

// Start the App
// ==============================================================================
// Define the port to run on
const PORT = process.env.PORT || 3001;

// Launch App
app.listen(PORT, () => console.log(\`🌎 ==> API server now on port \${PORT}!\`))`
    
    const rootDir = path.relative(__dirname,'./');
    const serverDir = path.join(rootDir,'/server.js');
    fs.writeFileSync('./server.js',data)
}

module.exports = buildServer;

