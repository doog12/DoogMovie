import React from 'react'
import { Link } from 'react-router-dom'
import { TV } from '../Tv'

import './TvCard.scss'

const TvCard = ({ id, poster, title, imageAlt }: TV) => {
    const ImagePath = `https://image.tmdb.org/t/p/w300${poster}`

    return (
        <div>
            <Link to={`/tv/${id}`}>
                <div className="tv-page__cards__card">
                    <div className="tv-page__cards__card__content">
                        <div className="tv-page__cards__card__image">
                            <img
                                src={ImagePath}
                                alt={`Poster ${imageAlt}`}
                                className="tv-page__cards__card__image__img"
                            />
                        </div>

                        <div className="tv-page__cards__card__title">
                            <p>{title}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TvCard
