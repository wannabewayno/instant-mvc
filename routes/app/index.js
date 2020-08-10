const router = require('express').Router();

// calculate routes 
router.use('/calculate', require('./calculate.routes')); 

module.exports = router;