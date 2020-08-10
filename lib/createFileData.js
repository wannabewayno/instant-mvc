const { Router:{ importRouter, exportRouter }, useDirectory, useMethod, useMethods, useRoute } = require('./metaCode');
const lookAhead = require('./lookAhead');

function createFileData(routeMap,currentPath){
    let data = '';

    data += importRouter;

    Object.keys(routeMap).forEach(route => {
        const dataType = lookAhead(route,routeMap);
        switch(dataType){   
            case'directory':       data += useDirectory(route);                    break;
            case'route directory': data += useDirectory(route);                    break;
            case'route':           data += useRoute(route);                        break;
            case'string':          data += useMethod(route,routeMap,currentPath);  break;
            case'array':           data += useMethods(route,routeMap,currentPath); break;
        }
    })
    
    data += exportRouter;

    return data;
}

module.exports = createFileData;