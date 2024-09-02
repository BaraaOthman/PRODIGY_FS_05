import React, { useState } from 'react';
import '../styles/CreatePost.css';
import { useCookies } from 'react-cookie';
import PostService from '../PostServices';
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [cookies] = useCookies(['username']);
  const navigate = useNavigate();
  const username = cookies.username;
  const [preview, setPreview] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);

    // Create a preview of the selected file
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handlePost = async () => {
    try {
      // Create a FormData object to send data to the backend
      const formData = new FormData();
      formData.append('username', username);
      formData.append('content', content);
      if (media) {
        formData.append('media', media);
      }

      // Call the createpost method from PostService
      await PostService.createpost(formData);
      
        window.location.reload();
      
      // Clear the form after successful post
      setContent('');
      setMedia(null);
      setPreview(null);
      
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };


  return (
    <div className="create-post">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      
<div className="media-upload">
        <label htmlFor="file-upload" className="custom-file-upload">
          Upload Image/Video
        </label>
        <input id="file-upload" type="file" onChange={handleMediaChange} accept="image/*,video/*" />
        {preview && (
          <div className="preview">
            {media.type.startsWith('image') ? (
              <img src={preview} alt="Media preview" />
            ) : (
              <video src={preview} controls />
            )}
          </div>
        )}
      </div>

      <button onClick={handlePost} disabled={!content && !media}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;
