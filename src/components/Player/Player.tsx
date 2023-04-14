import { useEffect, useRef, useState } from "react";
import { faBackwardStep, faForwardStep, faHeart, faPause, faPlay, faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as id3 from "id3js";
import { ID3Tag } from "id3js/lib/id3Tag";
import ProgressBar from "../ProgressBar/ProgressBar";
import Volume from "../Volume/Volume";
import PlayerStyles from "./Player.module.scss";
import stuff from "../../music.mp3";
import vinyl from "../../images/vinyl-record.png";

const Player: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(Number(JSON.parse(localStorage.getItem("volume") || "50")));
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [metadata, setMetadata] = useState<ID3Tag | null>(null);

    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const getMeta = async () => {
            const tags = await id3.fromUrl(stuff);
            setMetadata(tags);
        };
        getMeta();
    }, []);

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
            const newTime = (progress / 100) * musicRef.current.duration;
            const timeDifference = Math.abs(currentTime - newTime);

            if (timeDifference > 1) {
                musicRef.current.currentTime = newTime;
            }
        }
    }, [progress]);

    const handleTimeUpdate = () => {
        if (musicRef.current) {
            const { currentTime } = musicRef.current;
            const currentProgress = (currentTime / duration) * 100;
            setProgress(currentProgress);
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

    return (
        <section className={PlayerStyles.player}>
            <audio
                src={stuff}
                controls
                hidden
                ref={musicRef}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                loop={loop}
            />
            <div className={PlayerStyles.info}>
                <img src={vinyl} alt="Cover" />
                <div>
                    <h2>{metadata?.title}</h2>
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
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={() => setIsPlaying((prev) => !prev)} />
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
