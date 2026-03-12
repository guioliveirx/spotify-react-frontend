import React from "react";
import { Play, Pause } from "lucide-react";
import { useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";
import { cn } from "../lib/utils";
import { useAudio } from "../contexts/AudioContext";

const Artist = () => {
    const { id } = useParams();
    const { playSong, currentSong, isPlaying } = useAudio();

    const artistObj = artistArray.filter(
        (currentValue) => currentValue._id === id
    )[0];

    const songsArrayFromArtist = songsArray.filter(
        (currentSongObj) => currentSongObj.artist === artistObj.name
    );

    const isArtistPlaying = isPlaying && currentSong && currentSong.artist === artistObj.name;

    return (
        <div className="animate-fade-in">
            {/* Hero header com banner - Modelo de Colbourne: Hierarquia Visual */}
            <div
                className="relative h-[40vh] min-h-[280px] flex items-end bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${artistObj.banner})`,
                }}
            >
                <div className="p-8 pb-6 w-full">
                    <p className="text-xs font-medium uppercase tracking-widest text-spotify-text-secondary mb-2">
                        Artista
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                        {artistObj.name}
                    </h1>
                </div>
            </div>

            {/* Área de ações + lista de músicas */}
            <div className="bg-gradient-to-b from-black/40 to-spotify-dark-base">
                {/* Barra de ações - Nielsen: Visibilidade do Status */}
                <div className="flex items-center gap-6 p-6">
                    <button
                        onClick={() => {
                            if (isArtistPlaying) {
                                playSong(currentSong);
                            } else {
                                const firstSong = songsArrayFromArtist[0];
                                if (firstSong) playSong(firstSong);
                            }
                        }}
                        className={cn(
                            "w-14 h-14 flex items-center justify-center rounded-full",
                            "bg-spotify-green text-black",
                            "hover:bg-spotify-green-light hover:scale-105",
                            "transition-all duration-200 shadow-lg shadow-spotify-green/25"
                        )}
                        title={`Reproduzir músicas de ${artistObj.name}`}
                        aria-label={`Reproduzir músicas de ${artistObj.name}`}
                    >
                        {isArtistPlaying ? (
                            <Pause size={24} fill="currentColor" />
                        ) : (
                            <Play size={24} fill="currentColor" className="ml-1" />
                        )}
                    </button>
                </div>

                {/* Lista de músicas populares */}
                <div className="px-6 pb-8">
                    <h2 className="text-xl font-bold mb-4">Populares</h2>
                    <SongList songsArray={songsArrayFromArtist} />
                </div>
            </div>
        </div>
    );
};

export default Artist;
