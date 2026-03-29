import React from 'react';

const Modal = ({ isOpen, title, message, onConfirm, onCancel, hasButtons = true, autoCloseDuration = 3000 }) => {
  React.useEffect(() => {
    if (isOpen && !hasButtons) {
      const timer = setTimeout(() => {
        if (onConfirm) onConfirm();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasButtons, autoCloseDuration, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        {hasButtons && (
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={onCancel}>Cancel</button>
            <button className="btn-confirm" onClick={onConfirm}>Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
