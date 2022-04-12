import React from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../Movies'

import './MovieCard.scss'

const MovieCard = ({ id, poster, title, imageAlt }: Movie) => {
    const ImagePath = `https://image.tmdb.org/t/p/w300${poster}`

    return (
        <Link to={`/movie/${id}`}>
            <div className="movies-page__cards__card">
                <div className="movies-page__cards__card__content">
                    <div className="movies-page__cards__card__image">
                        <img
                            src={ImagePath}
                            alt={`Poster ${imageAlt}`}
                            className="movies-page__cards__card__image__img"
                        />
                    </div>

                    <div className="movies-page__cards__card__title">
                        <p>{title}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard
