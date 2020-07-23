const router = require('express').Router();

// html routes
router.use('/',require('./html'));

// api routes
router.use('/api',require('./api'));

// app routes
router.use('/app',require('./app'));

module.exports = router;