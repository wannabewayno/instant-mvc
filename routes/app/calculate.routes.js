const router = require('express').Router();

// Matches with '/app/calculate
router
    .route('/')
    .get(calculateController);

// Matches with '/app/calculate/:id
router
    .route('/:id')
    .get(calculateController)
    .put(calculateController)
    .patch(calculateController);

module.exports = router;