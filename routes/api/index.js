const router = require('express').Router();

// posts routes 
router.use('/posts', require('./posts.routes')); 

// user routes 
router.use('/user', require('./user.routes')); 

module.exports = router;