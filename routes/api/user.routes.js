const { user:{ createUser, findUserById, deleteUser, updateUser, } } = require('../../controllers')
const router = require('express').Router();

// Matches with /api/user 
router('/') 
    .post(createUser) 

// Matches with /api/user/:id 
router('/:id') 
    .get(findUserById) 
    .delete(deleteUser) 
    .patch(updateUser) 

module.exports = router;