import React from "react";
import { Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAudio } from "../contexts/AudioContext";
import { songsArray } from "../assets/database/songs";

const SingleItem = ({ _id, image, name, banner, artist = undefined, idPath }) => {
    const { playSong, currentSong, isPlaying } = useAudio();

    const isSong = !!artist;
    const isCurrentSong = isSong && currentSong && currentSong._id === _id;
    const isCurrentPlaying = isCurrentSong && isPlaying;

    const handlePlay = (e) => {
        e.preventDefault();
        if (isSong) {
            const song = songsArray.find((s) => s._id === _id);
            if (song) playSong(song);
        } else {
            // For artists, play the first song from that artist
            const artistSong = songsArray.find((s) => s.artist === name);
            if (artistSong) playSong(artistSong);
        }
    };

    return (
        <Link
            to={`${idPath}/${_id}`}
            className={cn(
                "group flex flex-col gap-3 p-3 rounded-md",
                "bg-transparent hover:bg-spotify-dark-highlight",
                "transition-all duration-300 ease-out",
                "focus:outline-none focus:ring-2 focus:ring-spotify-green/50 focus:ring-inset"
            )}
            aria-label={`${artist ? "Música" : "Artista"}: ${name}`}
        >
            {/* Imagem com botão de play no hover */}
            <div className="relative">
                <div
                    className={cn(
                        "aspect-square overflow-hidden",
                        "shadow-lg shadow-black/40",
                        artist ? "rounded-md" : "rounded-full"
                    )}
                >
                    <img
                        src={image}
                        alt={`Imagem de ${name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Botão play - aparece no hover com animação */}
                <button
                    className={cn(
                        "absolute right-2 bottom-2",
                        "w-12 h-12 flex items-center justify-center",
                        "rounded-full bg-spotify-green shadow-xl shadow-black/50",
                        "text-black hover:bg-spotify-green-light hover:scale-105",
                        isCurrentPlaying
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                        "transition-all duration-300 ease-out",
                        "focus:outline-none focus:opacity-100 focus:translate-y-0"
                    )}
                    title={`Reproduzir ${name}`}
                    aria-label={`Reproduzir ${name}`}
                    onClick={handlePlay}
                >
                    {isCurrentPlaying ? (
                        <Pause size={20} fill="currentColor" />
                    ) : (
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                    )}
                </button>
            </div>

            {/* Textos */}
            <div className="flex flex-col gap-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                    {name}
                </p>
                <p className="text-xs text-spotify-text-secondary truncate">
                    {artist ?? "Artista"}
                </p>
            </div>
        </Link>
    );
};

export default SingleItem;
