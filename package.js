const lol = {
    "name": "instant-mvc",
    "version": "0.2.0",
    "description": "an mvc framework boilerplate",
    "main": "./bin/cli.js",
    "scripts": {
      "test": "jest",
      "start": "node server.js"
    },
    "bin": {
      "instant-mvc": "./bin/cli.js && npm install"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/wannabewayno/instant-mvc.git"
    },
    "keywords": [
      "mvc",
      "boilerplate",
      "react",
      "automation",
      "routing",
      "routes",
      "route",
      "controllers",
      "controller"
    ],
    "author": "wayne c griffiths",
    "license": "MIT",
    "bugs": {
      "url": "https://github.com/wannabewayno/instant-mvc/issues"
    },
    "homepage": "https://github.com/wannabewayno/instant-mvc#readme",
    "peerDependencies": {
      "express": "^4.17.1",
      "compression": "^1.7.4",
      "dotenv": "^8.2.0",
      "cors": "^2.8.5"
    },
    "dependencies": {
      "chalk": "^4.1.0",
      "compression": "^1.7.4",
      "cors": "^2.8.5",
      "dotenv": "^8.2.0",
      "express": "^4.17.1",
      "jest": "^26.2.2"
    }
  }