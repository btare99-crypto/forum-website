import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';

// ============ CONSTANTS ============
const STORAGE_KEYS = {
  POSTS: 'posts',
  COMMENTS: 'comments',
};

const DATE_FORMAT_OPTIONS = {
  date: { year: 'numeric', month: 'long', day: 'numeric' },
  time: { hour: '2-digit', minute: '2-digit', hour12: true },
};

const DEFAULT_IMAGE = '/images/nophotoimage.avif';

// ============ UTILITY FUNCTIONS ============
const getFormattedDate = () =>
  new Date().toLocaleDateString('en-US', DATE_FORMAT_OPTIONS.date);

const getFormattedTime = () =>
  new Date().toLocaleTimeString('en-US', DATE_FORMAT_OPTIONS.time);

const createCommentObject = (postId, postTitle, text, author) => ({
  id: Date.now(),
  postId,
  postTitle,
  author: author || 'Guest',
  comment: text,
  date: getFormattedDate(),
  time: getFormattedTime(),
});

// ============ CUSTOM HOOKS ============
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error writing to localStorage: ${key}`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

// ============ COMPONENTS ============
const PostCardPost = ({ post, comments, onAddComment, onDeleteComment }) => {
  return (
    <div className="cardpost-post post-detail-card">
      <div className="post-content">
          <div className="post-header">
            <div className="post-meta">
              <i className="fa-solid fa-circle-user"></i>
              <div className="post-info">
                <h3>{post.author}</h3>
                <p>{post.date} at {post.time}</p>
              </div>
            </div>
            <img src={post.image || DEFAULT_IMAGE} alt="Post image" />
          </div>

          <div className="insidecards">
            <p>{post.title}</p>
            <div className="msgviewicon">
              <i className="fa-regular fa-eye"></i>
              <p className="view-count">{post.views || 0}</p>
              <i className="fa-regular fa-message"></i>
              <p className="comments-count-icon">{comments.length}</p>
            </div>
          </div>

          <p className="comment-text">{post.description}</p>
        </div>

          <CommentSection
            postId={post.id}
            comments={comments}
            onAddComment={(text) => onAddComment(post.id, post.title, text)}
            onDeleteComment={(commentId) => onDeleteComment(post.id, commentId)}
          />
        </div>
  );
};

const PostDetailPage = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useLocalStorage(STORAGE_KEYS.POSTS, []);
  const [comments, setComments] = useLocalStorage(STORAGE_KEYS.COMMENTS, []);

  useEffect(() => {
    const syncData = () => {
      setPosts(JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || []);
      setComments(JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS)) || []);
    };

    window.addEventListener('storage', syncData);
    return () => window.removeEventListener('storage', syncData);
  }, [setPosts, setComments]);

  const handleAddComment = useCallback(
    (postId, postTitle, text) => {
      const newComment = createCommentObject(postId, postTitle, text, currentUser);
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);

      // Update posts array to sync comments
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      );
      setPosts(updatedPosts);
    },
    [comments, posts, currentUser, setComments, setPosts]
  );

  const handleDeleteComment = useCallback(
    (postId, commentId) => {
      const updatedComments = comments.filter((c) => c.id !== commentId);
      setComments(updatedComments);

      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, comments: (post.comments || []).filter((c) => c.id !== commentId) }
          : post
      );
      setPosts(updatedPosts);
    },
    [comments, posts, setComments, setPosts]
  );

  return (
    <div className="all-cards">
      <div className="cards-post">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCardPost
              key={post.id}
              post={post}
              comments={comments.filter((c) => c.postId === post.id)}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          ))
        ) : (
          <div className="no-posts no-comments-state">
            <i className="fa-solid fa-file-circle-xmark"></i>
            <p>No posts found yet. Be the first to add one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
