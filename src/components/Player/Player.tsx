import { useContext, useEffect, useRef, useState } from "react";
import { faBackwardStep, faForwardStep, faHeart, faPause, faPlay, faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsmediatags from "jsmediatags";
import { PictureType } from "jsmediatags/types";
import ProgressBar from "../ProgressBar/ProgressBar";
import Volume from "../Volume/Volume";
import PlayerStyles from "./Player.module.scss";
import vinyl from "../../images/vinyl-record.png";
import { MusicContext } from "../../context/PlayerContext";

const Player: React.FC = () => {
    const { music } = useContext(MusicContext);
    const [musicPlay, setMusicPlay] = useState("");
    const [cover, setCover] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(Number(JSON.parse(localStorage.getItem("volume") || "50")));
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [metadata, setMetadata] = useState<{ title?: string; artist?: string; picture?: PictureType } | null>(null);

    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (music) {
            jsmediatags.read(music, {
                onSuccess(tag) {
                    const { title, artist, picture } = tag.tags;
                    setMetadata({ title, artist, picture });
                },
                onError() {
                    setMetadata({ title: music.name, artist: "", picture: undefined });
                },
            });
        }
    }, [music]);

    useEffect(() => {
        if (isPlaying) {
            musicRef.current?.play();
        } else {
            musicRef.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (musicRef.current) {
            musicRef.current.volume = volume / 100;
        }
        localStorage.setItem("volume", JSON.stringify(volume));
    }, [volume]);

    useEffect(() => {
        if (musicRef.current) {
            const { currentTime } = musicRef.current;
            const newTime = Math.floor((progress / 100) * musicRef.current.duration);
            const timeDifference = Math.abs(Math.floor(currentTime) - newTime);

            if (timeDifference > 1) {
                musicRef.current.currentTime = newTime;
            }
        }
    }, [progress, musicRef]);

    const handleTimeUpdate = () => {
        if (musicRef.current) {
            const { currentTime } = musicRef.current;
            const currentProgress = (currentTime / duration) * 100;
            setProgress(currentProgress || 0);
        }
    };

    const handleDurationChange = () => {
        if (musicRef.current) {
            setDuration(musicRef.current.duration);
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
    };
    useEffect(() => {
        musicRef.current?.addEventListener("ended", handleAudioEnd);
        return () => {
            musicRef.current?.removeEventListener("ended", handleAudioEnd);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                setIsPlaying((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (music) {
            const reader = new FileReader();
            reader.readAsDataURL(music);
            reader.onload = () => {
                setMusicPlay(reader.result as string);
            };
        }
    }, [music]);

    useEffect(() => {
        if (metadata?.picture) {
            const { data, format } = metadata.picture;
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
                base64String += String.fromCharCode(data[i]);
            }
            setCover(`data:${format};base64,${window.btoa(base64String)}`);
        } else setCover("");
    }, [metadata]);

    return (
        <section className={PlayerStyles.player}>
            <audio
                src={musicPlay}
                controls
                hidden
                ref={musicRef}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                loop={loop}
            />
            <div className={PlayerStyles.info}>
                <img src={cover || vinyl} alt="Cover" />
                <div>
                    <h2>{metadata?.title || "Unknown Track"}</h2>
                    <span>{metadata?.artist || "Unknown Artist"}</span>
                </div>
            </div>
            <div className={PlayerStyles.controls}>
                <FontAwesomeIcon
                    icon={faShuffle}
                    onClick={() => setShuffle((prev) => !prev)}
                    className={shuffle ? PlayerStyles.active : PlayerStyles.disabled}
                />
                <FontAwesomeIcon icon={faBackwardStep} />
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={() => (music ? setIsPlaying((prev) => !prev) : "")} />
                <FontAwesomeIcon icon={faForwardStep} />
                <FontAwesomeIcon
                    icon={faRepeat}
                    onClick={() => setLoop((prev) => !prev)}
                    className={loop ? PlayerStyles.active : PlayerStyles.disabled}
                />
            </div>
            <ProgressBar progress={progress} setProgress={setProgress} duration={duration} />
            <FontAwesomeIcon icon={faHeart} />
            <Volume volume={volume} setVolume={setVolume} />
        </section>
    );
};
export default Player;
