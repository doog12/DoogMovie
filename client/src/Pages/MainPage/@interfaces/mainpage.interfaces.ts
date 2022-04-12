export interface FilmType {
    id: number | string
    title: string
    backdrop_path: string
}

export interface AnimeType {
    id: number | string
    image: { original: string }
    russian: string
}

export interface TVType {
    id: number | string
    name: string
    backdrop_path: string
}
