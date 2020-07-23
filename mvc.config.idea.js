module.exports = {
    routes:{
        './html/index':{
            'GET':'index.html'
        },
        './api/books':{
            "GET":"findAllBooks",
            "POST":"createBook",
        },
        './api/books/:id':{
            "GET":'findById',
            "DELETE":'delete'
        },
        '/api/books/check':{
            'POST':'crossCheckIDs'
        }
    }
}
//vs
module.exports = {
    routes:[
        {
            path:'./html/index',
            methods:[
                {'GET':'index.html'},
            ],
        },
        {
            path:'./api/books',
            methods:[
                {'GET':'findAllBooks'},
                {'POST':'createBook'},
            ],
        },
        {
            path:'./api/books/:id',
            methods:[
                {'GET':'findById'},
                {'DELETE':'delete'},
            ],
        },
        {
            path:'./api/books/check',
            methods:[
                {'POST':'crossCheckIDs'},
            ],
        },
    ]
}