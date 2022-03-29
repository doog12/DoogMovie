import React, { useEffect, useState } from 'react'

import './SeriesPageContent.scss'
import Slider from './Slider/Slider'
import axios from 'axios'
import { VideoCDNResult } from '../@interfaces/series.interfaces'

const SeriesPageContent = ({ trailers, type, imdb_id}: { trailers: any, type: string, imdb_id: number | string}) => {

    const VIDEOCDN_API = process.env.REACT_APP_VIDEOCDN_API
    const videocdnLink = `https://videocdn.tv/api/short?api_token=${VIDEOCDN_API}&imdb_id=${imdb_id}`

    const [iframeSrc, setIframeSrc] = useState('')

    const getVideo = () => {
        axios.get(videocdnLink)
            .then(response => {
                const result = response.data
                const data: VideoCDNResult = result.data[0]
                setIframeSrc(data.iframe_src)
                // console.log(imdb_id)
                console.log(data)
            })
    }

    useEffect(() => {
        getVideo()
    }, [getVideo])

    const what_type = type === 'anime' ? 'аниме' : type === 'movie' ? 'фильм' : type === 'tv' ? 'сериал' : ''

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

                <div className='series-page__video'>
                    <h3 className='series-page__video__title'>{imdb_id ? `Смотреть ${what_type}` : ''}</h3>
                    <div className='series-page__video__videos'>
                        <iframe src={iframeSrc} width="640" height="360" frameBorder="0" allowFullScreen />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SeriesPageContent
