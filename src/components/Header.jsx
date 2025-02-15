import React from "react";
import logoSpotify from "../assets/logo/spotify-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src={logoSpotify} alt="Imagem da logo do Spotify" />
            </Link>

            <Link className="header-link" to="/">
                <h1>Spotify</h1>
            </Link>
        </header>
    );
};

export default Header;
