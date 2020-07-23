const router = require('express').Router();

// Matches with '/api/magazines
router
    .route('/')
    .get(magazinesController)
    .post(magazinesController);

// Matches with '/api/magazines/:id
router
    .route('/:id')
    .delete(magazinesController)
    .get(magazinesController)
    .patch(magazinesController);

module.exports = router;