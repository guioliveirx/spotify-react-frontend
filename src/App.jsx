import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContext";
import Home from "./pages/Home.jsx";
import Artists from "./pages/Artists.jsx";
import Artist from "./pages/Artist.jsx";
import Songs from "./pages/Songs.jsx";
import Song from "./pages/Song.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";
import Toast from "./components/Toast.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <AudioProvider>
                {/* Layout principal: Header fixo no topo, conteúdo no meio, player fixo embaixo */}
                <div className="flex flex-col h-svh overflow-hidden bg-black">
                    {/* Toast de notificação - Nielsen H1: Visibilidade do Status */}
                    <Toast />

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
                                    <Route path="/search" element={<Search />} />
                                    {/* Nielsen H9: Página 404 para ajudar o usuário a se recuperar */}
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                        </div>
                    </div>

                    {/* Player fixo na parte inferior */}
                    <PlayerBar />
                </div>
            </AudioProvider>
        </BrowserRouter>
    );
};

export default App;
