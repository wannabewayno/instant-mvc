const chalk = require('chalk');

module.exports = {
    label(text){
        return chalk.bgYellow.black(text);
    }
}