import React, { useState, useMemo } from "react";
import ItemList from "./ItemList";
import GenreFilter from "./GenreFilter";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

const Main = ({ type }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);

    const genres = useMemo(() => {
        const genreSet = new Set(songsArray.map((s) => s.genre).filter(Boolean));
        return [...genreSet].sort();
    }, []);

    const filteredSongs = useMemo(() => {
        if (!selectedGenre) return songsArray;
        return songsArray.filter((s) => s.genre === selectedGenre);
    }, [selectedGenre]);

    const showSongs = type === "songs" || type === undefined;

    return (
        <div className="px-6 pb-8 flex flex-col gap-10 animate-fade-in">
            {(type === "artists" || type === undefined) && (
                <ItemList
                    title="Artistas"
                    items={8}
                    itemsArray={artistArray}
                    path="/artists"
                    idPath="/artist"
                />
            )}

            {showSongs && (
                <>
                    <div className="flex flex-col gap-4">
                        <GenreFilter
                            genres={genres}
                            selected={selectedGenre}
                            onSelect={setSelectedGenre}
                        />
                    </div>
                    <ItemList
                        title="Músicas"
                        items={16}
                        itemsArray={filteredSongs}
                        path="/songs"
                        idPath="/song"
                    />
                </>
            )}
        </div>
    );
};

export default Main;
