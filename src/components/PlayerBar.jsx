import React from "react";
import { SkipBack, Play, Pause, SkipForward, Volume2, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAudio } from "../contexts/AudioContext";

const PlayerBar = () => {
    const { currentSong, isPlaying, togglePlay, currentTime, totalDuration, progressPercent, seekTo, formatTime } = useAudio();

    const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seekTo(percent);
    };

    return (
        <footer
            className="h-[72px] bg-black border-t border-white/5 px-4 flex items-center justify-between gap-4"
            role="contentinfo"
            aria-label="Player de música"
        >
            {/* Info da música (esquerda) */}
            <div className="flex items-center gap-3 w-[30%] min-w-0">
                {currentSong ? (
                    <>
                        <Link to={`/song/${currentSong._id}`}>
                            <img
                                src={currentSong.image}
                                alt={`Capa de ${currentSong.name}`}
                                className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                            />
                        </Link>
                        <div className="min-w-0">
                            <Link
                                to={`/song/${currentSong._id}`}
                                className="text-sm font-medium truncate text-white hover:underline block"
                            >
                                {currentSong.name}
                            </Link>
                            <p className="text-xs text-spotify-text-secondary truncate">
                                {currentSong.artist}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-14 h-14 rounded-md bg-spotify-dark-highlight flex-shrink-0 flex items-center justify-center">
                            <MusicIcon className="w-6 h-6 text-spotify-text-subdued" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium truncate text-spotify-text-secondary">
                                Nenhuma música tocando
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Controles centrais */}
            <div className="flex flex-col items-center gap-1 w-[40%] max-w-[600px]">
                <div className="flex items-center gap-5">
                    <button
                        className="text-spotify-text-secondary hover:text-white transition-colors"
                        title="Anterior"
                        aria-label="Música anterior"
                    >
                        <SkipBack size={18} fill="currentColor" />
                    </button>
                    <button
                        onClick={togglePlay}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full",
                            "bg-white text-black hover:scale-105 transition-transform"
                        )}
                        title={isPlaying ? "Pausar" : "Reproduzir"}
                        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                    >
                        {isPlaying ? (
                            <Pause size={16} fill="currentColor" />
                        ) : (
                            <Play size={16} fill="currentColor" className="ml-0.5" />
                        )}
                    </button>
                    <button
                        className="text-spotify-text-secondary hover:text-white transition-colors"
                        title="Próxima"
                        aria-label="Próxima música"
                    >
                        <SkipForward size={18} fill="currentColor" />
                    </button>
                </div>

                {/* Barra de progresso */}
                <div className="flex items-center gap-2 w-full">
                    <span className="text-[11px] text-spotify-text-subdued w-10 text-right tabular-nums">
                        {formatTime(currentTime)}
                    </span>
                    <div
                        className="flex-1 h-1 bg-white/20 rounded-full group cursor-pointer relative"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="h-full bg-white rounded-full group-hover:bg-spotify-green transition-colors"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className="text-[11px] text-spotify-text-subdued w-10 tabular-nums">
                        {currentSong ? currentSong.duration : "0:00"}
                    </span>
                </div>
            </div>

            {/* Controles direita */}
            <div className="flex items-center gap-3 w-[30%] justify-end">
                <div className="flex items-center gap-2">
                    <button
                        className="text-spotify-text-secondary hover:text-white transition-colors"
                        title="Volume"
                        aria-label="Controle de volume"
                    >
                        <Volume2 size={18} />
                    </button>
                    <div className="w-24 h-1 bg-white/20 rounded-full cursor-pointer hidden sm:block">
                        <div className="h-full w-2/3 bg-white rounded-full hover:bg-spotify-green transition-colors" />
                    </div>
                </div>
                <button
                    className="text-spotify-text-secondary hover:text-white transition-colors hidden sm:block"
                    title="Tela cheia"
                    aria-label="Tela cheia"
                >
                    <Maximize2 size={16} />
                </button>
            </div>
        </footer>
    );
};

// Ícone Music inline para o placeholder
const MusicIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
);

export default PlayerBar;
