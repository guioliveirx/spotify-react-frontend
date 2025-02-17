import React from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
    const { id } = useParams();

    const { image, name, duration, audio, artist } = songsArray.filter(
        (currentSongObj) => currentSongObj._id === id
    )[0];

    const artistObj = artistArray.filter(
        (currentArtistObj) => currentArtistObj.name === artist
    )[0];

    const songsArrayFromArtist = songsArray.filter(
        (currentSongObj) => currentSongObj.artist === artist
    );

    let randomIndex = Math.floor(
        Math.random() * (songsArrayFromArtist.length - 1)
    );
    let randomIdFromArtist = songsArrayFromArtist[randomIndex]._id;

    let randomIndex2 = Math.floor(
        Math.random() * (songsArrayFromArtist.length - 1)
    );
    let randomIdFromArtist2 = songsArrayFromArtist[randomIndex2]._id;

    return (
        <div className="song">
            <div className="song__container">
                <div className="song__image-container">
                    <img src={image} alt={`Imagem da música ${name}`} />
                </div>
            </div>
            <div className="song__bar">
                <Link
                    to={`/artist/${artistObj._id}`}
                    className="song__artist-image"
                >
                    <img
                        width={75}
                        height={75}
                        src={artistObj.image}
                        alt={`Imagem do(a) ${artist}`}
                    />
                </Link>

                <Player duration={duration} randomIdFromArtist={randomIdFromArtist} randomIdFromArtist2={randomIdFromArtist2} />

                <div>
                    <p className="song__name">{name}</p>
                    <p>{artist}</p>
                </div>
            </div>
        </div>
    );
};

export default Song;
