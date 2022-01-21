import React from 'react'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import Slide from './Slide/Slide'

SwiperCore.use([Navigation])

const Slider = ({ trailers, type }: { trailers: any, type: string }) => {
    const params: any = {
        slidesPerView: 3.5,
        spaceBetween: 13,
        navigation: true,
    }

    return (
        <Swiper {...params}>
            {
                type === 'movie' || 'tv' ? (
                    trailers.filter((item: any) => item.type === 'Trailer').map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <Slide data={item} type={type}/>
                        </SwiperSlide>
                    ))
                ) : ('')
            }

            {
                type === 'anime' ? (
                    trailers.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <Slide data={item} type={type}/>
                        </SwiperSlide>
                    ))
                ) : ('')
            }
            {/* {
                trailers.filter((item: any) => item.type === 'Trailer').map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                        <Slide data={item} />
                    </SwiperSlide>
                ))
            } */}
        </Swiper>
    )
}

export default Slider
