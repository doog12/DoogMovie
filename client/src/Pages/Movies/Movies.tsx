import React, { useState, Suspense, lazy, useEffect} from 'react'
import axios from 'axios'

import './Movies.scss'
import './Dropdown.scss'


const LazyMovieCard = lazy(() => import('./MovieCard/MovieCard'))


interface Data {
    id: number,
    poster_path: string,
    title: string,
    original_title: string,
    popularity: number,
    vote_average: number,
    release_date: string | number
}

export interface Movie {
    id: number,
    poster: string,
    title: string
    imageAlt: string
}

interface MoviesState {
    id: number,
    poster: string,
    title: string,
    imageAlt: string,
    popularity: number,
    rating: number,
    releaseDate: string | number
}

const Movies = () => {

    //! =============================== FETCHING DATA FROM API ===============================
    const TMDB_API = process.env.REACT_APP_TMDB_API // API KEY

    const [movies, setMovies] = useState<MoviesState[]>([]) // Transformed Array of Objects that came from the api

    const currentPage = 1 // current page TODO: Do pagination

    const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API}&language=ru-Ru&page=${currentPage}` // URL for Fetch

    // API Request Function
    const getMovies = () => {
        axios.get(popularMovieUrl)
        .then(response => {
            const data = response.data.results

            // Transform data
            const outputData: MoviesState[] = data.map((item: Data) => (
                {
                    id: item.id,
                    poster: item.poster_path,
                    title: item.title,
                    imageAlt: item.original_title,
                    popularity: item.popularity,
                    rating: item.vote_average,
                    releaseDate: item.release_date
                }
            ))

            setMovies(outputData)
        })
    }

    useEffect(() => {
        getMovies()
    }, [])
    //! ======================================================================================


    //! ================================== DROPDOWN SETTINGS =================================
    type TypeMenuItems = {
        value: string
        sort: Function
    }

    const [value, setValue] = useState<string>('Популярное') // Value of Dropdown

    const [visible, setVisible] = useState<boolean>(false) // Is the Dropdown visible ?

    // Dropdown elements
    const menuItems: TypeMenuItems[] = [
        {
            value: 'Популярное', // value
            sort: () => sortByPopularity() // sorting function
        },
        {
            value: 'Топ рейтинга', // value
            sort: () => sortByRaiting() // sorting function
        },
        {
            value: 'Последнее', // value
            sort: () => sortByReleaseData() // sorting function
        }
    ]

        //* ============================= SORT FUNCTIONS =============================

        const sortByPopularity = () => {
            const sort = movies.sort((a: MoviesState, b: MoviesState) => a.popularity > b.popularity ? -1 : 1)
            setMovies(sort)
        }
        const sortByRaiting = () => {
            const sort = movies.sort((a: MoviesState, b: MoviesState) => a.rating > b.rating ? -1 : 1)
            setMovies(sort)
        }
        const sortByReleaseData = () => {
            const sort = movies.sort((a: MoviesState, b: MoviesState) => a.releaseDate > b.releaseDate ? -1 : 1)
            setMovies(sort)
        }

        //* ==========================================================================
    //! ======================================================================================


    return (
        <div className="movies-page">
            <div className="container">
                <div className="movies-page__toolbar">
                    <div className="movies-page__toolbar__display">

                        <div className="movies-page__toolbar__display__dropdown">
                            <p className={`movies-page__toolbar__display__dropdown__title ${visible ? 'active' : ''}`} onClick={() => setVisible(!visible)}>{value}</p>
                            <div className={`movies-page__toolbar__display__dropdown__menu ${visible ? 'active' : ''}`}>
                                <div className="movies-page__toolbar__display__dropdown__menu__list">
                                    {
                                        menuItems.map((item: TypeMenuItems, index: number) => (
                                            <div className="movies-page__toolbar__display__dropdown__menu__list__item" onClick={() => {
                                                setValue(item.value)
                                                setVisible(!visible)
                                                item.sort()
                                            }} key={index}>{item.value}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="movies-page__cards">
                    {
                        movies.map((movie: Movie, index: number) => (
                            <Suspense fallback={<div>Loading...</div>} key={`${index}_${movie.id}`}>
                                <LazyMovieCard id={movie.id} poster={movie.poster} title={movie.title} imageAlt={movie.imageAlt} />
                            </Suspense>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Movies
