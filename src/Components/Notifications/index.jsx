import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, duration = 3000, onClose = () => {} }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out opacity-100 hover:opacity-90">
            {message}
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    onClose: PropTypes.func
};

export  {Notification};