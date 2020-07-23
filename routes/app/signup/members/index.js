const router = require('express').Router();

// Matches with '/app/signup/members/:id
router
    .route('/:id')
    .get(membersController)
    .put(membersController)
    .patch(membersController);

module.exports = router;