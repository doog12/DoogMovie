import React from 'react'

import './SeriesPageContent.scss'
import Slider from './Slider/Slider'

const SeriesPageContent = ({ trailers, type}: { trailers: any, type: string}) => {

    return (
        <div className="series-page__content">
            <div className="container">

                <div className="series-page__trailers">
                    <h3 className="series-page__trailers__title">{trailers?.length > 1 ? 'Трейлеры' : trailers < 1 ? '' : 'Трейлер'}</h3>
                    <div className="series-page__trailers__videos">
                        {
                            trailers
                                ? <Slider trailers={trailers} type={type}/>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeriesPageContent
