import { useState } from 'react';
import { SimpleGallery } from '@/components/SimpleGallery';

export default function TestPage() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const testImages = [
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop',
        'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Fallback+Image',
        'https://httpstat.us/404', // This should fail
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Image Loading Test</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testImages.map((src, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">Test Image {index + 1}</h3>
                        <div className="relative h-64 bg-gray-200 rounded overflow-hidden">
                            <img
                                src={src}
                                alt={`Test ${index + 1}`}
                                className="w-full h-full object-cover"
                                onLoad={() => {
                                    console.log(`Image ${index + 1} loaded successfully`);
                                    setImageLoaded(true);
                                }}
                                onError={(e) => {
                                    console.log(`Image ${index + 1} failed to load`);
                                    const target = e.target as HTMLImageElement;
                                    if (!target.src.includes('placeholder')) {
                                        target.src = 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Failed+to+Load';
                                    }
                                    setImageError(true);
                                }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-2 break-all">{src}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">API Test</h3>
                <button
                    onClick={async () => {
                        try {
                            const response = await fetch('http://localhost:4000/api/gallery');
                            const data = await response.json();
                            console.log('API Response:', data);
                            alert(`API returned ${data.length} items`);
                        } catch (error) {
                            console.error('API Error:', error);
                            alert('API call failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
                        }
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Test API Call
                </button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded">
                <p>Image Loaded: {imageLoaded ? 'Yes' : 'No'}</p>
                <p>Image Error: {imageError ? 'Yes' : 'No'}</p>
            </div>

            <div className="mt-8">
                <SimpleGallery />
            </div>
        </div>
    );
}