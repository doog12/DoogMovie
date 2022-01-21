import React, { useEffect, useState } from 'react'

import SeriesPageIntro from './SeriesPageIntro/SeriesPageIntro'
import SeriesPageContent from './SeriesPageContent/SeriesPageContent'

import './SeriesPage.scss'
import { TMDBResult } from './@interfaces/series.interfaces'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const SeriesPage = ({type} : {type: string}) => {
    const { id } = useParams() // ID from browser Link

    const TMDB_API = process.env.REACT_APP_TMDB_API

    const [details, setDetails]: any = useState('') // All information from API

    const filmUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API}&language=ru-Ru&append_to_response=external_id,videos` // movie and tv url
    const animeUrl = `https://shikimori.one/api/animes/${id}` // anime url

    const fetchURL = type === 'anime' ? animeUrl : filmUrl // URL for FETCH

    const getDetails = () => {
        axios
            .get(
                fetchURL
            )
            .then((response) => {
                const data = response.data
                const array = []
                array.push(data)
                const outputData = array.map((item: TMDBResult) => ({
                    title: item.title || item.russian || item.name,
                    originalTitle: item.original_title || item.original_name || item.name,
                    overview: item.overview || item.description,
                    adult: item.adult || false,
                    bgImage: item.backdrop_path || item.screenshots[0].preview,
                    posterImage: item.poster_path || item.image.original,
                    genres: item.genres,
                    imdb_id: item.imdb_id,
                    status: item.status,
                    voteAverage: item.vote_average || item.score,
                    releaseDate: item.release_date || item.aired_on || item.first_air_date,
                    authors: item.production_companies || item.studios,
                    networks: item.networks || '',
                    videos: item.videos.results || item.videos
                }))
                setDetails(outputData)
            })
    }

    useEffect(() => {
        getDetails()
    }, [])


    return (
        <div className="series-page">
            <SeriesPageIntro details={details[0]} type={type}/>
            <SeriesPageContent trailers={details[0] ? details[0].videos : null} type={type} />
        </div>
    )
}

export default SeriesPage
