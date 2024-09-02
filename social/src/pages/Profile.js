import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import { useNavigate } from "react-router-dom";
import UserService from '../UserServices';
import Cookies from 'js-cookie';
import PostService from '../PostServices';
import { useCookies } from 'react-cookie';

function Profile() {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [cookies] = useCookies(['username']);
  const username = cookies.username;
  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(() => {
    if (!username) {
      navigate('/Login');
      return;
    }
    
    const fetchPosts = async () => {
      const response = await PostService.getUserPosts(username);
      if (response.status === 200) {
        setUserPosts(response.data.userPosts);
      }
    };

    fetchPosts();
  }, [username]);

  const handleSubmit = async () => {
    const response = await UserService.logout();
    if (response.status === 200) {
      Cookies.remove('username');
      navigate('/Login');
    }
  };

  const handleThreeDotsClick = (postId) => {
    setShowDropdown(showDropdown === postId ? null : postId);
  };

  const handleDeleteClick = async (post_id) => {
    try {
  
      const response = await PostService.deleteUserPost(username, post_id);
      if (response.status === 200) {
        setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== post_id));
      }
    } catch (error) {
      console.error('An error occurred while deleting the post:', error);
    } finally {
      setShowDropdown(null);
    }
  };

  return (
    <div className="profile">
      <h1>{username}</h1>
      
      <div className="user-details">
        <p>Bio: Success is in my veins.</p>
        <p>Followers: 512</p>
        <p>Following: 319</p>
      </div>

      <div className="user-posts">
        <h2>Posts:</h2>
        
        {userPosts.length > 0 ? (
          userPosts.map((post) => {
            const imageUrl = `http://localhost:3002/${post.media.replace(/\\/g, '/')}`;
            return (
              <div key={post.id} className="user_posts">
                <div className="post-options">
                  <span 
                    className="three-dots"
                    onClick={() => handleThreeDotsClick(post.id)}
                  >
                    &#x22EE; 
                  </span>
                  <div className={`dropdown-menu ${showDropdown === post.id ? 'show' : ''}`}>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteClick(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
                    <p>Likes: 54</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h2>You haven't posted anything yet.</h2>
        )}
      </div>
      
      <button onClick={handleSubmit}>Log Out</button>
    </div>
  );
}

export default Profile;
