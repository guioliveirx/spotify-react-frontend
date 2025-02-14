import React from 'react'
import logoSpotify from '../assets/logo/spotify-logo.png'

const Header = () => {
  return (
    <header className='header'>
      <img src={logoSpotify} alt="Imagem da logo do Spotify" />

      <a className='header-link' href="/">
        <h1>Spotify</h1>
      </a>
    </header>
  )
}

export default Header
