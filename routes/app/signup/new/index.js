const router = require('express').Router();

// Matches with '/app/signup/new/vip
router
    .route('/vip')
    .get(newController)
    .post(newController);

module.exports = router;