# instant-mvc
The dev tool that creates an mvc frame-work for you in an instant

## Getting Started
`npm install instant-mvc --save-dev`

create a mvc.config.js file in the root of your directory

#### Inisde mvc.config.js

define the routes you want as an array of objects
here's an example:
```
module.exports = {
    routes:[
        {
            path:'./html/index',
            methods:['GET'],
        },
        {
            path:'./html/login',
            methods:['GET'],
        },
        {
            path:'./html/signup',
            methods:['GET'],
        },
        {
            path:'./api/user',
            methods:['GET','POST'],
        },
        {
            path:'./api/user/:id',
            methods:['GET','DELETE','PUT','PATCH'],
        },
        {
            path:'./api/user/members',
            methods:['GET','POST'],
        },
    ]
}
```
`npx build-routes`

That's it, get back to more important things
