const fs = require('fs');
const chalk = require('chalk');

function doesConfigExist(){
    return fs.readdirSync('./').some(file => file === 'mvc.config.js');
}

function buildRouteMap (){
    //guard clause, checks that a congfig file exists
    if(!doesConfigExist()) {
        console.log(chalk.bgRed.bold('No mvc.config.js file detected at the root of your project!'));
        return;
    }
    // if it exists, require our config file
    const config = require('../mvc.config');

    //gaurd clause, checks that the 'routes' key exists in the mvc.config.js
    if(!config.routes) {
        console.log(
            chalk.bgRed.bold("Error: mvc.config.js requires a 'routes' key that describes your routes! \n"),
            chalk.yellow("Try checking that 'routes' is plural and not the singular 'route' :D")
        )
        return;
    } 
    
    // placeholder map
    const routeMap = {}
    // go through each route specified in config.
    config.routes.forEach(({ path, methods }) => {
        // split the path up into sections
        const routes = path.split('/')
        .filter(path => path !== '/')
        .filter(path => path !== '');
        
        // expand the sections into a file structure 
        expandRouteMap(routeMap, routes, methods);
    })
    return routeMap;
}

buildRouteMap()



/**
 * Recursively expand route map until built
 * @param  {Object}          routeMap - 
 * @param  {Array<string>}   routes   -
 * @param  {Array<string>}   methods  -
 * @return {Object} - Built section of routeMap
 */
function expandRouteMap(routeMap,routes,methods){
    
    route = `${routes.shift()}/`
 
    if(routeMap[route]) {
        routeMap[route] = expandRouteMap(routeMap[route],routes,methods)
    }
    else {
        routeMap[route] = routes.length > 0 ? expandRouteMap({},routes, methods) : { methods } 
    }
    return routeMap;
}

module.exports = buildRouteMap