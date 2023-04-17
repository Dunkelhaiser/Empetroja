import { faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import VolumeStyles from "./Volume.module.scss";

interface Props {
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const Volume: React.FC<Props> = ({ volume, setVolume }) => {
    const [muted, setMuted] = useState(false);
    const volumeRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (volumeRef.current) {
            volumeRef.current.style.setProperty("--value", `${volume}`);
        }
    }, [volume]);
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.currentTarget.value));
        setMuted(false);
        if (volumeRef.current) {
            volumeRef.current.style.setProperty("--value", `${e.currentTarget.value}`);
        }
    };
    const iconClick = () => {
        // setVolume(volume ? 0 : 50);
        setMuted((prev) => !prev);
        // if (volumeRef.current) {
        //     volumeRef.current.style.setProperty("--value", `${volume ? 0 : 50}`);
        // }
    };
    const icon = volume === 0 ? faVolumeOff : volume < 50 ? faVolumeLow : faVolumeHigh;
    const mutedIcon = muted ? faVolumeXmark : icon;
    return (
        <div className={VolumeStyles.volume}>
            <div>
                <FontAwesomeIcon icon={mutedIcon} onClick={iconClick} />
            </div>
            <input
                type="range"
                ref={volumeRef}
                min={0}
                max={100}
                value={volume}
                className={VolumeStyles.volume_bar}
                onChange={handleVolumeChange}
            />
        </div>
    );
};
export default Volume;
