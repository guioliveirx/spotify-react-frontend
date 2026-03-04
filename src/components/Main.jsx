import React from "react";
import ItemList from "./ItemList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

const Main = ({ type }) => {
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

            {(type === "songs" || type === undefined) && (
                <ItemList
                    title="Músicas"
                    items={16}
                    itemsArray={songsArray}
                    path="/songs"
                    idPath="/song"
                />
            )}
        </div>
    );
};

export default Main;
