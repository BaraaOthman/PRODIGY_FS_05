const { query } = require("../database/db");


const createPost = async (username, content, media) => {
    try {
        const userQuery = 'SELECT id FROM users WHERE username = ?';
        const userRows = await query(userQuery, [username]);

        if (!userRows || !userRows.length) {
            throw new Error('User not found');
        }

        const user_id = userRows[0].id;

        const sql = ` INSERT INTO posts (user_id, content, media) VALUES (?, ?, ?)
    `
        const result = await query(sql, [user_id, content, media])

        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
}


const getPosts = async () => {
    try {

        // Query to get the posts along with the number of likes and comments
        const sql = `SELECT * FROM posts`;

        // Execute the query with user_id and post_id as parameters
        const result = await query(sql);

        return result; // Return the result from the query

    } catch (error) {
        // Handle any errors that occur during the process
        throw new Error(`Error retrieving posts: ${error.message}`);
    }
};


const getUsernameFromUserId =  async(user_id)=>{

    try {

        const sql = `SELECT username FROM users WHERE id =?`

        const result = await query(sql,[user_id])

        if (result.length > 0) {
            return result[0].username;
        } else {
            return null; // Return null if no user found
        }
    } catch (error) {
        // Handle any errors that occur during the process
        throw new Error(`Error retrieving posts: ${error.message}`);
    }
    }


    const getPostsByUser =async (username) =>{
        try{

            const userQuery = 'SELECT id FROM users WHERE username = ?';
            const userRows = await query(userQuery, [username]);
    
            if (!userRows || !userRows.length) {
                throw new Error('User not found');
            }
    
            const user_id = userRows[0].id;


            const sql = `SELECT * FROM posts WHERE user_id = ?`;

            const result = await query(sql,[user_id]);

            return result;
        }catch (error) {
        throw new Error(`Error retrieving posts: ${error.message}`);
    }
    }


    const deletePost = async (username, post_id) => {
        try {
            const userQuery = 'SELECT id FROM users WHERE username = ?';
            const userRows = await query(userQuery, [username]);
    
            if (!userRows || !userRows.length) {
                throw new Error('User not found');
            }
    
            const user_id = userRows[0].id;
    
            const sql = 'DELETE FROM posts WHERE user_id = ? AND id = ?';
            const result = await query(sql, [user_id, post_id]);
    
            if (result) {

                return { message: 'Post deleted successfully' };
            }
        } catch (error) {
            throw new Error(`Error deleting post: ${error.message}`);
        }
    };
    

module.exports = { createPost ,getPosts,getUsernameFromUserId,getPostsByUser,deletePost}