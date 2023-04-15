import { createContext, useMemo, useState } from "react";

type MusicContextType = {
    music: File | null;
    uploadMusic: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

interface Props {
    children: React.ReactNode;
}

const iMusicContextState = {
    music: null,
    uploadMusic: () => {},
};

export const MusicContext = createContext<MusicContextType>(iMusicContextState);

export const MusicContextProvider: React.FC<Props> = ({ children }) => {
    const [music, setMusic] = useState<File | null>(null);

    const uploadMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setMusic(file);
    };

    const values = useMemo(
        () => ({
            music,
            uploadMusic,
        }),
        [music, uploadMusic]
    );

    return <MusicContext.Provider value={values}>{children}</MusicContext.Provider>;
};
