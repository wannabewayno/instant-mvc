# instant-mvc
Create an mvc frame-work in an instant

## Getting Started
Three steps!
* Installation `npm install instant-mvc --save-dev`
* Create a mvc.config.js file
* Run the command line utility `npx instant-mvc` 
### That's it! get back to building the app.

### Inside the mvc.config.js
Create a mvc.config.js file in the root directory
<img src='./assets/images/config-example.PNG'/>

Add this code to the mvc.config.js
```
module.exports = {
    routes: {}
}
```
You will define your routes here as an object.

##### Defining a route
You define a route as a key:value pair that takes on the form: `<route path>:<method>`
Defining a 'GET' route at '/api/posts' would look like: `'/api/posts':'GET'`

##### multiple methods to a route
For multiple methods, use an array: `'/api/posts':['GET','POST','DELETE']`

##### Adding controllers to a method
To add a controller to a REST method, use an array
`[<method>,<controller>]`

Example:
```
'/api/posts':[
    ['GET','getAllPosts'],
    ['POST','createPost'],
]
```
##### Possible issues
If only adding one `[<method>,<controller>]` to a route, make sure to define this as an Array of Arrays. Otherwise stranger things will occur.

Explicity, like this:
```
'/api/posts':[
    ['GET','getAllPosts'],
]
```

##### Putting it all together
Here's an example config
```
module.exports = {
    routes:{
        '/index':'index.html',
        '/api/posts':[
            ['GET','getAllPosts'],
            ['POST','createPost'],
        ],
        '/api/posts/:id':[
            ['GET','findPostById'],
            ['DELETE','deletePost'],
            ['PATCH','updatePost'],
        ],
        '/api/user':[
            ['POST','createUser'],
        ],
        '/api/user/:id':[
            ['GET','findUserById'],
            ['DELETE','deleteUser'],
            ['PATCH','updateUser'],
        ]
    }
}
```

### Running instant-mvc
Once a mvc.config.js file has been set up
run `npx instant-mvc`

This will:
* Add a routes directory with all routes hooked to controllers (if defined that way).
* Add a controllers directory with a controller framework ready to add code to.
* Add a models directory with a models framework ready to add code to.
* Add a server.js file that: 
  * uses compression
  * has cors configured
  * is set up for data parsing
  * initialises env variables
  * hooked to your routes
  * starts a server with `npm start`


## More Information

### Controllers and Models directories
When these directories are set up, they contain an index file that autobundles all controllers and models into an object. If you want to add or remove controllers/models. Simple add and removes files. The exported object will automatically contain these files for you.

### Config Options
To configure extra options, add them as key:value pairs to the mvc.config.js file

### Frameworks 
instant-mvc aims to effortlessly connect an mvc framework to your prefered JS framework.

#### React
Currently v0.3.1 supports create-react-app if housed in a 'client' folder. Instant-mvc will autoDetect React if it's under 'client' and configure your routes to reference everything from the build directory.

###### What do I have to do?
for a React app from scratch with a server...
* Navigate to a directory in your terminal `npx create-react-app client`
* `npm init` follow the prompts. Make sure you're in the root dir and not in the 'client' dir!
* `npm install instant-mvc`
* create an mvc.config.js file with your routes and controllers.
* `npx instant-mvc`
* `npm install` this is a necessary step as the package.json file was updated with dependencies.
* `npm start`

That's it! You'll have a react app, with routes, with controllers, with a bells and whistles server running on localhost:3001. Neat huh?

### Issues

### Contributing

### License


