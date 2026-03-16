import React, { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const ItemList = ({ title, items, itemsArray, path, idPath }) => {
    const { pathname } = useLocation();
    const isHome = pathname === "/";

    /* Colbourne - Esconda: divulgação progressiva nas páginas de lista */
    /* Scapin - Densidade informacional: reduz sobrecarga cognitiva inicial */
    const [visibleCount, setVisibleCount] = useState(isHome ? items : 12);

    /* Reseta contagem ao trocar filtro */
    useEffect(() => {
        if (!isHome) setVisibleCount(12);
    }, [itemsArray.length]);
    const hasMore = !isHome && visibleCount < itemsArray.length;

    const finalItems = isHome ? items : visibleCount;

    return (
        <section>
            {/* Nielsen H4: Consistência e Padrões - cabeçalho uniforme */}
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

            {/* Critérios Ergonômicos - Agrupamento por localização: grid responsivo */}
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

            {/* Colbourne - Esconda: botão para revelar mais itens progressivamente */}
            {hasMore && (
                <div className="flex justify-center mt-6">
                    <button
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-full",
                            "text-sm font-bold text-spotify-text-secondary",
                            "border border-white/20 hover:border-white/40",
                            "hover:text-white transition-all cursor-pointer"
                        )}
                        onClick={() => setVisibleCount((v) => v + 12)}
                    >
                        <ChevronDown size={16} />
                        Carregar mais
                    </button>
                </div>
            )}
        </section>
    );
};

export default ItemList;
