import React from 'react';

const NotificationModal = ({ isOpen, message, onClose }) => {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`}>
            <div className="modal-content">
                <span clasName="close" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    )
}
export default NotificationModal;