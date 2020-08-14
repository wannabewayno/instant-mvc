const router = require('express').Router();

// Matches with ./index 
router.use('/index', (req,res) => {
    res.sendFile(
        path.join(
            path.relative(__dirname,path.resolve('undefined')),
            'index.html'
        )
    )
}) 

// api routes 
router.use('/api', require('./api')); 

module.exports = router;