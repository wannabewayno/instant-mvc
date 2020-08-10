const chalk = require('chalk');

module.exports = {
    label(text) { return chalk.bgYellow.black(text); },
    error(text) { return chalk.bgRed.bold(text); },
    findType(item){
        const type = typeof(item)

        // There are many objects in javascript, if all of these fail it must be a regular object
        if( type === 'object' ){
            if(item instanceof Array)  return 'array'
            if(item instanceof Set)    return 'set'
            if(item instanceof Map)    return 'map'
            if(item instanceof Date)   return 'date'
            if(item instanceof RegExp) return 'regex'
            else return 'object'
        }

        return type
    },
    validMethodType(method){
        // check to see if it's a html file
        const isHTML = method.includes('.html')

        // if it is, return early with 'HTML'
        if(isHTML) return 'HTML'

        // if not, check to see if it's a recognised REST method
        const recognisedRESTMethods = ['GET','POST','PUT','PATCH','DELETE']
        method = method.toUpperCase();
        const match = recognisedRESTMethods.find(recognisedRESTMethod => method === recognisedRESTMethod)
        
        // if it is return 'REST'
        if (match) return 'REST'; 
        else throw console.log(error(`${method}: is not a html file or recoginised REST API method, GET|POST|PUT|PATCH|DELETE are`))
    }
}