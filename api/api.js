import axios from "axios";

const URL = "http://localhost:3000";

const reponseArtists = await axios.get(`${URL}/artists`);
const reponseSongs = await axios.get(`${URL}/songs`);

export const artistArray = reponseArtists.data;
export const songsArray = reponseSongs.data;
