import React from "react";
import { Link } from "react-router-dom";

const SongItem = ({ image, name, duration, audio, artist, id, index }) => {
    return (
        <Link to={`/song/${id}`} className="song-item">
            <div className="song-item__number-album">
                <p>{index + 1}</p>

                <div className="song-item__album">
                    <img
                        className="song-item__image"
                        src={image}
                        alt={`Imagem da Musica ${name}`}
                    />
                    <p className="song-item__name">{name}</p>
                </div>
            </div>

            <p>{duration}</p>
        </Link>
    );
};

export default SongItem;
