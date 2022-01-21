import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Animes from './Pages/Animes/Animes'
import MainPage from './Pages/MainPage/MainPage'
import Movies from './Pages/Movies/Movies'
import SeriesPage from './Pages/SeriesPage/SeriesPage'
import Tv from './Pages/TVs/Tv'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />

                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/movie/:id" element={<SeriesPage type="movie"/>} />
                    <Route path="/tv/:id" element={<SeriesPage type="tv"/>} />
                    <Route path="/anime/:id" element={<SeriesPage type="anime"/>} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tv" element={<Tv />} />
                    <Route path="/animes" element={<Animes />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
