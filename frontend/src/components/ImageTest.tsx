import { useState } from 'react';

export function ImageTest() {
    const [imageStatus, setImageStatus] = useState<Record<string, string>>({});

    const testImages = [
        {
            name: 'Sports',
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop'
        },
        {
            name: 'Arts',
            url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop'
        },
        {
            name: 'Academic',
            url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop'
        },
        {
            name: 'Hero',
            url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop'
        }
    ];

    const updateStatus = (name: string, status: string) => {
        setImageStatus(prev => ({ ...prev, [name]: status }));
    };

    return (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
            <h3 className="font-bold mb-2">Image Status</h3>
            {testImages.map(({ name, url }) => (
                <div key={name} className="mb-2">
                    <div className="flex items-center justify-between text-sm">
                        <span>{name}:</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                            imageStatus[name] === 'loaded' ? 'bg-green-100 text-green-800' :
                            imageStatus[name] === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {imageStatus[name] || 'loading'}
                        </span>
                    </div>
                    <img
                        src={url}
                        alt={name}
                        className="w-full h-16 object-cover mt-1 rounded"
                        onLoad={() => updateStatus(name, 'loaded')}
                        onError={() => updateStatus(name, 'failed')}
                        style={{ display: 'none' }} // Hidden, just for testing
                    />
                </div>
            ))}
        </div>
    );
}