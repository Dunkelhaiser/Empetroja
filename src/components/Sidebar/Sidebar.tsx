import { faGear, faHeart, faHome, faMusic, faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarStyles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
    return (
        <aside className={SidebarStyles.sidebar}>
            <h1>Empetroja</h1>
            <nav>
                <ul className={SidebarStyles.navigation}>
                    <li className={SidebarStyles.active}>
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faMusic} /> Music
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faRecordVinyl} /> Playlists
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faHeart} /> Favorite
                    </li>
                </ul>
            </nav>
            <span>
                <FontAwesomeIcon icon={faGear} /> Settings
            </span>
        </aside>
    );
};
export default Sidebar;
