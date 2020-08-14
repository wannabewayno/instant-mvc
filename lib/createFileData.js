const { Router:{ importRouter, exportRouter }, useDirectory, useMethod, useMethods, useRoute } = require('./metaCode');
const lookAhead = require('./lookAhead');
const path = require('path');

function createFileData(routeMap,currentPath,buildPath,isIndex){

    const allControllers = [];
    let data = '';

    Object.keys(routeMap).forEach(route => {
        const dataType = lookAhead(route,routeMap);
        switch(dataType){   
            case'directory':       data += useDirectory(route);                           break;
            case'route':           data += useRoute(route);                               break;
            case'string':          data += useMethod(route,routeMap,currentPath,buildPath);         break;
            case'array':           
                const { method, controllers }  = useMethods(route,routeMap,currentPath);
                data += method;
                allControllers.push(...controllers);
                break;
        }
    })

    // build a controllerMap to export
    const pathElements = currentPath.split('\\').filter(route => route !== '\\');
    const controllerFile = pathElements.pop();

    const controllerMap = {
        [controllerFile]:allControllers
    }

    return {
        controllerMap,
        data: createRequireControllers(allControllers,controllerFile,pathElements,isIndex) + importRouter + data + exportRouter
    }
}

function createRequireControllers(controllers,controllerFile,pathElements,isIndex){
    let controllerPath = pathElements.map(() => '..').join('/') + '/controllers';
    controllerPath = isIndex? '../' + controllerPath : controllerPath;

    const reducer = (controllerString,currentController) => controllerString + `${currentController}, `

    return controllers.length > 0 ? `const { ${controllerFile}:{ ${controllers.reduce(reducer,'')}} } = require('${controllerPath}')\n`:''
}

module.exports = createFileData;