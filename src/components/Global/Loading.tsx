import React from 'react';
import './Loading.css'
function Loading() {
    return (
        <div className="loading__container">
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    );
}

export default Loading;