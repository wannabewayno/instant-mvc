const chalk = require('chalk');

module.exports = {
    label(text){
        return chalk.bgYellow.black(text);
    },
    findType(item){
        const type = typeof(item)

        // array and object both return type object, so now check this
        if( type === 'object' ){
            if(item instanceof Array)  return 'array'
            if(item instanceof Set)    return 'set'
            if(item instanceof Map)    return 'map'
            if(item instanceof Date)   return 'date'
            if(item instanceof RegExp) return 'regex'
            else return 'object'
        }

        return type
    }
}