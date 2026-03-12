import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(new Audio());
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setTotalDuration(audio.duration);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("ended", onEnded);
        };
    }, []);

    const playSong = (song) => {
        const audio = audioRef.current;

        if (currentSong && currentSong._id === song._id) {
            togglePlay();
            return;
        }

        setCurrentSong(song);
        audio.src = song.audio;
        audio.load();
        audio.play();
        setIsPlaying(true);
        setCurrentTime(0);
    };

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!currentSong) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const seekTo = (percent) => {
        const audio = audioRef.current;
        if (!totalDuration) return;
        audio.currentTime = percent * totalDuration;
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progressPercent = totalDuration ? (currentTime / totalDuration) * 100 : 0;

    return (
        <AudioContext.Provider
            value={{
                currentSong,
                isPlaying,
                currentTime,
                totalDuration,
                progressPercent,
                playSong,
                togglePlay,
                seekTo,
                formatTime,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
