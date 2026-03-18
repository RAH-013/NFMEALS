import React, { useState } from 'react'

function Images({ src, alt = "Imagen", width = "100%", height = "auto", objectFit = "cover" }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className="relative rounded-2xl overflow-hidden shadow-xl w-full"
            style={{ width, height }}
        >
            {!loaded && (
                <div className="absolute inset-0 bg-gray-400 dark:bg-gray-700 animate-pulse"></div>
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full rounded-2xl transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ objectFit }}
            />
        </div>
    )
}

export default Images