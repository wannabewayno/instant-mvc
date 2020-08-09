#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');


function doesConfigExist() {
    return fs.readdirSync('./').some(file => file === 'mvc.config.simplified.js');
}


function expandRoute(routeMap, routeBreakdown, methods) {
    // current route
    const route = routeBreakdown.shift();

    if(routeMap[route]) {
        // if there is already a route, check if it's an array or string
        if(Array.isArray(routeMap[route]) || typeof(routeMap[route]) === 'string'){
            // if so, we need to expand this out, leaving it's methods at the root
            routeMap[route] = {
                '/': routeMap[route]
            }
        }
        // keep expanding
        expandRoute(routeMap[route], routeBreakdown, methods);

    } else {

        // check if this is the end of the route?
        if(routeBreakdown.length === 0) {
            // add it's methods
            routeMap[route] = methods

        } else {
            // create a placeholder
            routeMap[route] = {}

            // keep expanding
            expandRoute(routeMap[route], routeBreakdown, methods) 
        }
    } 
}

function buildRouteMap () {
    //guard clause, checks that a congfig file exists
    if(!doesConfigExist()) {
        console.log(chalk.bgRed.bold('Error: No mvc.config.js file detected at the root of your project!'));
        return;
    }
    // if it exists, require our config file
    const config = require('./mvc.config.simplified.js');

    //guard clause, checks that the 'routes' key exists in the mvc.config.js
    if(!config.routes) {
        console.log(
            chalk.bgRed.bold("Error: mvc.config.js requires a 'routes' key that describes your routes! \n"),
            chalk.yellow("Try checking that 'routes' is plural and not the singular 'route' :D")
        )
        return;
    } 
    
    // placeholder map
    const routeMap = {
        '/':{}
    }
    // go through all defined routes
    for (const route in config.routes) {
        // for each route, breakdown the path. /api/user/:id => ['/api','/user,'/:id']
        const routeBreakdown = route.split('/').filter(route => !['/',''].includes(route)).map(route => `/${route}`);
        const methods = config.routes[route];

        // expand the routeMap from the root using this routeBreakdown
        expandRoute(routeMap['/'], routeBreakdown, methods);
    }

    return routeMap;
}

module.exports = buildRouteMap;