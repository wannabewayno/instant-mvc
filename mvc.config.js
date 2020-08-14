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