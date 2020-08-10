const { books:{ getAllBooks, createBook, findBookById, deleteBook, updateBook, } } = require('../../controllers')
const router = require('express').Router();

// Matches with /api/books 
router('/') 
    .get(getAllBooks) 
    .post(createBook) 

// Matches with /api/books/:id 
router('/:id') 
    .get(findBookById) 
    .delete(deleteBook) 
    .patch(updateBook) 

module.exports = router;