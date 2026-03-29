import React from 'react';

const LatestComments = ({ comments = [] }) => {
  // Original app.js used renderLastThreeComments
  const lastThree = [...comments].reverse().slice(0, 3);

  return (
    <div className="latest-comments">
      <div className="latest-comments-header">
        <div>
          <h2 className="latest-comments-title">
            <i className="fa-solid fa-comments"></i> Latest Comments
          </h2>
          <p className="latest-comments-subtitle">Recent discussions from the community</p>
        </div>
      </div>
      
      <div className="latest-comments-container">
        {lastThree.length > 0 ? (
          lastThree.map((comment, index) => (
            <div key={comment.id} className="latest-comment-card" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="comment-meta">
                <div className="comment-author">
                  <i className="fa-solid fa-user-circle"></i>
                  <div className="author-info">
                    <span className="author-name">{comment.author}</span>
                    <span className="post-ref">on <strong>{comment.postTitle}</strong></span>
                  </div>
                </div>
              </div>
              
              <div className="comment-content">
                <p className="comment-snippet">"{comment.comment.substring(0, 60)}{comment.comment.length > 60 ? '...' : ''}"</p>
              </div>
              
              <div className="comment-action">
                <a href="#" className="comment-view-link">
                  <span>View full comment</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments">
            <i className="fa-solid fa-inbox"></i>
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestComments;
