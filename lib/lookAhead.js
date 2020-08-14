const { findType } = require('./helpers');

/**
 * Looks deeper into nested routes from the current route
 * returns a string with a decision on what to do based off it's findings
 * @param  {String} route -  the current route in question
 * @param  {Object} routeMap -  the local routeMap that stems from 'route' key
 * @return {String} - a plain english interpretation of what type of process to build 
 */
function lookAhead(route,routeMap){
    const primaryType = findType(routeMap[route]);

    if (primaryType === 'object'){

        // if object, check secondaryTypes
        const someAreObjects = Object.keys(routeMap[route])
            .some(nestedRoute => findType(routeMap[route][nestedRoute]) === 'object' );

        if(someAreObjects) {
            return 'directory';
        } else {
            return 'route';
        }

    } else {
        return primaryType;
    }
}

module.exports = lookAhead;