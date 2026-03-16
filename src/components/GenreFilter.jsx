import React from "react";
import { cn } from "../lib/utils";

const GenreFilter = ({ genres, selected, onSelect }) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
                onClick={() => onSelect(null)}
                className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap",
                    "transition-all duration-200 cursor-pointer",
                    selected === null
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                )}
            >
                Tudo
            </button>
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onSelect(genre === selected ? null : genre)}
                    className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap",
                        "transition-all duration-200 cursor-pointer",
                        selected === genre
                            ? "bg-white text-black"
                            : "bg-white/10 text-white hover:bg-white/20"
                    )}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;
