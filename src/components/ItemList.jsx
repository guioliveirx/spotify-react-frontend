import React from "react";
import SingleItem from "./SingleItem";
import { Link, useLocation } from "react-router-dom";

const ItemList = ({ title, items, itemsArray, path, idPath }) => {
    const { pathname } = useLocation();
    const isHome = pathname === "/";
    const finalItems = isHome ? items : Infinity;

    return (
        <section>
            {/* Cabeçalho da seção - Nielsen: Consistência e Padrões */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold hover:underline cursor-pointer">
                    {title} Populares
                </h2>
                {isHome && (
                    <Link
                        to={path}
                        className="text-sm font-semibold text-spotify-text-secondary hover:text-white hover:underline transition-colors"
                    >
                        Mostrar tudo
                    </Link>
                )}
            </div>

            {/* Grid responsivo de cards - Critérios Ergonômicos: Agrupamento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                {itemsArray
                    .filter((_, index) => index < finalItems)
                    .map((object, index) => (
                        <SingleItem
                            idPath={idPath}
                            {...object}
                            key={`${title}-${index}`}
                        />
                    ))}
            </div>
        </section>
    );
};

export default ItemList;
