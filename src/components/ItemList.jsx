import React from "react";
import SingleItem from "./SingleItem";

const ItemList = ({ title, items }) => {
    return (
        <div>
            <div className="item-list">
                <div className="item-list__header">
                    <h2>{title} Populares</h2>
                    <a className="item-list__link" href="/">
                        Mostrar tudo
                    </a>
                </div>
                <div className="item-list__container">
                    {Array(items)
                        .fill()
                        .map((item, index) => (
                            <SingleItem key={`${title}-${index}`}/>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
