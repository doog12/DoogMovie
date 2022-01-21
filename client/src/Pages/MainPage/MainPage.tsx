import React from 'react'

import MainPageIntro from './MainPageIntro/MainPageIntro'
import MainPageContent from './MainPageContent/MainPageContent'


import './MainPage.scss'

const MainPage = () => {
    return (
        <div className="main-page">
            <div className="container">
                <MainPageIntro />
                <MainPageContent />
            </div>
        </div>
    )
}

export default MainPage
