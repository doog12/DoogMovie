import React from 'react'
import { Link } from 'react-router-dom'
import { SlideProps } from '../@interfaces/slider.interfaces'
import './Slide.scss'

const Slide = ({ children, image, id, type }: SlideProps) => {
    const contentType =
        type === 'movie' ? `/movie/${id}` : type === 'tv' ? `/tv/${id}` : `/anime/${id}`

    return (
        <div className="slide_container">
            <div className="slide__content">
                <div className="slide__image unselectable">
                    <Link to={contentType}>
                        <img src={image} alt="trending_film" />
                    </Link>
                </div>
                <div className="slide__title">
                    <p className="slide__title__text unselectable">{children}</p>
                </div>
            </div>
        </div>
    )
}

export default Slide
