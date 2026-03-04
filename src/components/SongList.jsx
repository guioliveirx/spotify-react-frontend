import React, { useState } from "react";
import SongItem from "./SongItem";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const SongList = ({ songsArray }) => {
    const [items, setItems] = useState(5);
    const hasMore = items < songsArray.length;

    return (
        <div className="flex flex-col">
            {/* Cabeçalho da lista - Critérios Ergonômicos: Legibilidade */}
            <div className="grid grid-cols-[16px_1fr_auto] gap-4 px-4 py-2 border-b border-white/10 mb-1">
                <span className="text-xs text-spotify-text-secondary font-medium">#</span>
                <span className="text-xs text-spotify-text-secondary font-medium uppercase tracking-wider">Título</span>
                <span className="text-xs text-spotify-text-secondary font-medium">Duração</span>
            </div>

            {/* Lista de músicas */}
            {songsArray
                .filter((_, index) => index < items)
                .map((currentSongObj, index) => (
                    <SongItem {...currentSongObj} key={index} index={index} />
                ))}

            {/* Botão "Ver mais" - Nielsen: Flexibilidade e Eficiência */}
            {hasMore && (
                <button
                    className={cn(
                        "flex items-center gap-2 mt-4 ml-4",
                        "text-sm font-bold text-spotify-text-secondary",
                        "hover:text-white transition-colors cursor-pointer"
                    )}
                    onClick={() => setItems(items + 5)}
                >
                    <ChevronDown size={16} />
                    Ver mais
                </button>
            )}
        </div>
    );
};

export default SongList;
