import { useEffect, useRef } from "react";
import ProgressBarStyles from "./ProgressBar.module.scss";

interface Props {
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    duration: number;
}

const ProgressBar: React.FC<Props> = ({ progress, setProgress, duration }) => {
    const progressRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.setProperty("--value", `${progress}`);
        }
    }, [progress]);

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(Number(e.currentTarget.value));
        if (progressRef.current) {
            progressRef.current.style.setProperty("--value", `${e.currentTarget.value}`);
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
    };

    return (
        <div className={ProgressBarStyles.progress_section}>
            <span className={ProgressBarStyles.time}>
                <span>{formatTime((progress * duration) / 100)}</span> /{" "}
                <span className={ProgressBarStyles.duration}>{formatTime(duration)}</span>
            </span>
            <input
                type="range"
                value={progress}
                disabled={!duration}
                onChange={handleProgressChange}
                ref={progressRef}
                className={ProgressBarStyles.progress_bar}
            />
        </div>
    );
};
export default ProgressBar;
