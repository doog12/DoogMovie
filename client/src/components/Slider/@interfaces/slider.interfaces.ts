export interface SwiperParams {
    slidesPerView: number,
    navigation?: boolean,
    spaceBetween: number,
    breakpoints: any,
}

export interface SliderProps {
    data: any,
    type: string,
    anime?: boolean
}

export interface SlideProps {
    children: string,
    image: string,
    type: string,
    id: number | string
}