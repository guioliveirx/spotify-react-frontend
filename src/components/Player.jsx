import React from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAudio } from "../contexts/AudioContext";
import { songsArray } from "../assets/database/songs";

const Player = ({ randomIdFromArtist, randomIdFromArtist2, duration, audio, songData }) => {
    const { playSong, isPlaying, currentSong, currentTime, progressPercent, seekTo, formatTime } = useAudio();

    const isCurrentSong = currentSong && songData && currentSong._id === songData._id;
    const isCurrentPlaying = isCurrentSong && isPlaying;

    const handleTogglePlay = () => {
        if (songData) {
            playSong(songData);
        }
    };

    const handleProgressClick = (e) => {
        if (!isCurrentSong) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seekTo(percent);
    };

    const handleSkip = (songId) => {
        const song = songsArray.find((s) => s._id === songId);
        if (song) playSong(song);
    };

    const displayProgress = isCurrentSong ? progressPercent : 0;
    const displayCurrentTime = isCurrentSong ? formatTime(currentTime) : "0:00";

    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-[600px]">
            {/* Controles */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => handleSkip(randomIdFromArtist)}
                    className="text-spotify-text-secondary hover:text-white transition-colors"
                    title="Música anterior"
                    aria-label="Música anterior"
                >
                    <SkipBack size={20} fill="currentColor" />
                </button>

                <button
                    onClick={handleTogglePlay}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full",
                        "bg-white text-black hover:scale-110 transition-transform",
                        "focus:outline-none focus:ring-2 focus:ring-spotify-green"
                    )}
                    title={isCurrentPlaying ? "Pausar" : "Reproduzir"}
                    aria-label={isCurrentPlaying ? "Pausar" : "Reproduzir"}
                >
                    {isCurrentPlaying ? (
                        <Pause size={18} fill="currentColor" />
                    ) : (
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                    )}
                </button>

                <button
                    onClick={() => handleSkip(randomIdFromArtist2)}
                    className="text-spotify-text-secondary hover:text-white transition-colors"
                    title="Próxima música"
                    aria-label="Próxima música"
                >
                    <SkipForward size={20} fill="currentColor" />
                </button>
            </div>

            {/* Barra de progresso */}
            <div className="flex items-center gap-2 w-full">
                <span className="text-[11px] text-spotify-text-subdued w-10 text-right tabular-nums">
                    {displayCurrentTime}
                </span>
                <div
                    className="flex-1 h-1 bg-white/20 rounded-full group cursor-pointer"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>
                <span className="text-[11px] text-spotify-text-subdued w-10 tabular-nums">
                    {duration}
                </span>
            </div>
        </div>
    );
};

export default Player;
