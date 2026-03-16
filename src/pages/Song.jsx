import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";
import { cn } from "../lib/utils";

const Song = () => {
    const { id } = useParams();

    /* Nielsen H5: Prevenção de erros - guard clause para ID inválido */
    const songObj = songsArray.find((s) => s._id === id);

    /* Scapin - Qualidade das mensagens de erro: mensagem amigável com ação de recuperação */
    if (!songObj) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 animate-fade-in">
                <h2 className="text-2xl font-bold">Musica nao encontrada</h2>
                <p className="text-spotify-text-secondary text-center max-w-md">
                    A musica que voce procura nao existe ou foi removida.
                </p>
                <Link to="/songs" className="spotify-btn-primary">
                    Ver todas as musicas
                </Link>
            </div>
        );
    }

    const { image, name, duration, audio, artist } = songObj;

    const artistObj = artistArray.find((a) => a.name === artist);

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
                        alt={`Capa da musica ${name}`}
                        className="w-full aspect-square object-cover"
                    />
                </div>
            </div>

            {/* Barra inferior: info do artista + player + nome da música */}
            <div className="bg-gradient-to-t from-black to-spotify-dark-base/80 border-t border-white/5">
                {/* Info da música */}
                <div className="flex flex-col items-center gap-1 pt-5 px-6">
                    <h1 className="text-lg font-bold text-center">{name}</h1>
                    {artistObj ? (
                        <Link
                            to={`/artist/${artistObj._id}`}
                            className="text-sm text-spotify-text-secondary hover:text-white hover:underline transition-colors"
                        >
                            {artist}
                        </Link>
                    ) : (
                        <span className="text-sm text-spotify-text-secondary">{artist}</span>
                    )}
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
                {artistObj && (
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
                )}
            </div>
        </div>
    );
};

export default Song;
