const router = require('express').Router();

// Matches with /app/calculate/:number 
router('/:number') 
    .get(calculate) 

module.exports = router;