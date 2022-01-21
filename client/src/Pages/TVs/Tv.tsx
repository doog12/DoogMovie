import React, { lazy, Suspense, useEffect, useState } from 'react'
import axios from 'axios'

import './Tv.scss'
import './Dropdown.scss'

const LazyTvCard = lazy(() => import('./TvCard/TvCard'))


interface Data {
    id: number,
    poster_path: string,
    name: string,
    original_name: string,
    popularity: number,
    vote_average: number,
    first_air_date: string | number
}

export interface TV {
    id: number,
    poster: string,
    title: string
    imageAlt: string
}

interface TVsState {
    id: number,
    poster: string,
    title: string,
    imageAlt: string,
    popularity: number,
    rating: number,
    releaseDate: string | number
}



const Tv = () => {

    //! =============================== FETCHING DATA FROM API ===============================
    const TMDB_API = process.env.REACT_APP_TMDB_API // API KEY

    const [tv, setTv] = useState<TVsState[]>([]) // Transformed Array of Objects that came from the api

    const currentPage = 1 // current page TODO: Do pagination

    const popularTvUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API}&language=ru-Ru&page=${currentPage}` // URL for Fetch

    // API Request Function
    const getTV = () => {
        axios.get(popularTvUrl)
        .then(response => {
            const data = response.data.results

            // Transform data
            const outputData: TVsState[] = data.map((item: Data) => (
                {
                    id: item.id,
                    poster: item.poster_path,
                    title: item.name,
                    imageAlt: item.original_name,
                    popularity: item.popularity,
                    rating: item.vote_average,
                    releaseDate: item.first_air_date
                }
            ))

            setTv(outputData)
        })
    }

    useEffect(() => {
        getTV()
    }, [])
    //! ======================================================================================


    //! ================================== DROPDOWN SETTINGS =================================
    type TypeMenuItems = {
        value: string,
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
            const sort = tv.sort((a: TVsState, b: TVsState) => a.popularity > b.popularity ? -1 : 1)
            setTv(sort)
        }
        const sortByRaiting = () => {
            const sort = tv.sort((a: TVsState, b: TVsState) => a.rating > b.rating ? -1 : 1)
            setTv(sort)
        }
        const sortByReleaseData = () => {
            const sort = tv.sort((a: TVsState, b: TVsState) => a.releaseDate > b.releaseDate ? -1 : 1)
            setTv(sort)
        }

        //* ==========================================================================
    //! ======================================================================================



    return (
        <div className="tv-page">
            <div className="container">
                <div className="tv-page__toolbar">
                    <div className="tv-page__toolbar__display">

                        <div className="tv-page__toolbar__display__dropdown">
                            <p className={`tv-page__toolbar__display__dropdown__title ${visible ? 'active' : ''}`} onClick={() => setVisible(!visible)}>{value}</p>
                            <div className={`tv-page__toolbar__display__dropdown__menu ${visible ? 'active' : ''}`}>
                                <div className="tv-page__toolbar__display__dropdown__menu__list">
                                    {
                                        menuItems.map((item: TypeMenuItems, index: number) => (
                                            <div className="tv-page__toolbar__display__dropdown__menu__list__item" onClick={() => {
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
                <div className="tv-page__cards">
                    {
                        tv.map((item: TV, index: number) => (
                            <Suspense fallback={<div>Loading...</div>} key={`${index}_${item.id}`}>
                                <LazyTvCard id={item.id} poster={item.poster} title={item.title} imageAlt={item.imageAlt} />
                            </Suspense>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Tv
