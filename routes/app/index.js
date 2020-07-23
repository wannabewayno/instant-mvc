const router = require('express').Router();

// calculate routes
router.use('/calculate', require('./calculate.routes'));

// signup routes
router.use('/signup',require('./signup'));

module.exports = router;