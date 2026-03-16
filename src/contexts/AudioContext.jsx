import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { songsArray } from "../assets/database/songs";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(new Audio());
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    /* Nielsen H7: Flexibilidade - controle de volume funcional */
    const [volume, setVolumeState] = useState(0.66);

    /* Scapin - Feedback imediato: indicador de loading enquanto áudio carrega */
    const [isLoading, setIsLoading] = useState(false);

    /* Nielsen H1: Visibilidade do status - toast de notificação */
    const [toastMessage, setToastMessage] = useState(null);
    const toastTimeoutRef = useRef(null);

    const showToast = useCallback((message, type = "info") => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setToastMessage({ message, type });
        toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3000);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata = () => setTotalDuration(audio.duration);
        const onEnded = () => {
            setIsPlaying(false);
            skipNext();
        };
        const onCanPlay = () => setIsLoading(false);
        const onError = () => {
            setIsLoading(false);
            showToast("Erro ao carregar o audio", "error");
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("canplaythrough", onCanPlay);
        audio.addEventListener("error", onError);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("ended", onEnded);
            audio.removeEventListener("canplaythrough", onCanPlay);
            audio.removeEventListener("error", onError);
        };
    }, []);

    /* Nielsen H7: Flexibilidade - atalhos de teclado para usuários experientes */
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Não capturar atalhos quando o foco está em um input
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

            switch (e.code) {
                case "Space":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    if (currentSong) {
                        const audio = audioRef.current;
                        audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || 0);
                    }
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    if (currentSong) {
                        const audio = audioRef.current;
                        audio.currentTime = Math.max(audio.currentTime - 5, 0);
                    }
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setVolume(Math.min(volume + 0.1, 1));
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    setVolume(Math.max(volume - 0.1, 0));
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentSong, isPlaying, volume]);

    const setVolume = (val) => {
        const clamped = Math.max(0, Math.min(1, val));
        setVolumeState(clamped);
        audioRef.current.volume = clamped;
    };

    const playSong = (song) => {
        const audio = audioRef.current;

        if (currentSong && currentSong._id === song._id) {
            togglePlay();
            return;
        }

        setIsLoading(true);
        setCurrentSong(song);
        audio.src = song.audio;
        audio.volume = volume;
        audio.load();
        audio.play();
        setIsPlaying(true);
        setCurrentTime(0);
        showToast(`Tocando: ${song.name}`);
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

    /* Scapin - Proteção contra erros: skip seguro com verificação de limites */
    const skipNext = () => {
        if (!currentSong) return;
        const currentIndex = songsArray.findIndex((s) => s._id === currentSong._id);
        const nextIndex = (currentIndex + 1) % songsArray.length;
        const nextSong = songsArray[nextIndex];
        if (nextSong) {
            setCurrentSong(null); // Reset para forçar novo play
            setTimeout(() => playSong(nextSong), 0);
        }
    };

    const skipPrev = () => {
        if (!currentSong) return;
        const audio = audioRef.current;
        // Se já passou 3 segundos, volta ao início da música atual
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        const currentIndex = songsArray.findIndex((s) => s._id === currentSong._id);
        const prevIndex = (currentIndex - 1 + songsArray.length) % songsArray.length;
        const prevSong = songsArray[prevIndex];
        if (prevSong) {
            setCurrentSong(null);
            setTimeout(() => playSong(prevSong), 0);
        }
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
                isLoading,
                currentTime,
                totalDuration,
                progressPercent,
                volume,
                toastMessage,
                playSong,
                togglePlay,
                seekTo,
                setVolume,
                skipNext,
                skipPrev,
                showToast,
                formatTime,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};
