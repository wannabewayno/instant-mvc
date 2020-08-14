#!/usr/bin/env node

const buildRouteMap = require('../lib/buildRouteMap');
const path = require('path');
const fs = require('fs');
const lookAhead = require('../lib/lookAhead');
const createFileData = require('../lib/createFileData');
const buildServer = require('../lib/buildServer');
const buildControllers = require('../lib/buildControllers');
const configurePackageJSON = require('../lib/configurePackageJSON');

function main(){
    // read package.json from the root
    const appInfo = configurePackageJSON();

    const routeMap = buildRouteMap();

    console.log('Route Map:',JSON.stringify(routeMap,null,4));

    // build the first directory at the root as 'routes'
    buildDirectory(routeMap['/'],'./routes');

    // go through the routeMap from the root, returns any controllers that has been defined    
    const controllers = traverseRoute(routeMap['/'],'./routes');

    // add a controller directory with controller methods ready to add code to
    buildControllers(controllers);
    
    // builds a server with all the usual bells and whistles
    buildServer();
}

main()

function traverseRoute(routeMap, parentPath){
    const controllers = [];

    for (const route in routeMap) {
        // the current path
        const thisPath = path.join(parentPath,route);

        // look deeper into the local routeMap, decide how to proceed
        const decision = lookAhead(route,routeMap);

        let controllerMap; // placeholder for any found controllers as we navigate through routes
        switch(decision){
            case'directory': 
                // build directory
                controllerMap = buildDirectory(routeMap[route],thisPath);
                controllers.push(controllerMap);

                // keep expanding
                controllers.push(...traverseRoute(routeMap[route], thisPath));
                break;

            case'route':
                // build a route
                controllerMap = buildFile(routeMap[route], thisPath);
                controllers.push(controllerMap);

                break;
            // TODO: route directory and directory do exactly the same thing
            // go ahead and modify lookAhead() to only give directory or route
            case'route directory':
                // build directory
                controllerMap = buildDirectory(routeMap[route],thisPath);
                controllers.push(controllerMap);

                // keep expanding
                controllers.push(...traverseRoute(routeMap[route], thisPath));
                break;
        }
        // keep looping through this level
    }
    return controllers;
}

function buildDirectory(routeMap,currentPath){
    // make directory
    fs.mkdirSync(currentPath)

    // every directory has an index, build one.
    const controllerMap = buildFile(routeMap,currentPath,true);

    return controllerMap
}

function buildFile(routeMap,currentPath,isIndex) {

    let filePath;
    if(isIndex) {
        filePath = path.join(currentPath,'/index.js');

    } else {
        const { base, dir } = path.parse(path.join('./',currentPath));
        filePath = path.format({ dir , base:`${base}.routes.js`});
    }

    const { controllerMap, data } = createFileData(routeMap,currentPath);
   
    fs.writeFileSync(filePath,data);

    return controllerMap;
}

function buildIndex(routeMap,currentPath){
    const indexPath = path.join(currentPath,'/index.js');

    const { controllerMap, data } = createFileData(routeMap,currentPath);

    fs.writeFileSync(indexPath,data)

    return controllerMap;
}

function buildRoute(routeMap,currentPath){
    const { base, dir } = path.parse(path.join('./',currentPath));
    const routePath = path.format({ dir , base:`${base}.routes.js`})

    const { controllerMap, data } = createFileData(routeMap,currentPath);
   
    fs.writeFileSync(routePath,data);

    return controllerMap;
}

