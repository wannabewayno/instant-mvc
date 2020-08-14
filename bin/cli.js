#!/usr/bin/env node

const buildRouteMap = require('../lib/buildRouteMap');
const path = require('path');
const fs = require('fs');
const lookAhead = require('../lib/lookAhead');
const createFileData = require('../lib/createFileData');
const buildServer = require('../lib/buildServer');
const buildControllers = require('../lib/buildControllers');
const configurePackageJSON = require('../lib/configurePackageJSON');
let { buildPath } = require(path.resolve('./mvc.config'));

function main(){
    // read package.json from the root
    const appInfo = configurePackageJSON();

    if(!buildPath) buildPath = appInfo.buildPath;

    // builds a 'route map', a JSON that mimics the file structure we're after
    const routeMap = buildRouteMap();

    console.log('Route Map:',JSON.stringify(routeMap,null,4));

    // build a routes directory at the root
    buildDirectory(routeMap['/'],'./routes');

    // go through the routeMap from the root, returns any controllers that have been defined    
    const controllers = traverseRoute(routeMap['/'],'./routes');

    if(appInfo.framework) modifyRoutesIndex(appInfo.framework);

    // add a controllers directory with controller methods ready to add code to
    buildControllers(controllers);
    
    // builds a server with all the usual bells and whistles, serving static assets from defined buildPath;
    buildServer(buildPath);
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
        }
        // keep looping through this level
    }
    return controllers; // return all controllers to top level, passed to buildControllers()
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

    const { controllerMap, data } = createFileData(routeMap,currentPath,buildPath);
   
    fs.writeFileSync(filePath,data);

    return controllerMap;
}

function modifyRoutesIndex(framework){
    const indexPath = path.resolve('./routes/index.js')
    let indexData = fs.readFileSync(indexPath);
    switch(framework) {
        case'react': // for react, serve the index.html by default
            // we'll server this at the end of index file, so find the router export.
            const insertAt = indexData.indexOf('module.exports = router;');
            indexData = indexData.slice(0,insertAt) + require('../lib/react/serveIndexFile') + indexData.slice(insertAt);
        break;
    }

    //rewrite the data
    fs.writeFileSync(indexPath, indexData);
}