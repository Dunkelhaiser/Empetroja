import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MusicContextProvider } from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MusicContextProvider>
            <App />
        </MusicContextProvider>
    </React.StrictMode>
);
