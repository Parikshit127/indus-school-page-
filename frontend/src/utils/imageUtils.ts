// Image utility functions for better image handling

export const getOptimizedImageUrl = (url: string, width?: number, height?: number): string => {
  // If it's an Unsplash URL, add optimization parameters
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('q', '80');
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }
  
  return url;
};

export const getImageFallback = (type: 'activity' | 'gallery' | 'video' | 'sports' | 'cultural' = 'gallery'): string => {
  const fallbacks = {
    activity: 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=Activity+Image',
    gallery: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Image+Not+Available',
    video: 'https://via.placeholder.com/640x360/1e293b/f1f5f9?text=Video+Thumbnail',
    sports: 'https://via.placeholder.com/800x600/e2e8f0/64748b?text=Sports+Activity',
    cultural: 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Cultural+Event'
  };
  
  return fallbacks[type];
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallbackType?: string) => {
  const target = e.target as HTMLImageElement;
  const type = fallbackType || 'gallery';
  target.src = getImageFallback(type as any);
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};