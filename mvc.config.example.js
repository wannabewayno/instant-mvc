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