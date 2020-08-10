const { members:{ findAllMembers, createMember, findMemberById, updateMember, } } = require('../../../controllers')
const router = require('express').Router();

// Matches with /api/user/members 
router('/') 
    .get(findAllMembers) 
    .post(createMember) 

// Matches with /api/user/members/:id 
router('/:id') 
    .get(findMemberById) 
    .patch(updateMember) 

module.exports = router;