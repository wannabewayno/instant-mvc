const router = require('express').Router();

// members routes
router.use('/members',require('./members'));

// new routes
router.use('/new',require('./new'));

module.exports = router;