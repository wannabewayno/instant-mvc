const buildRouteMap = require('./routeMap.js');
const path = require('path');
const fs = require('fs');

function assembleFileStructure() {
    const startPath =  path.join(path.resolve('./'),'./routes')
    console.log(startPath);
    // stores current path as we build
    const currentPath = [startPath];

    //build the route map
    const routeMap = buildRouteMap();
    console.log(JSON.stringify(routeMap,null,5));

    // we start by building a routes directory, with an index.js
    fs.mkdirSync(currentPath.join('/'));

    function traverseRouteMap(routeMap){

        for(route in routeMap){
            
            if(route === 'methods'){
                // write elaborate index file here
                // will need methods, and other routes
                fs.writeFileSync(path.join(currentPath.join('/'),'index.js'),"'hello world'")
            } else {
                const nestedRoutes = Object.keys(routeMap[route])
                // needs a directory created
                if(nestedRoutes.every( route => route !== 'methods' )){
                    currentPath.push(route)
                    fs.mkdirSync([...currentPath].join('/'));

                    // drill down until this path stops
                    traverseRouteMap(routeMap[route])
                } else {
                    currentPath.push(`${route.slice(0,-1)}.routes.js`)
                    fs.writeFileSync([...currentPath].join('/'),`${Object.keys(routeMap[route]).join('')}`)
                }
            }
            
        }
    }

    traverseRouteMap(routeMap['./']);
    
    // go through the route map...
    // for (const route in routeMap) {
    //     if()
    // }

    // the root route needs to have a folder called index.js
    // string:{ method } pairs will be routes in a file
    // string:{ string:{ methods , route/ } } will be a file with those extensions
    // string:{ string } will be separate files


}

assembleFileStructure()

