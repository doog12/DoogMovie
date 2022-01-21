import React from 'react'
import Slide from './Slide/Slide'

//@interfaces
import { SliderProps, SwiperParams } from './@interfaces/slider.interfaces'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// Swiper Core init modules
SwiperCore.use([Navigation])

const Slider = ({ data, anime, type }: SliderProps) => {
    const params: SwiperParams = {
        slidesPerView: anime ? 6.7 : 3.9,
        spaceBetween: 40,
        navigation: true,
        breakpoints: {
            320: {
                slidesPerView: anime ? 3 : 2,
                spaceBetween: 20,
            },
            430: {
                slidesPerView: anime ? 3.5 : 2.2,
                spaceBetween: 20
            },
            570: {
                slidesPerView: anime ? 4 : 2.6,
                spaceBetween: 20
            },
            750: {
                slidesPerView: anime ? 5 : 3,
                spaceBetween: 20
            },
            880: {
                slidesPerView: anime ? 6 : 3.5,
                spaceBetween: 30
            },
            1000: {
                slidesPerView: anime ? 6.7 : 3.9,
                spaceBetween: 40
            }
        }
    }

    return (
        <Swiper {...params}>
            {data.map((item: any, index: number) => (
                <SwiperSlide key={`${index}_${item.id}`}>
                    <Slide image={item.backgroundImage} id={item.id} type={type}>{item.title}</Slide>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider
