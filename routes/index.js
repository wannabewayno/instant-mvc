const router = require('express').Router();

// api routes 
router.use('/api', require('./api')); 

// If no API routes are hit, send the React app
router.use( (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

module.exports = router;