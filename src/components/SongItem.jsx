import React from "react";
import { Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { cn } from "../lib/utils";
import { useAudio } from "../contexts/AudioContext";
import { songsArray } from "../assets/database/songs";

const SongItem = ({ image, name, duration, audio, artist, _id, index }) => {
    const { playSong, currentSong, isPlaying } = useAudio();

    const isCurrentSong = currentSong && currentSong._id === _id;
    const isCurrentPlaying = isCurrentSong && isPlaying;

    const handlePlay = (e) => {
        e.preventDefault();
        const song = songsArray.find((s) => s._id === _id);
        if (song) playSong(song);
    };

    return (
        <Link
            to={`/song/${_id}`}
            className={cn(
                "group grid grid-cols-[16px_1fr_auto] gap-4 items-center",
                "px-4 py-2 rounded-md",
                "hover:bg-white/10 transition-colors duration-200",
                "focus:outline-none focus:bg-white/10"
            )}
            aria-label={`${name} por ${artist}`}
        >
            {/* Número / ícone play */}
            <div className="flex items-center justify-center w-4" onClick={handlePlay}>
                {isCurrentPlaying ? (
                    <Pause
                        size={14}
                        fill="white"
                        className="text-spotify-green"
                    />
                ) : (
                    <>
                        <span className="text-sm text-spotify-text-secondary tabular-nums group-hover:hidden">
                            {index + 1}
                        </span>
                        <Play
                            size={14}
                            fill="white"
                            className="hidden group-hover:block text-white"
                        />
                    </>
                )}
            </div>

            {/* Album art + nome */}
            <div className="flex items-center gap-3 min-w-0">
                <img
                    src={image}
                    alt={`Capa de ${name}`}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                    loading="lazy"
                />
                <div className="min-w-0">
                    <p className={cn(
                        "text-sm font-medium truncate transition-colors",
                        isCurrentSong ? "text-spotify-green" : "text-white group-hover:text-spotify-green"
                    )}>
                        {name}
                    </p>
                    {artist && (
                        <p className="text-xs text-spotify-text-secondary truncate">
                            {artist}
                        </p>
                    )}
                </div>
            </div>

            {/* Duração */}
            <span className="text-sm text-spotify-text-secondary tabular-nums">
                {duration}
            </span>
        </Link>
    );
};

export default SongItem;
