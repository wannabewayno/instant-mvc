const config = require('../mvc.config');

function buildRouteMap (){
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