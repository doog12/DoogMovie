import React, { lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios'

import './Animes.scss'
import './Dropdown.scss'

const LazyAnimeCard = lazy(() => import('./AnimeCard/AnimeCard'))

interface Data {
    id: number
    image: {
        original: string
    }
    russian: string
    name: string
    score: string | number
    episodes: number
    aired_on: string | number
}

export interface Anime {
    id: number
    poster: string
    title: string
    imageAlt: string
}

interface AnimesState {
    id: number
    poster: string
    title: string
    imageAlt: string
    rating: number
    episodes: number
    releaseDate: string | number
}

const Animes = () => {
    //! =============================== FETCHING DATA FROM API ===============================

    const [animes, setAnimes] = useState<AnimesState[]>([]) // Transformed Array of Objects that came from the api

    // Fetch options
    const ShikimoriUrl = `https://shikimori.one` // Shikimori URL

    const currentPage = 1 // current page TODO: Do pagination
    const limit = 50 // data limit from API

    const popularAnimesUrl = `${ShikimoriUrl}/api/animes/?page=${currentPage}&limit=${limit}&order=popularity` // URL for Fetch

    // API Request Function
    const getAnimes = () => {
        axios.get(popularAnimesUrl).then((response) => {
            const data = response.data

            // Transform data
            const outputData: AnimesState[] = data.map((item: Data) => ({
                id: item.id,
                poster: item.image.original,
                title: item.russian,
                imageAlt: item.name,
                rating: item.score,
                episides: item.episodes,
                releaseDate: item.aired_on
            }))

            setAnimes(outputData)
        })
    }

    useEffect(() => {
        getAnimes()
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
            sort: () => getAnimes() // sorting function
        },
        {
            value: 'Топ рейтинга', // value
            sort: () => sortByRating() // sorting function
        },
        {
            value: 'Последнее', // value
            sort: () => sortByReleaseData() // sorting function
        },
        {
            value: 'По эпизодам', // value
            sort: () => sortByEpisodes() // sorting function
        }
    ]

    //* ============================= SORT FUNCTIONS =============================

    const sortByRating = () => {
        const sort = animes.sort((a: AnimesState, b: AnimesState) => (a.rating > b.rating ? -1 : 1))
        setAnimes(sort)
    }
    const sortByReleaseData = () => {
        const sort = animes.sort((a: AnimesState, b: AnimesState) =>
            a.releaseDate > b.releaseDate ? -1 : 1
        )
        setAnimes(sort)
    }
    const sortByEpisodes = () => {
        const sort = animes.sort((a: AnimesState, b: AnimesState) =>
            a.episodes > b.episodes ? -1 : 1
        )
        setAnimes(sort)
    }

    //* ==========================================================================
    //! ======================================================================================

    return (
        <div className="animes-page">
            <div className="container">
                <div className="animes-page__toolbar">
                    <div className="animes-page__toolbar__display">
                        <div className="animes-page__toolbar__display__dropdown">
                            <p
                                className={`animes-page__toolbar__display__dropdown__title ${
                                    visible ? 'active' : ''
                                }`}
                                onClick={() => setVisible(!visible)}
                            >
                                {value}
                            </p>
                            <div
                                className={`animes-page__toolbar__display__dropdown__menu ${
                                    visible ? 'active' : ''
                                }`}
                            >
                                <div className="animes-page__toolbar__display__dropdown__menu__list">
                                    {menuItems.map((item: TypeMenuItems, index: number) => (
                                        <div
                                            className="animes-page__toolbar__display__dropdown__menu__list__item"
                                            onClick={() => {
                                                setValue(item.value)
                                                setVisible(!visible)
                                                item.sort()
                                            }}
                                            key={index}
                                        >
                                            {item.value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="animes-page__cards">
                    {animes.map((item: Anime, index: number) => (
                        <Suspense fallback={<div>Loading...</div>} key={`${index}_${item.id}`}>
                            <LazyAnimeCard
                                id={item.id}
                                poster={item.poster}
                                title={item.title}
                                imageAlt={item.imageAlt}
                            />
                        </Suspense>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Animes
