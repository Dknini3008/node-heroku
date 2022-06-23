const express = require('express');
const Post = require('../Models/posts');
const router = express.Router();

router.post('/', (req, res, next) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        console.log(createdPost);
        res.status(200).json({
            message: "Post added with success",
            postId: createdPost._id,
        });
    });
});

module.exports=router;