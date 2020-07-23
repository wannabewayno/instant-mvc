const router = require('express').Router();

// books routes
router.use('/books', require('./books.routes'));

// magazines routes
router.use('/magazines', require('./magazines.routes'));

module.exports = router;