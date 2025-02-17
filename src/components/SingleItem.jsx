import React from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SingleItem = ({ _id, image, name, banner, artist = undefined, idPath }) => {
    return (
        <>
            <Link to={`${idPath}/${_id}`} className="single-item">
                <div className="single-item__div-image-button">
                    <FontAwesomeIcon
                        className="single-item__icon"
                        icon={faCirclePlay}
                    />
                    <div className="single-item__div-image">
                        <img
                            className="single-item__image"
                            src={image}
                            alt={`Imagem do artista ${name}`}
                        />
                    </div>
                </div>
                <div className="single-item__texts">
                    <div className="single-item__2lines">
                        <p className="single-item__title">{name}</p>
                    </div>
                        <p className="single-item__type">{artist ?? "Artista"}</p>
                </div>
            </Link>
        </>
    );
};

export default SingleItem;
