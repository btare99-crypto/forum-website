import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

const CreatePostPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    const createPost = (imgData) => {
      const newPost = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: imgData,
        author: currentUser,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        views: 0,
        comments: []
      };

      const updatedPosts = [...posts, newPost];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setIsSuccessModalOpen(true);
    };

    if (formData.image) {
      const reader = new FileReader();
      reader.onload = () => createPost(reader.result);
      reader.readAsDataURL(formData.image);
    } else {
      createPost(null);
    }
  };

  return (
    <div className="create-post-viewport">
      <div className="create-post">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Post Title</label><br />
          <input 
            type="text" 
            id="title" 
            placeholder="Enter post title..." 
            minLength="5" 
            maxLength="100" 
            required 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <small id="post-title-count">{formData.title.length} / 100</small><br />

          <div className="file-and-category">
            <div>
              <label htmlFor="image">Upload Image</label>
              <input 
                type="file" 
                id="image" 
                className="input" 
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </div>
            <div>
              <label htmlFor="categories">Category</label>
              <select 
                id="categories" 
                name="category" 
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Choose</option>
                <option value="General">General</option>
                <option value="Tech">Tech</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
                <option value="Ideas">Ideas</option>
              </select>
            </div>
          </div>

          <label htmlFor="description">Description</label><br />
          <textarea 
            id="description" 
            rows="6" 
            placeholder="Write your post description..." 
            minLength="20" 
            maxLength="200" 
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
          <small id="post-description-count">{formData.description.length} / 200</small><br /><br />

          <button type="submit">Publish Post</button>
        </form>
      </div>

      <Modal 
        isOpen={isSuccessModalOpen}
        title="Success! 🎉"
        message="Your post has been created successfully!"
        onConfirm={() => navigate('/')}
        hasButtons={false}
        autoCloseDuration={2500}
      />
    </div>
  );
};

export default CreatePostPage;
