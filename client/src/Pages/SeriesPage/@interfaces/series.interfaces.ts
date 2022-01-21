export interface FilmAuthors {
    id: string | number,
    name: string,
    russian?: string, //anime
    logo_path?: string
}

export interface AnimeStudios {
    id: string | number,
    name: string,
    image?: string
}

export interface Networks {
    id: string | number,
    name: string,
    logo_path?: string
}

export interface TMDBResult {
    // Russian title
    russian: string, //anime
    title: string,  //movie
    name: string,   //tv || anime orig title

    // Original title
    original_title: string, //movie
    original_name: string,  //tv

    // Description
    overview: string,   //tv, movie
    description: string //anime

    adult: boolean,

    // Background Image
    backdrop_path: string, //tv. movie
    screenshots: { preview: string }[] //anime

    // Poster Image
    poster_path: string, //tv, movie
    image: { original: string },  //anime

    // Genres
    genres: any,

    // IMDB id
    imdb_id: number | string,

    // Status
    status: string,

    // Score
    vote_average: number | string, //tv, movie
    score: number | string, //anime

    // Release Date
    release_date: number | string, //movie
    aired_on: number | string, //anime
    first_air_date: number | string, // tv

    // Authors
    production_companies: FilmAuthors[],
    studios: AnimeStudios[],
    networks: Networks[],

    // Videos
    videos: any
}