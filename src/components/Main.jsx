import React from "react";
import ItemList from "./ItemList";
import { artistArray } from "../assets/database/artists";
import { songsArray } from "../assets/database/songs";

const Main = () => {
    return (
        <main className="main">
            {/* Item List de Artistas */}
            <ItemList
                title="Artistas"
                items={8}
                itemsArray={artistArray}
                path="/artists"
                idPath="/artist"
            />

            {/* Item List de Músicas */}
            <ItemList
                title="Músicas"
                items={16}
                itemsArray={songsArray}
                path="/songs"
                idPath="/song"
            />
        </main>
    );
};

export default Main;
