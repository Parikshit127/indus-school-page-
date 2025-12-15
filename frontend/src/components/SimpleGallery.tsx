import { useState, useEffect } from 'react';

interface GalleryItem {
    _id: string;
    type: 'photo' | 'video';
    url: string;
    title: string;
    date: string;
}

export function SimpleGallery() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('SimpleGallery: Fetching data...');
                const response = await fetch('http://localhost:4000/api/gallery?type=photo');
                const data = await response.json();
                console.log('SimpleGallery: Data received:', data);
                setItems(data);
            } catch (error) {
                console.error('SimpleGallery: Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading simple gallery...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Simple Gallery Test ({items.length} items)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item._id} className="border p-2">
                        <img 
                            src={item.url} 
                            alt={item.title}
                            className="w-full h-48 object-cover"
                            onLoad={() => console.log('Image loaded:', item.title)}
                            onError={(e) => {
                                console.log('Image failed:', item.title);
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/300x200?text=Failed';
                            }}
                        />
                        <p className="mt-2 text-sm">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}