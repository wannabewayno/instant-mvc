const fs = require('fs');
const path = require('path');
const controllerIndex = require('./controllerIndex')

function buildControllers(allControllers){
    const controllersPath = path.join(
        path.resolve('./'),
        '/controllers'
    )

    // build controllers' dir
    fs.mkdirSync(controllersPath);

    // build controllers' index
    buildIndex(controllersPath);
    
    // build controllers' files from the custom map
    allControllers.forEach(controllers => {

        for (const fileName in controllers) {
            if (controllers[fileName].length > 0) {
                buildController(fileName,controllers[fileName],controllersPath);
            }
        }
    });
   
}

function buildController(fileName, controllers, controllersPath){
    const filePath = path.join(controllersPath,`${fileName}.js`);

    const data = `module.exports = {
${controllers.map(controller => buildControllerMethod(controller)).join('\n')}
}`

    fs.writeFileSync(filePath, data);
}

function buildIndex(controllersPath){
    const indexPath = path.join(controllersPath,'/index.js');
    fs.writeFileSync(indexPath,controllerIndex)
}

function buildControllerMethod(controller){
    return `    ${controller}(req,res){
        // your code here
    },`
}

module.exports = buildControllers;