import Music from "./components/Music/Music";
import Player from "./components/Player/Player";
import Sidebar from "./components/Sidebar/Sidebar";
import "./scss/styles.scss";

function App() {
    return (
        <>
            <main>
                <Sidebar />
                <Music />
            </main>
            <Player />
        </>
    );
}

export default App;
