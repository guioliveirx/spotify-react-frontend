import React from "react";
import ItemList from "./ItemList";

const Main = () => {
    return (
        <main className="main">
            {/* Item List de Artistas */}
            <ItemList title="Artistas" items={8} />

            {/* Item List de Músicas */}
            <ItemList title="Músicas" items={16} />
        </main>
    );
};

export default Main;
