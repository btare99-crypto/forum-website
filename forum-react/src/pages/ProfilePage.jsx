import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';

const ProfilePage = () => {
  const { currentUser, users, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || []);
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || []);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handlePostsUpdate = () => {
      setPosts(JSON.parse(localStorage.getItem('posts')) || []);
    };

    window.addEventListener('postsUpdated', handlePostsUpdate);
    
    return () => {
      window.removeEventListener('postsUpdated', handlePostsUpdate);
    };
  }, []);

  if (!currentUser) {
    return (
      <div className="profile-content">
        <div className="guest-box">
          <p className="guest-message">You’re currently browsing as a guest. Please log in to view your profile.</p>
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    );
  }

  const user = users.find(u => u.username === currentUser) || {};
  const myPosts = posts.filter(p => p.author === currentUser);
  const totalComments = comments.filter(c => c.author === currentUser).length;

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedPosts = posts.filter(p => p.id !== postToDelete);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setIsDeleteModalOpen(false);
  };

  const startEditPost = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const saveEditPost = (postId) => {
    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          title: editTitle.trim() || p.title,
          description: editDescription.trim() || p.description,
        };
      }
      return p;
    });
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setEditingPostId(null);
    setEditTitle('');
    setEditDescription('');
  };

  return (
    <div className="profile-content">
      <h2 className="welcome" id="typing-text">Welcome, {currentUser}!</h2>
      
      <div className="profile-viewport">
        <div className="my-profile">
          <div className="icon-box">
            {user.profilePic ? (
              <img src={user.profilePic} id="profile-pic" alt="Profile" />
            ) : (
              <i className="fa-solid fa-circle-user" style={{ fontSize: '150px' }}></i>
            )}
            <i 
              className="fa-solid fa-pen-to-square edit-icon" 
              onClick={() => fileInputRef.current.click()}
            ></i>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const updatedUsers = users.map(u => u.username === currentUser ? { ...u, profilePic: reader.result } : u);
                    localStorage.setItem('users', JSON.stringify(updatedUsers));
                    window.location.reload(); // Simple way to refresh state across components
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <h2 id="profile-username">{currentUser}</h2>
          <p id="member-since">Member since {user.memberSince || 'July 2025'}</p>
          <p id="posts-comments">{myPosts.length} Posts | {totalComments} Comments</p>
        </div>
      </div>

      <section className="card-grid">
        <div className="postbutton-profile">
          <div>
              <h2 className="latest-comments-title">
                <i className="fa-solid fa-layer-group"></i> My Posts
              </h2>
              <p className="latest-comments-subtitle">
                Your contributions to the community
              </p>
            </div>
          <button id="createPostBtn" onClick={() => navigate('/create-post')}>Create new post</button>
        </div>

        <div className="cards-profile">
          {myPosts.map(post => (
            <div key={post.id} className="post-card-wrapper">
              <PostCard
                post={post}
                onViewClick={(id) => navigate(`/post/${id}`)}
                onCommentClick={(id) => navigate(`/post/${id}`)}
                hideAuthor={true}
                isEditing={editingPostId === post.id}
                editTitle={editTitle}
                editDescription={editDescription}
                onTitleChange={setEditTitle}
                onDescriptionChange={setEditDescription}
              />

              <div className="profile-actions-overlay">
                {editingPostId === post.id ? (
                  <>
                    <button
                      className="edit-btn"
                      onClick={(e) => { e.stopPropagation(); saveEditPost(post.id); }}
                      title="Save post"
                    >
                      <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => { e.stopPropagation(); cancelEdit(); }}
                      title="Cancel"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={(e) => { e.stopPropagation(); startEditPost(post); }}
                      title="Edit post"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(post.id); }}
                      title="Delete post"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {myPosts.length === 0 && <div className="no-posts" id="no-post" style={{ display: 'block' }}>No posts found</div>}
      </section>

      <Modal 
        isOpen={isDeleteModalOpen}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
