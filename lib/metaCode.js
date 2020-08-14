const path = require('path');
const { validMethodType, findType } = require('./helpers');
const insertHTML = require('./insertHTML');

module.exports = {
    Router:{
        importRouter:"const router = require('express').Router();\n\n",
        exportRouter: "module.exports = router;",
    },
    useDirectory(route){
        const routeMessage = `// ${route.slice(1)} routes \n`
        const router = `router.use('${route}', require('.${route}')); \n\n`
        return routeMessage + router;
    },     
    useRoute(route){
        const routeMessage = `// ${route.slice(1)} routes \n`
        const router = `router.use('${route}', require('.${route}.routes')); \n\n`
        return routeMessage + router;
    },         
    useMethod(route,routeMap,currentPath,buildPath){
        const routePath = `${currentPath.replace('routes','')}${route}`.replace(/\\/g,'/').replace(/\/\//g,'/').replace(/\/$/g,'');
        const matchesWith = `// Matches with ${routePath} \n`

        let router;
        switch(validMethodType(routeMap[route])){
            case'HTML':
                const pathToHTML = path.join(path.relative(currentPath,buildPath),routeMap[route]).replace(/\\/g,'/');
                router = insertHTML(route, pathToHTML);
                break;

            case'REST':
                router = `router('${route}') \n    .${routeMap[route].toLowerCase()}() \n\n`
                break;
        }

        return matchesWith + router; 
    },        
    useMethods(route,routeMap,currentPath){
        const path = `${currentPath.replace('routes','')}${route}`.replace(/\\/g,'/').replace(/\/\//g,'/').replace(/\/$/g,'');
        const matchesWith = `// Matches with ${path} \n`
        const controllers = [];
        let router = `router('${route}') \n`;

        routeMap[route].forEach((method,index,array) => {
            const type = findType(method);

            if(type === 'array' && method.length === 2){ //? ['GET','getAllPosts']
                const [ methodType , controller ] = method;
                controllers.push(controller);
                validMethodType(methodType);

                // add to the router
                router += `    .${methodType.toLowerCase()}(${controller}) ${index === array.length - 1 ?'\n\n':'\n'}`

            } else {                             //? ['GET']   or 'GET'
                const methodType = type === 'array'? method[0]  : method;
                validMethodType(methodType)
    
                // add to the router
                router += `    .${methodType.toLowerCase()}((req,res) => {
                    <your code goes here>
                }) ${index === array.length - 1 ?'\n\n':'\n'}`
            }
        })
        
        return { 
            method:matchesWith + router,
            controllers
        }
    },
}