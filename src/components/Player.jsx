import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlay,
    faBackwardStep,
    faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

const Player = ({ randomIdFromArtist, randomIdFromArtist2,  duration }) => {
    return (
        <div className="player">
            <div className="player__controllers">
                <Link to={`/song/${randomIdFromArtist}`}>
                    <FontAwesomeIcon
                        className="player__icon"
                        icon={faBackwardStep}
                    />
                </Link>
                <FontAwesomeIcon
                    className="player__icon player__icon--play"
                    icon={faCirclePlay}
                />
                <Link to={`/song/${randomIdFromArtist2}`}>
                    <FontAwesomeIcon
                        className="player__icon"
                        icon={faForwardStep}
                    />
                </Link>
            </div>
            <div className="player__progress">
                <p>00:00</p>

                <div className="player__bar">
                    <div className="player__bar-progress"></div>
                </div>

                <p>02:30</p>
            </div>
        </div>
    );
};

export default Player;
