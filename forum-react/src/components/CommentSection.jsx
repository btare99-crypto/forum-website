import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';

const CommentBubble = ({ comment, onDelete, onDeleteClick }) => {
  const { currentUser } = useAuth();

  return (
    <div className="comment-bubble">
      <div className="comment-header">
        <div className="comment-author">
          <div className="author-avatar">
            <i className="fa-solid fa-circle-user"></i>
          </div>
          <div className="author-info">
            <span className="author-name">{comment.author}</span>
            <span className="comment-date">{comment.date} at {comment.time}</span>
          </div>
        </div>
        {currentUser === comment.author && (
          <button
            className="delete-comment-btn"
            onClick={() => onDeleteClick(comment.id)}
            title="Delete comment"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>

      <div className="comment-content">
        <p className="comment-text">{comment.comment}</p>
      </div>

      <div className="comment-footer">
        <div className="comment-actions">
          <button className="action-btn reply-btn">
            <i className="fa-solid fa-reply"></i>
            <span>Reply</span>
          </button>
          <button className="action-btn like-btn">
            <i className="fa-regular fa-heart"></i>
            <span>Like</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ postId, comments, onAddComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const { currentUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  const handleDeleteClick = (commentId) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCommentId) {
      onDeleteComment(selectedCommentId);
      setIsModalOpen(false);
      setSelectedCommentId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedCommentId(null);
  };

  return (
    <>
      <div className="comment-section-modern">
        <div className="comment-section-header">
          <h2 className="comment-section-title">
            <i className="fa-solid fa-comments"></i>
            Comments
            <span className="comments-count">({comments.length})</span>
          </h2>
          <p className="comment-section-subtitle">Join the conversation</p>
        </div>

        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <CommentBubble
                key={comment.id}
                comment={comment}
                onDelete={onDeleteComment}
                onDeleteClick={handleDeleteClick}
                style={{animationDelay: `${index * 0.1}s`}}
              />
            ))
          ) : (
            <div className="no-comments-state">
              <i className="fa-solid fa-comment-slash"></i>
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        {currentUser ? (
          <div className="comment-form-container">
            <div className="comment-form-header">
              <h3>Add a Comment</h3>
              <p>Share your thoughts with the community</p>
            </div>

            <form className="comment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  className="comment-input"
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  rows="4"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setNewComment('')}>
                  <i className="fa-solid fa-xmark"></i>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="login-prompt">
            <i className="fa-solid fa-lock"></i>
            <p>Please <a href="/login">log in</a> to join the conversation</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default CommentSection;
