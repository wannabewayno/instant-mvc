const router = require('express').Router();

// user routes 
router.use('/user', require('./user')); 

// books routes 
router.use('/books', require('./books.routes')); 

module.exports = router;