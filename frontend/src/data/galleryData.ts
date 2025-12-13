
export interface GalleryAlbum {
    id: string;
    title: string;
    date: string | null;
    photoCount: number;
    coverImage: string; // URL to a placeholder or generated image
}

export interface VideoItem {
    id: string;
    title: string;
    videoUrl: string; // YouTube embed URL or similar
    thumbnail: string;
    duration: string;
}

export const galleryAlbums: GalleryAlbum[] = [
    {
        id: "mun-day-1-2025",
        title: "MUN day 1",
        date: "2025",
        photoCount: 2,
        coverImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "stress-management",
        title: "stress management Workshop",
        date: null,
        photoCount: 7,
        coverImage: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "janmashtami-2025",
        title: "Shree Krishna Janmashtami",
        date: "2025",
        photoCount: 8,
        coverImage: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "independence-day-2025",
        title: "Independence Day",
        date: "2025",
        photoCount: 10,
        coverImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop"
    },
    {
        id: "atl-workshop-2025",
        title: "ATL WORKSHOP",
        date: "8-07-2025",
        photoCount: 5,
        coverImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "seminar-adolescence-2025",
        title: "Seminar on Adolescence",
        date: "28.04.2025",
        photoCount: 2,
        coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: "gratitude-day-2025",
        title: "GRATITUDE DAY",
        date: "1.05.2025",
        photoCount: 5,
        coverImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop"
    },
    {
        id: "award-ceremony-2025",
        title: "AWARD CEREMONY",
        date: "19.4.2025",
        photoCount: 7,
        coverImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop"
    },
    {
        id: "republic-day-2024-25",
        title: "REPUBLIC DAY 2024-25",
        date: null,
        photoCount: 12,
        coverImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2074&auto=format&fit=crop"
    },
    {
        id: "farewell",
        title: "FAREWELL",
        date: null,
        photoCount: 11,
        coverImage: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop"
    }
];

export const galleryVideos: VideoItem[] = [
    {
        id: "annual-function-2024",
        title: "Annual Function 2024 Highlights",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
        duration: "5:30"
    },
    {
        id: "sports-day-2024-video",
        title: "Annual Sports Day 2024",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
        duration: "3:45"
    },
    {
        id: "school-tour",
        title: "Virtual School Tour",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=2070&auto=format&fit=crop",
        duration: "10:00"
    },
    {
        id: "principal-message",
        title: "Message from the Principal",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop",
        duration: "4:00"
    }
];
