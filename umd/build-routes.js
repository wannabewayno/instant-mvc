const buildRouteMap = require('./routeMap');
const validateMethod = require('./validateMethod');
const path = require('path');
const fs = require('fs');

const Router = {
    importRouter:"const router = require('express').Router();\n\n",
    exportRouter: "module.exports = router;",
}

String.prototype.clip = function(N){
    return this.slice(0,-(N?N:1))
}

function assembleFileStructure() {
    const startPath =  path.join(path.resolve('./'),'./routes')
    
    //build the route map
    const routeMap = buildRouteMap();
    console.log(JSON.stringify(routeMap,null,5));

    traverseRouteMap(routeMap, startPath);

}

// Call the function and watch the magic
assembleFileStructure()


function traverseRouteMap(routeMap, currentPath){
    
    for(route in routeMap){
        console.log('Route:',[route]);
        const thisPath = path.join(currentPath, route === 'methods'?'':route)

        const decision = mkDirOrRoute(routeMap[route]);
        console.log('Decision:',[decision]);
        switch(decision){
            case 'directory':
                // make dir
                buildDirectory(thisPath)

                // make index.js in this dir, returns directory information
                const routeInfo = buildIndex(routeMap,route,thisPath)
                
                console.log(routeInfo);
                // if everything was a route, no need to keep drilling, we got everything
                if (routeInfo.every(route => route.type !== 'route')){
                     // otherwise, drill down another level (routeception anyone?)
                     traverseRouteMap(routeMap[route],thisPath)
                }
                break;
            case 'route':
                // otherwise create a file for the route and it's methods
                const filePath = `${thisPath.slice(0,-1)}.routes.js`
                fs.writeFileSync(filePath,fillRouteFile(routeMap,route,thisPath))
                break;
        }
       
    }
}

function mkDirOrRoute(routeMap){
    const firstTierRoutes = Object.keys(routeMap)
    // No methods? great create a Dir
    if (firstTierRoutes.every( route => route !== 'methods' )){
        return 'directory'
    } else {
    // other wise we will need to build a route file
    return 'route'
    }
}


function buildDirectory(dirPath){
    fs.mkdirSync(dirPath);
}


function buildIndex(routeMap, parentRoute, dirPath){
    const { importRouter, exportRouter } = Router;

    const thisMap = routeMap[parentRoute];
    const firstTierRoutes = Object.keys(thisMap);
    
    //for all of these, need to check the corresponding keys
    const useRouter = firstTierRoutes.map(route => {
        
        switch(mkDirOrRoute(thisMap[route])){
            case 'directory':
                routeName = route.clip();
                const message = `// ${routeName} routes\n` 
                const router =  `router.use('/${routeName==='html'?'':routeName}',require('./${routeName}'));\n\n`
                return {
                    meta: { type: 'directory', route},
                    router: message + router,
                }
            case 'route':
                return buildExpressRoute(thisMap,route,parentRoute,dirPath)
        }
    })

    const indexStructure = [ importRouter, ...useRouter.map(route=> route.router), exportRouter ].join('');
    const filePath = path.join(dirPath,'index.js');

    fs.writeFileSync(filePath,indexStructure);
    return useRouter.map(route => route.meta);
}


function fillRouteFile(routeMap,parentRoute,currentPath){
    const { importRouter, exportRouter } = Router;

    const thisMap = routeMap[parentRoute]
    const routes = Object.keys(thisMap).map(route =>{
        return buildExpressRoute(thisMap,route,parentRoute,currentPath).router
    })

    return importRouter + routes.join('') + exportRouter;
}


function buildExpressRoute(routeMap,route,parentRoute,currentPath){
    
    parentRoute==='html/'?'':parentRoute
    let methods;
    let trimmedRoute;
    const trimmedParentRoute = parentRoute.clip()

    if(route === 'methods') {
        methods = routeMap.methods;
        trimmedRoute = '/';
       

    } else if (routeMap[route].methods && Object.keys(routeMap[route]).length === 1) {
        methods = routeMap[route].methods;
        trimmedRoute = `/${route.clip()}`;
        

    } else {
        
        routeName = route.clip();
        const message = `// ${routeName} routes\n` 
        const router =  `router.use('/${routeName==='html'?'':routeName}', require('./${routeName}.routes'));\n\n`
        return { router: message+router, meta:{type:'router',route} }
        
    }
    
    const message = `// Matches with '/${path.join(path.relative('./routes',currentPath),trimmedRoute).replace(/\\/g,'/').replace(/\/$|html\//g,'')}\n`;
    const router = `router\n    .route('${trimmedRoute}')\n`;

    return { 
        router: [message, router,...buildRouteMethods(methods,trimmedParentRoute)].join(''),
        meta:{ type:'route', route }
    }
}


function buildRouteMethods(methods,parentRoute){

    return methods.map((method,index,array) => {
        method = validateMethod(method);
        return `    .${method.toLowerCase()}(${parentRoute+'Controller'})${index===array.length-1?';\n\n':'\n'}`
    })
}
