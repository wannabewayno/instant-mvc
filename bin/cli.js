#!/usr/bin/env node

const buildRouteMap = require('../lib/buildRouteMap');
const path = require('path');
const fs = require('fs');
const { findType, label } = require('../lib/helpers');
const lookAhead = require('../lib/lookAhead');
const createFileData = require('../lib/createFileData');
const buildServer = require('../lib/buildServer');

function main(){
    // read the package.json of the root.
    // if it's a react application, we want to serve an index file from /client/build/index.html

    const routeMap = buildRouteMap();

    console.log(label('Route Map:'),JSON.stringify(routeMap,null,4));

    // build the first directory at the root as 'routes'
    buildDirectory(routeMap['/'],'./routes');

    // go through the routeMap from the root
    traverseRoute(routeMap['/'],'./routes');

    // TODO: create controllers
    
    
    buildServer();
}

main()

function traverseRoute(routeMap, parentPath){

    for (const route in routeMap) {
        // the current path
        const thisPath = path.join(parentPath,route);

        // look deeper into the local routeMap, decide how to proceed
        const decision = lookAhead(route,routeMap);

        switch(decision){
            case'directory':
                // make directory
                buildDirectory(routeMap[route],thisPath);

                // keep expanding
                traverseRoute(routeMap[route], thisPath);
                break;

            case'route':
                // build a route
                buildRoute(routeMap[route], thisPath)
                break;

            case'route directory':
                // complex route, build directory and route
                buildDirectory(routeMap[route],thisPath);

                traverseRoute(routeMap[route], thisPath);
                break;
        }
        // keep looping through this level
    }
}


function buildIndex(routeMap,currentPath){
    const indexPath = path.join(currentPath,'/index.js');

    data = createFileData(routeMap,currentPath);

    fs.writeFileSync(indexPath,data)
}


function buildDirectory(routeMap,currentPath){
    fs.mkdirSync(currentPath)

    // every directory has an index, build one.
    buildIndex(routeMap,currentPath);
}

function buildRoute(routeMap,currentPath){
    const { base, dir } = path.parse(path.join('./',currentPath));
    const routePath = path.format({ dir , base:`${base}.routes.js`})

    data = createFileData(routeMap,currentPath);
   
    fs.writeFileSync(routePath,data)
}

