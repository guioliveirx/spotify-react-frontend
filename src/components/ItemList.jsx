import React from "react";
import SingleItem from "./SingleItem";
import { Link } from "react-router-dom";

const ItemList = ({ title, items, itemsArray, path, idPath }) => {
    return (
        <div>
            <div className="item-list">
                <div className="item-list__header">
                    <h2>{title} Populares</h2>
                    <Link className="item-list__link" to={path}>
                        Mostrar tudo
                    </Link>
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
