import React, { useEffect, useState, Suspense } from 'react'
import Slider from '../../../components/Slider/Slider'

import axios from 'axios'

import './MainPageContent.scss'
import { AnimeType, FilmType, TVType } from '../@interfaces/mainpage.interfaces'
const LazySlider = React.lazy(() => import('../../../components/Slider/Slider') )

const MainPageContent = () => {
    const TMDB_API = process.env.REACT_APP_TMDB_API


    //* =============== TRENDING =================
    const [trending, setTrending] = useState([])

    const getTrending = () => {
        axios
            .get(
                `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API}&language=ru-RU`
            )
            .then((response) => {
                const results = response.data.results //array of films

                // array transformation
                const outputData = results.map(
                    (film: FilmType) => (
                        {
                            id: film.id,
                            backgroundImage: `https://image.tmdb.org/t/p/w400${film.backdrop_path}`,
                            title: film.title
                        }
                    )
                )

                setTrending(outputData)
            })
    }

    useEffect(() => {
        getTrending()
    }, [])
    //* ==========================================



    //* ================ ANIME ==================
    const [anime, setAnime] = useState([])

    const getAnime = () => {
        axios.get('https://shikimori.one/api/animes/?page=1&limit=20&order=popularity')
        .then(response => {
            const results = response.data

            //array transformation
            const outputData = results.map((anime: AnimeType) => (
                {
                    id: anime.id,
                    backgroundImage: `https://shikimori.one${anime.image.original}`,
                    title: anime.russian,
                }
            ))

            setAnime(outputData)
        })
    }

    useEffect(() => {
        getAnime()
    }, [])

    //* ==========================================



    //* ================== TV ====================
    const [TV, setTV] = useState([])

    const getTV = () => {
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API}&language=en-US&page=1&language=ru-RU`)
        .then(response => {
            const results = response.data.results
            //array transformation
            const outputData = results.filter((tv: any) => tv.backdrop_path).map(
                (tv: TVType) => (
                    {
                        id: tv.id,
                        backgroundImage: `https://image.tmdb.org/t/p/w400${tv.backdrop_path}`,
                        title: tv.name
                    }
                )
            )
            setTV(outputData)
        })
    }

    useEffect(() => {
        getTV()
    }, [])
    //* ==========================================

    return (
        <div>
            <div className="main-page__content__first-slider main-page__slider">
                <div className="main-page__slider__title">Популярные фильмы</div>
                <Slider data={trending} type="movie" />
            </div>
            <div className="main-page__content__first-slider main-page__slider">
                <div className="main-page__slider__title">Популярное на ТВ</div>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <LazySlider data={TV} type="tv" />
                </Suspense>
            </div>
            <div className="main-page__content__first-slider main-page__slider">
                <div className="main-page__slider__title">Популярные аниме</div>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <LazySlider data={anime} anime type="anime"/>
                </Suspense>
            </div>
        </div>
    )
}

export default MainPageContent
