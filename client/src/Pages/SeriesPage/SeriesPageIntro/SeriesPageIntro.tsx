import React from 'react'
import { FilmAuthors } from '../@interfaces/series.interfaces'

import './SeriesPageIntro.scss'

function SeriesPageIntro({ details, type }: { details: any; type: string }) {
    if (details) {
        const backgroundImage = type === 'anime'
            ? `https://shikimori.one${details?.bgImage}`
            : `https://image.tmdb.org/t/p/original${details?.bgImage}`
        const posterImage = type === 'anime'
            ? `https://shikimori.one${details?.posterImage}`
            : `https://image.tmdb.org/t/p/w300${details?.posterImage}`

        return (
            <div
                className="series-page__intro"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            >
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="series-page__intro__content">
                        <div className="series-page__intro__content__preview-image unselectable">
                            <img src={posterImage} alt="poster" />
                        </div>

                        <div className="series-page__intro__content__wrapper">
                            {/* TITLE */}
                            <div className="series-page__intro__content__title">
                                <p>{details.title}</p>

                                <div className="series-page__intro__content__title__actions" />
                            </div>

                            {/* SUBTITLE */}
                            <div className="series-page__intro__content__subtitle">
                                <p>{details.originalTitle}</p>
                            </div>

                            {/* SHIELDS */}
                            <div className="series-page__intro__content__shields unselectable">
                                <div className="series-page__intro__content__shields__info">
                                    {details.releaseDate ? (
                                        <div className="series-page__intro__content__shields__item--date shield-item shield-item--date">
                                            {details.releaseDate.slice(0, -6)}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {details.adult ? (
                                        <div className="series-page__intro__content__shields__item--adult shield-item">
                                            <p>18+</p>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="series-page__intro__content__shields__genres">
                                    {details.genres.map((item: FilmAuthors, index: number) => (
                                        <div
                                            className="series-page__intro__content__shields__genres__item shield-item"
                                            key={index}
                                        >
                                            <p>{type === 'anime' ? item.russian : item.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* OVERVIEW */}
                            <div className="series-page__intro__content__overview">
                                <p>{details.overview}</p>
                            </div>

                            {/* AUTHORS */}
                            <div className="series-page__intro__content__info">
                                {details.networks
                                    ? details.networks.map((item: any, index: number) => (
                                        <div
                                          className="series-page__intro__content__info__item shield-item"
                                          key={index}
                                        >
                                            {item.logo_path ? (
                                                <div className="series-page__intro__content__info__item__img">
                                                    <img
                                                      src={`https://image.tmdb.org/t/p/w200${item.logo_path}`}
                                                      alt={`${item.name}`}
                                                      className="unselectable"
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            <div className="series-page__intro__content__info__item__author">
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                    ))
                                    : ''}
                                {details.authors
                                    // TODO: Отсортировать авторов на странице Серии
                                    // .sort((a: any,b: any) => (a.logo_path || a.image) !== null ? -1 : 1 )
                                    .map((item: any, index: number) => (
                                        <div
                                            className="series-page__intro__content__info__item shield-item"
                                            key={index}
                                        >
                                            {item.logo_path || item.image ? (
                                                <div className="series-page__intro__content__info__item__img">
                                                    <img
                                                        src={
                                                            type === 'anime'
                                                                ? `https://shikimori.one${item.image}`
                                                                : `https://image.tmdb.org/t/p/w200${item.logo_path}`
                                                        }
                                                        alt={`${item.name}`}
                                                        className="unselectable"
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            <div className="series-page__intro__content__info__item__author unselectable">
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="series-page__intro__blur" />
            </div>
        )
    }
    return <div className="null" />
}

export default SeriesPageIntro
