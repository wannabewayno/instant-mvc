const router = require('express').Router();

// Matches with '/index
router
    .route('/index')
    .get(htmlController);

// Matches with '/login
router
    .route('/login')
    .get(htmlController);

// Matches with '/books
router
    .route('/books')
    .get(htmlController);

module.exports = router;