import React, { useEffect, useState } from 'react';
import '../styles/Post.css';
import PostService from '../PostServices';
import CreatePost from '../components/CreatePost';

const mockComments = {
  22: [
    { id: 1, username: 'Mia2', text: 'Great post!', icon: 'https://via.placeholder.com/30' },
    { id: 2, username: 'Sama23', text: 'I totally agree with this.', icon: 'https://via.placeholder.com/30' },
    { id: 3, username: 'Joseph98', text: 'Amazing insights, thank you!', icon: 'https://via.placeholder.com/30' },
  ],
  23: [
    { id: 1, username: 'Christina45', text: 'Very well written.', icon: 'https://via.placeholder.com/30' },
    { id: 2, username: 'Mira876', text: 'I learned something new today.', icon: 'https://via.placeholder.com/30' },
  ],
  3: [
    { id: 1, username: 'User6', text: 'Thanks for sharing!', icon: 'https://via.placeholder.com/30' },
    { id: 2, username: 'User7', text: 'This is so helpful.', icon: 'https://via.placeholder.com/30' },
  ],
};

const likeIcon = 'https://img.icons8.com/ios-glyphs/30/000000/facebook-like.png';
const dislikeIcon = 'https://img.icons8.com/ios-glyphs/30/000000/thumbs-down.png';

function Post() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPosts();

        if (response.data.success) {
          const postsWithUsernames = [];
          for (const post of response.data.posts) {
            const userResponse = await PostService.getUsername(post.user_id);
            postsWithUsernames.push({
              ...post,
              username: userResponse.data.username,
            });
          }
          setPosts(postsWithUsernames);
        } else {
          console.error('Error fetching posts:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCommentClick = (postId) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));
  };

  return (
    <div className="post-list">
      <div className="feed">
        <CreatePost />
      </div>
      {posts.map((post) => {
        const imageUrl = `http://localhost:3002/${post.media.replace(/\\/g, '/')}`;
        const profileImageUrl = `https://tse2.mm.bing.net/th?id=OIP.0ufZVBFzwkW8fV1ovsrxMgHaF3&pid=Api&P=0&h=220`;

        return (
          <div key={post.id} className="post">
            <div className="profile-header">
              <img src={profileImageUrl} alt="Profile" className="profile-icon" />
              <h3 className='user_h1'>{post.username}</h3>
            </div>
            <button className="fbtnn">Follow</button>
            <p>{post.content}</p>
            {post.media && (
              <div className="media">
                {post.media.endsWith('.mp4') ? (
                  <video controls>
                    <source src={imageUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={imageUrl} alt="Post media" />
                )}
              </div>
            )}
            <div className="post-footer">
              <span>{12} Likes</span>
              <span onClick={() => handleCommentClick(post.id)} className="comment-button">
                {5} Comments
              </span>
            </div>
            {showComments[post.id] && (
              <div className="comments-list">
                {mockComments[post.id]?.map((comment) => (
                  <div key={comment.id} className="comment">
                    <img src="https://tse3.mm.bing.net/th?id=OIP.xRzRFnOE0-gw7WWRD0TnagHaHa&pid=Api&P=0&h=220" alt="User icon" className="comment-icon" />
                    <strong>{comment.username}</strong>
                    <span className="comment-text">{comment.text}</span>
                    <div className="comment-icons">
                      <img src={likeIcon} alt="Like" />
                      <img src={dislikeIcon} alt="Dislike" />
                    </div>
                  </div>
                )) || <p>No comments available.</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Post;
