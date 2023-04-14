import { useRef, useState } from "react";
import ProgressBarStyles from "./ProgressBar.module.scss";

const ProgressBar: React.FC = () => {
    const [progress, setProgress] = useState(50);
    const progressRef = useRef<HTMLInputElement>(null);

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgress(Number(e.currentTarget.value));
        if (progressRef.current) {
            progressRef.current.style.setProperty("--value", `${e.currentTarget.value}`);
        }
    };
    return (
        <div className={ProgressBarStyles.progress_section}>
            <span className={ProgressBarStyles.time}>
                3:35 / <span>6:42</span>
            </span>
            <input
                type="range"
                value={progress}
                min={0}
                max={100}
                onChange={handleProgressChange}
                ref={progressRef}
                className={ProgressBarStyles.progress_bar}
            />
        </div>
    );
};
export default ProgressBar;
