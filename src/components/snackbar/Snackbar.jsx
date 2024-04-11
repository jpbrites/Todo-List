// Snackbar.js
import React, { useState, useEffect } from 'react';
import './snackbar.css';

function Snackbar({ message, isSuccess }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 3000); // Oculta a snackbar após 3 segundos
        }
    }, [message]);

    return (
        <div className={`snackbar ${isVisible ? 'show' : ''} ${isSuccess ? 'success' : 'error'}`}>
            {message}
        </div>
    );
}

export default Snackbar;
