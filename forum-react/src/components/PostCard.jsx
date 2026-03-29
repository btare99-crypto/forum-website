import React from 'react';
import { useAuth } from '../context/AuthContext';

const PostCard = ({ post, onViewClick, onCommentClick, hideAuthor = false, isEditing = false, editTitle = '', editDescription = '', onTitleChange, onDescriptionChange }) => {
  const { currentUser } = useAuth();

  const handlePostClick = () => {
    // Increment views only if current user is not the author
    if (currentUser !== post.author) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedPosts = posts.map(p => {
        if (p.id === post.id) {
          return { ...p, views: (p.views || 0) + 1 };
        }
        return p;
      });
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('postsUpdated'));
    }

    // Navigate to post detail
    onViewClick(post.id);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    onCommentClick(post.id);
  };

  return (
    <div className="cardpost" onClick={handlePostClick}>
      <div className="post-content">
        <div className="post-header">
          {!hideAuthor && (
            <div className="post-meta">
              <i className="fa-solid fa-circle-user"></i>
              <div className="post-info">
                <h3>{post.author}</h3>
                <p>{post.date} at {post.time}</p>
              </div>
            </div>
          )}
          <img src={post.image || '/images/nophotoimage.avif'} alt="Post image" />
        </div>

        <div className="insidecards">
          {isEditing ? (
            <input
              className="profile-edit-text-input"
              value={editTitle}
              onChange={(e) => onTitleChange && onTitleChange(e.target.value)}
              placeholder="Edit title"
            />
          ) : (
            <p>{post.title}</p>
          )}
          <div className="msgviewicon">
            <i className="fa-regular fa-eye"></i>
            <p className="view-count">{post.views || 0}</p>
            <i className="fa-regular fa-message"></i>
            <p className="comments-count-icon">{post.comments ? post.comments.length : 0}</p>
          </div>
        </div>

        {isEditing ? (
          <textarea
            className="profile-edit-textarea"
            value={editDescription}
            onChange={(e) => onDescriptionChange && onDescriptionChange(e.target.value)}
            placeholder="Edit description"
          />
        ) : (
          <p className="comment-text">{post.description}</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
