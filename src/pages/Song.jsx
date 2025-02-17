import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
    const { id } = useParams();

    const { image, name, duration, audio, artist } = songsArray.filter(
        (currentSongObj) => currentSongObj.id === Number(id)
    )[0];

    const artistObj = artistArray.filter(
        (currentArtistObj) => currentArtistObj.name === artist
    )[0];

    return (
        <div className="song">
            <div className="song__container">
                <div className="song__image-container">
                    <img src={image} alt={`Imagem da música ${name}`} />
                </div>
            </div>
            <div className="song__bar">
                <Link to={`/artist/${artistObj.id}`} className="song__artist-image">
                    <img
                        width={75}
                        height={75}
                        src={image}
                        alt={`Imagem do(a) ${artist}`}
                    />
                </Link>

                <Player />

                <div>
                    <p className="song__name">{name}</p>
                    <p>{artist}</p>
                </div>
            </div>
        </div>
    );
};

export default Song;
