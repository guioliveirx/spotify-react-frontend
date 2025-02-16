import React from "react";
import SingleItem from "./SingleItem";
import { Link, useLocation } from "react-router-dom";

const ItemList = ({ title, items, itemsArray, path, idPath }) => {
    const { pathname } = useLocation();
    const isHome = pathname === "/";
    const finalItems = isHome ? items : Infinity

    return (
        <div>
            <div className="item-list">
                <div className="item-list__header">
                    <h2>{title} Populares</h2>
                    {isHome && (
                        <Link className="item-list__link" to={path}>
                            Mostrar tudo
                        </Link>
                    )}
                </div>
                <div className="item-list__container">
                    {itemsArray
                        .filter((value, index) => index < finalItems)
                        .map((object, index) => (
                            <SingleItem
                                idPath={idPath}
                                {...object}
                                key={`${title}-${index}`}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
