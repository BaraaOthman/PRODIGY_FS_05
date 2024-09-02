import http from "./http-common";


const createpost = (formData)=>{
        return http.post(`/posts/post`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
}; 
 

const getPosts = ()=>{ 
    return http.get('/posts/posts');
}

const getUsername = (user_id) => {
    return http.get(`/posts/username`, {params: {user_id}});
};

const getUserPosts = (username) => {
    return http.get('/posts/userPosts',{params:{username}})
}


const deleteUserPost = (username,post_id)=>{
    return http.delete('/posts/deletePost',{params:{username,post_id}})
}

const PostService = {
    createpost,
    getPosts,
    getUsername,
    getUserPosts,
    deleteUserPost
}


export default PostService;
