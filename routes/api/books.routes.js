const router = require('express').Router();

// Matches with '/api/books
router
    .route('/')
    .get(booksController)
    .post(booksController);

// Matches with '/api/books/:id
router
    .route('/:id')
    .get(booksController)
    .delete(booksController);

// volumes routes
router.use('/volumes', require('./volumes.routes'));

module.exports = router;