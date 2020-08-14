module.exports = function(route, pathToHTML){
    return `router.use('${route}', (req,res) => res.sendFile('${pathToHTML}')) \n\n`
}