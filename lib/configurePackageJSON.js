const fs = require('fs');
const path = require('path');
const frameworks = require('./frameworks');

/**
 * Modifies the package.json to include a start script
 */
function configurePackageJSON() {
    const packageJSONPath = path.join(
        path.resolve('./'),
        'package.json'
    )

    // first we need to read the package.json from the root
    const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath));

    addServerDependencies(packageJSON);

    // check for popular frameworks
    const framework = findFramework(packageJSON);

    switch(framework){
        case'react':   configureReact(packageJSONPath,packageJSON);  return { buildPath: '/client/build'}
        case'vue':     configureVue(packageJSONPath,packageJSON);      break;
        case'angular': configureAngular(packageJSONPath,packageJSON);  break;
        default:       configureDefault(packageJSONPath,packageJSON);  break;
    }
}

function findFramework(){
    const rootDir = path.resolve('./');
    const filesAndFolders = fs.readdirSync(rootDir);
    const hasClient = filesAndFolders.some(fileOrDir => fileOrDir === 'client');

    // contains a client folder, check for a package.json
    if(hasClient){
        const clientPath = path.join(rootDir,'/client')
        const clientContents = fs.readdirSync(clientPath);

        const clientHasPackageJSON = clientContents.some(fileOrDir => fileOrDir === 'package.json');

        // if client has a package.json scan the dependencies
        if(clientHasPackageJSON) {
            const packageJSONPath = path.join(clientPath,'/package.json');
            const { dependencies } = JSON.parse(fs.readFileSync(packageJSONPath));
            
            if(dependencies){ 
                // now check for frameworks in the dependencies
                const framework = Object.keys(dependencies).filter(dependency => frameworks.includes(dependency));
                if (framework.length > 0) return framework[0];
            }
        }
    }
}

function configureReact(serverPackageJSONPath,serverPackageJSON) {
    const clientPackageJSONPath = path.join(path.resolve('./'),'/client/package.json');
    const clientPackageJSON = JSON.parse(fs.readFileSync(clientPackageJSONPath));

    // proxy to client side script
    if(!clientPackageJSON.proxy) clientPackageJSON.proxy = "http://localhost:3001";

    const { scripts, dependencies, devDependencies } = serverPackageJSON;

    // add necesssary start scripts for a server side react build;
    serverPackageJSON.scripts = {
        ...scripts, 
        "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
        "start:prod": "node server.js",
        "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
        "client": "cd client && npm run start",
        "install": "cd client && npm install",
        "build": "cd client && npm run build",
    }
    
    serverPackageJSON.dependencies = {
        ...dependencies,
        "if-env": "^1.0.4",
    }

    serverPackageJSON.devDependencies = {
        ...devDependencies,
        "concurrently": "^5.2.0",
        "nodemon": "^2.0.4",
    }

    // re-wright data to server package.json
    fs.writeFileSync(serverPackageJSONPath, JSON.stringify(serverPackageJSON,null,1));

    // re-wright data to client package.json
    fs.writeFileSync(clientPackageJSONPath, JSON.stringify(clientPackageJSON,null,1));
}

function configureVue(){
    // nothing here yet
}
function configureAngular(){
    // nothing here yet
}

function addServerDependencies(packageJSON){
    const { dependencies } = packageJSON;

    packageJSON.dependencies = {
        ...dependencies,
        "compression": "^1.7.4",
        "cors": "^2.8.5",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
    }
}

function configureDefault(serverPackageJSONPath,serverPackageJSON){
    // check that is has scripts, if not create a field for scripts
    if(!serverPackageJSON.scripts) serverPackageJSON.scripts = {};

    // check if it has a 'start' script, otherwise create one to start the server
    if(!serverPackageJSON.scripts.start) serverPackageJSON.scripts.start = 'node server.js';

    // re-wright data
    fs.writeFileSync(serverPackageJSONPath,JSON.stringify(serverPackageJSON,null,1));
}

module.exports = configurePackageJSON