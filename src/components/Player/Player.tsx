import { faBackwardStep, faForwardStep, faHeart, faPause, faPlay, faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "../ProgressBar/ProgressBar";
import Volume from "../Volume/Volume";
import PlayerStyles from "./Player.module.scss";

const Player: React.FC = () => {
    return (
        <section className={PlayerStyles.player}>
            <div className={PlayerStyles.info}>
                <img src="https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85" alt="Cover" />
                <div>
                    <h2>Heil Dir Im Siegen Kranz</h2>
                    <span>Otto Von Bismarck</span>
                </div>
            </div>
            <div className={PlayerStyles.controls}>
                <FontAwesomeIcon icon={faShuffle} />
                <FontAwesomeIcon icon={faBackwardStep} />
                <FontAwesomeIcon icon={faPause || faPlay} />
                <FontAwesomeIcon icon={faForwardStep} />
                <FontAwesomeIcon icon={faRepeat} />
            </div>
            <ProgressBar />
            <FontAwesomeIcon icon={faHeart} />
            <Volume />
        </section>
    );
};
export default Player;
