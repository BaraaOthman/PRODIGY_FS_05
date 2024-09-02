const express = require('express');
const router = express.Router();
const {createPostController,getPostsController, getusernameFromUserIdController, getUserpostsController, deletePostController} = require('../controllers/posts.controllers');
const upload = require('../middleware/upload');

router.post('/post',upload.single('media'),createPostController)
router.get('/posts',getPostsController)
router.get('/username',getusernameFromUserIdController)
router.get('/userPosts',getUserpostsController);
router.delete('/deletePost',deletePostController)

module.exports = router;