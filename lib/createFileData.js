const { Router:{ importRouter, exportRouter }, useDirectory, useMethod, useMethods, useRoute } = require('./metaCode');
const lookAhead = require('./lookAhead');

function createFileData(routeMap,currentPath){
    
    const allControllers = [];
    let data = '';

    Object.keys(routeMap).forEach(route => {
        const dataType = lookAhead(route,routeMap);
        switch(dataType){   
            case'directory':       data += useDirectory(route);                           break;
            case'route directory': data += useDirectory(route);                           break;
            case'route':           data += useRoute(route);                               break;
            case'string':          data += useMethod(route,routeMap,currentPath);         break;
            case'array':           
                const { method, controllers }  = useMethods(route,routeMap,currentPath);
                data += method;
                allControllers.push(...controllers); 
                break;
        }
    })

    // controllerMap importRouter + data + exportRouter
    return createRequireControllers(allControllers,currentPath) + importRouter + data + exportRouter;
}

function createRequireControllers(controllers,currentPath){
    const pathElements = currentPath.split('\\').filter(route => route !== '\\');
    const controllerFile = pathElements.pop();
    const controllerPath = pathElements.map(route => '..').join('/') + '/controllers'

    const reducer = (controllerString,currentController) => controllerString + `${currentController}, `

    return controllers.length > 0?`const { ${controllerFile}:{ ${controllers.reduce(reducer,'')}} } = require('${controllerPath}')\n`:''
}

module.exports = createFileData;