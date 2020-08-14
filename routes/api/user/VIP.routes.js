const { VIP:{ getAllVIPS, createVIP, findVIPById, deleteVIP, updateVIP, } } = require('../../../controllers')
const router = require('express').Router();

// Matches with /api/user/VIP 
router('/') 
    .get(getAllVIPS) 
    .post(createVIP) 

// Matches with /api/user/VIP/:id 
router('/:id') 
    .get(findVIPById) 
    .delete(deleteVIP) 
    .patch(updateVIP) 

module.exports = router;