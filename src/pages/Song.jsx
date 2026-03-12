import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";
import { cn } from "../lib/utils";

const Song = () => {
    const { id } = useParams();

    const songObj = songsArray.filter(
        (currentSongObj) => currentSongObj._id === id
    )[0];

    const { image, name, duration, audio, artist } = songObj;

    const artistObj = artistArray.filter(
        (currentArtistObj) => currentArtistObj.name === artist
    )[0];

    const songsArrayFromArtist = songsArray.filter(
        (currentSongObj) => currentSongObj.artist === artist
    );

    let randomIndex = Math.floor(
        Math.random() * (songsArrayFromArtist.length - 1)
    );
    let randomIdFromArtist = songsArrayFromArtist[randomIndex]._id;

    let randomIndex2 = Math.floor(
        Math.random() * (songsArrayFromArtist.length - 1)
    );
    let randomIdFromArtist2 = songsArrayFromArtist[randomIndex2]._id;

    return (
        <div className="flex flex-col flex-1 animate-fade-in">
            {/* Área da capa - Modelo de Colbourne: Foco Visual */}
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-spotify-dark-highlight to-spotify-dark-base p-8">
                <div className={cn(
                    "w-full max-w-[340px] rounded-lg overflow-hidden",
                    "shadow-2xl shadow-black/60",
                    "transition-transform duration-500 hover:scale-[1.02]"
                )}>
                    <img
                        src={image}
                        alt={`Capa da música ${name}`}
                        className="w-full aspect-square object-cover"
                    />
                </div>
            </div>

            {/* Barra inferior: info do artista + player + nome da música */}
            <div className="bg-gradient-to-t from-black to-spotify-dark-base/80 border-t border-white/5">
                {/* Info da música */}
                <div className="flex flex-col items-center gap-1 pt-5 px-6">
                    <h1 className="text-lg font-bold text-center">{name}</h1>
                    <Link
                        to={`/artist/${artistObj._id}`}
                        className="text-sm text-spotify-text-secondary hover:text-white hover:underline transition-colors"
                    >
                        {artist}
                    </Link>
                </div>

                {/* Player centralizado */}
                <div className="flex justify-center px-6 py-4">
                    <Player
                        duration={duration}
                        audio={audio}
                        songData={songObj}
                        randomIdFromArtist={randomIdFromArtist}
                        randomIdFromArtist2={randomIdFromArtist2}
                    />
                </div>

                {/* Artista mini card */}
                <div className="flex justify-center pb-4">
                    <Link
                        to={`/artist/${artistObj._id}`}
                        className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-full",
                            "bg-white/5 hover:bg-white/10 transition-colors"
                        )}
                        title={`Ver artista ${artist}`}
                    >
                        <img
                            src={artistObj.image}
                            alt={`Foto de ${artist}`}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{artist}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Song;
