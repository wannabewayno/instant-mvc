// you would define your config files here!

module.exports = {
    routes:[
        {
            path:'./',
            methods:['index'],
        },
        {
            path:'./api/books',
            methods:['GET','POST'],
        },
        {
            path:'./api/books/:id',
            methods:['DELETE','GET'],
        },
        {
            path:'./api/books/check',
            methods:['POST'],
        }
    ]
}
