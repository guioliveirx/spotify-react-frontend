import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Artists from "./pages/Artists.jsx";
import Artist from "./pages/Artist.jsx";
import Songs from "./pages/Songs.jsx";
import Song from "./pages/Song.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/songs" element={<Songs />} />
                <Route path="/song/:id" element={<Song />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
