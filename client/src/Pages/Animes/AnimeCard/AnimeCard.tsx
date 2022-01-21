import React from 'react'
import { Link } from 'react-router-dom'
import { Anime } from '../Animes'

import './AnimeCard.scss'
const AnimeCard = ({ id, poster, title, imageAlt }: Anime) => {
    const ShikimoriUrl = `https://shikimori.one` // Shikimori URL
    const ImagePath = `${ShikimoriUrl}${poster}` // Image URL
    return (
        <div>
            <Link to={`/anime/${id}`}>
                <div className="animes-page__cards__card">
                    <div className="animes-page__cards__card__content">
                        <div className="animes-page__cards__card__image">
                            <img
                                src={ImagePath}
                                alt={`Poster ${imageAlt}`}
                                className="animes-page__cards__card__image__img"
                            />
                        </div>

                        <div className="animes-page__cards__card__title">
                            <p>{title}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default AnimeCard
