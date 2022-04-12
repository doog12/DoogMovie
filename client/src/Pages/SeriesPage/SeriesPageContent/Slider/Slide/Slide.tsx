import React from 'react'

const Slide = ({ data, type }: { data: any; type: string }) => {
    const srcLink = type === 'anime' ? data.player_url : `https://www.youtube.com/embed/${data.key}`

    return (
        <div className="series-page__trailers__videos__item unselectable">
            <iframe
                src={srcLink}
                frameBorder="0"
                allowFullScreen
                title={`${data.site} ${data.type}`}
            />
        </div>
    )
}

export default Slide
