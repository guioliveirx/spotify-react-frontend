import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Artists from "./pages/Artists.jsx";
import Artist from "./pages/Artist.jsx";
import Songs from "./pages/Songs.jsx";
import Song from "./pages/Song.jsx";

const App = () => {
    return (
        <BrowserRouter>
            {/* Layout principal: Header fixo no topo, conteúdo no meio, player fixo embaixo */}
            <div className="flex flex-col h-svh overflow-hidden bg-black">
                {/* Área principal: sidebar + conteúdo */}
                <div className="flex flex-1 gap-2 p-2 pb-0 overflow-hidden">
                    <Sidebar />

                    {/* Coluna direita: header + conteúdo scrollável */}
                    <div className="flex-1 flex flex-col bg-spotify-dark-base rounded-lg overflow-hidden min-w-0">
                        <Header />
                        <main className="flex-1 overflow-y-auto overflow-x-hidden">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/artists" element={<Artists />} />
                                <Route path="/artist/:id" element={<Artist />} />
                                <Route path="/songs" element={<Songs />} />
                                <Route path="/song/:id" element={<Song />} />
                            </Routes>
                        </main>
                    </div>
                </div>

                {/* Player fixo na parte inferior */}
                <PlayerBar />
            </div>
        </BrowserRouter>
    );
};

export default App;
