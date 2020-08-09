#!/usr/bin/env node

const buildRouteMap = require('./buildRouteMap');
const path = require('path');
const fs = require('fs');

function main(){
   const routeMap = buildRouteMap();

   traverseRoute(routeMap)
   
}


function traverseRoute(routeMap){

    for (const route in routeMap) {
        
    }
}


// give back some kind of statement on what to create?
function lookAhead(route,routeMap){
    const routeType = typeof(routeMap[route]);

    switch(routeType) {
        case'string':
            break;
        case'object':
            break;
        case'array':
            break;
    }
}
