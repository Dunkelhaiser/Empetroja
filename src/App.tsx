import { useContext } from "react";
import Player from "./components/Player/Player";
import Sidebar from "./components/Sidebar/Sidebar";
import { MusicContext } from "./context/PlayerContext";
import "./scss/styles.scss";

function App() {
    const { uploadMusic, music } = useContext(MusicContext);

    return (
        <>
            <input type="file" onChange={uploadMusic} accept="audio/*" />
            <button onClick={() => console.log(music)}>dsadssd</button>
            <Sidebar />
            <Player />
        </>
    );
}

export default App;
