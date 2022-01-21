import React from 'react'
import { Link } from 'react-router-dom'

import PNG from '../../../assets/images/MainPage/MainPageIntro/Images_Right_Side_Compressed.png'
import GitHubLogo from '../../../assets/images/MainPage/MainPageIntro/GitHub-Mark-32px.png'

import './MainPageIntro.scss'

const MainPageIntro = () => {
    return (
        <div className="main-page__intro">
            <div className="main-page__intro__left-side">
                <p className="main-page__intro__left-side__upper-title">
                    Библиотека фильмов и телешоу, которые можно
                    <br />
                    смотреть где угодно
                </p>
                <h3 className="main-page__intro__left-side__title">
                    Фильмы, телешоу и много другого
                    <br />
                    без ограничений
                </h3>
                <div className="main-page__intro__buttons unselectable">
                    <a href="https://github.com/doog12/DoogMovie" target="_blank" rel="noreferrer" className="github-btn">
                        <img src={GitHubLogo} alt="github" width={28} height={28} />GitHub-репозиторий
                    </a>
                    <Link to="#" className="faq-btn">
                        FAQ
                    </Link>
                </div>
            </div>
            <div className="main-page__intro__right-side">
                <div className="main-page__intro__right-side__group-images unselectable"><img src={PNG} alt="png" /></div>
            </div>
        </div>
    )
}

export default MainPageIntro
