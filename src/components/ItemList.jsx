import React from "react";
import SingleItem from "./SingleItem";

const ItemList = ({ title, items, itemsArray, path, idPath }) => {
    return (
        <div>
            <div className="item-list">
                <div className="item-list__header">
                    <h2>{title} Populares</h2>
                    <a className="item-list__link" href={path}>
                        Mostrar tudo
                    </a>
                </div>
                <div className="item-list__container">
                    {itemsArray
                        .filter((value, index) => index < items)
                        .map((object, index) => (
                            <SingleItem idPath={idPath} {...object} key={`${title}-${index}`} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
