const { posts:{ getAllPosts, createPost, findPostById, deletePost, updatePost, } } = require('../../controllers')
const router = require('express').Router();

// Matches with /api/posts 
router('/') 
    .get(getAllPosts) 
    .post(createPost) 

// Matches with /api/posts/:id 
router('/:id') 
    .get(findPostById) 
    .delete(deletePost) 
    .patch(updatePost) 

module.exports = router;