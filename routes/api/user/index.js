const { user:{ createUser, findUserById, deleteUser, updateUser, } } = require('../../../controllers')
const router = require('express').Router();

// Matches with /api/user 
router
    .route('/')
    .post(createUser) 

// Matches with /api/user/:id 
router
    .route('/:id')
    .get(findUserById) 
    .delete(deleteUser) 
    .patch(updateUser) 

// VIP routes 
router.use('/VIP', require('./VIP.routes')); 

module.exports = router;