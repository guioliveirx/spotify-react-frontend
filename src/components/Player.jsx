import React from "react";
import { Play, SkipBack, SkipForward } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Player = ({ randomIdFromArtist, randomIdFromArtist2, duration }) => {
    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-[600px]">
            {/* Controles */}
            <div className="flex items-center gap-6">
                <Link
                    to={`/song/${randomIdFromArtist}`}
                    className="text-spotify-text-secondary hover:text-white transition-colors"
                    title="Música anterior"
                    aria-label="Música anterior"
                >
                    <SkipBack size={20} fill="currentColor" />
                </Link>

                <button
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full",
                        "bg-white text-black hover:scale-110 transition-transform",
                        "focus:outline-none focus:ring-2 focus:ring-spotify-green"
                    )}
                    title="Reproduzir"
                    aria-label="Reproduzir"
                >
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                </button>

                <Link
                    to={`/song/${randomIdFromArtist2}`}
                    className="text-spotify-text-secondary hover:text-white transition-colors"
                    title="Próxima música"
                    aria-label="Próxima música"
                >
                    <SkipForward size={20} fill="currentColor" />
                </Link>
            </div>

            {/* Barra de progresso */}
            <div className="flex items-center gap-2 w-full">
                <span className="text-[11px] text-spotify-text-subdued w-10 text-right tabular-nums">
                    0:00
                </span>
                <div className="flex-1 h-1 bg-white/20 rounded-full group cursor-pointer">
                    <div className="h-full w-0 bg-white rounded-full group-hover:bg-spotify-green transition-colors" />
                </div>
                <span className="text-[11px] text-spotify-text-subdued w-10 tabular-nums">
                    {duration}
                </span>
            </div>
        </div>
    );
};

export default Player;
