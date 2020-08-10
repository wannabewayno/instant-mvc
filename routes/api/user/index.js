const router = require('express').Router();

// Matches with /api/user 
router('/') 
    .get(getAllUsers) 
    .post(createUser) 

// Matches with /api/user/:id 
router('/:id') 
    .get(findUserById) 
    .delete(deleteUser) 
    .put(updateUser) 
    .patch(updateUserCredentials) 

// members routes 
router.use('/members', require('./members.routes')); 

module.exports = router;