const router = require('express').Router();

// Matches with ./index 
router.use('/index', (req,res) => {
    res.sendFile(
        path.join(
            path.relative(__dirname,path.resolve('./')),
            'index.html'
        )
    )
}) 

// Matches with ./login 
router.use('/login', (req,res) => {
    res.sendFile(
        path.join(
            path.relative(__dirname,path.resolve('./')),
            'login.html'
        )
    )
}) 

// Matches with ./signup 
router.use('/signup', (req,res) => {
    res.sendFile(
        path.join(
            path.relative(__dirname,path.resolve('./')),
            'signup.html'
        )
    )
}) 

// api routes 
router.use('/api', require('./api')); 

// app routes 
router.use('/app', require('./app')); 

module.exports = router;