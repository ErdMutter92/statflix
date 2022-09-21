export interface NetflixTitle {
    show_id: string;
    type: "Movie" | "TV Show";
    title: string;
    director: string[];
    cast: string[];
    country: string[];
    date_added: string;
    release_year: string;
    rating: string;
    duration: string;
    listed_in: string[];
    description: string;
}