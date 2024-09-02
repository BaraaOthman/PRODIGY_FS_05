const {createPost, getPosts, getUsernameFromUserId, getPostsByUser, deletePost} = require('../services/posts.services')

const createPostController = async(req,res)=>{
    try{
        const username = req.body.username;

        const {content} = req.body;

        let media = null;

        if (req.file) {
            media = req.file.path; 
        }

        if (!username || !content  || !media) {
            return res.status(400).json({ message: 'user_id and content are required' });
        }

        const post = await createPost(username,content,media);

        if(!post){
            return res.status(401).json({message:'Cannot create post'})
        }

        res.status(200).json({message:'Post created successfully'})

    }catch(error){
        throw new Error(error)
    }
}

const getPostsController = async (req, res) => {
    try {
        const posts = await getPosts();

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No posts found .'
            });
        }

        res.status(200).json({
            success: true,posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

 
const getusernameFromUserIdController = async (req, res) => {
    try {
    
        const { user_id } = req.query;   

        
        const username = await getUsernameFromUserId(user_id);

        if (username) {
        
            
            res.status(200).json({ success: true, username:username });
        } else {
        
            res.status(404).json({ success: false, message: 'Username not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Error retrieving username: ${error.message}` });
    }
};


const getUserpostsController = async (req, res) => {
    try {

        const username = req.query.username;
    
        const userPosts = await getPostsByUser(username);

        res.status(200).json({
            success: true,userPosts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

const deletePostController = async (req, res) => {
    try {

        const { username, post_id } = req.query; 

        const result = await deletePost(username, post_id);

        if (result)
            res.status(200).json({ message: result.message });
    } catch (error) {
        console.error('Controller: Error occurred:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};


module.exports = {createPostController,getPostsController,getusernameFromUserIdController,getUserpostsController,deletePostController}