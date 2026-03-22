import React from 'react'

function Loader() {
    return (
        <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center gap-4">
            <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
    )
}

export default Loader