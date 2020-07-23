const router = require('express').Router();

// Matches with '/'
router
    .route('/')
    .get(Controller)
    .put(Controller)
    .patch(Controller);

module.exports = router;