import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import jsmediatags from "jsmediatags";
import { MusicContext } from "../../context/PlayerContext";
import Layout from "../Layout/Layout";
import MusicStyles from "./Music.module.scss";

const Music: React.FC = () => {
    const [mp3Files, setMp3Files] = useState([] as File[]);
    const [mp3Metadata, setMp3Metadata] = useState([] as { title?: string; artist?: string; album?: string; year?: string }[]);
    const { selectMusic } = useContext(MusicContext);

    const handleDirectorySelect = (event: { target: { files: File[] } }) => {
        const fileList = event.target.files;
        const mp3List = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file.type === "audio/mpeg") {
                mp3List.push(file);
            }
        }
        setMp3Files(mp3List);
        mp3List.forEach((file) => {
            jsmediatags.read(file, {
                onSuccess(tag) {
                    const { title, artist, album, year } = tag.tags;
                    setMp3Metadata((prev) => [...prev, { title, artist, album, year }]);
                },
                onError() {
                    setMp3Metadata((prev) => [...prev, { title: "", artist: "", album: "", year: "" }]);
                },
            });
        });
    };
    return (
        <Layout title="Music">
            <table className={MusicStyles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Year</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {mp3Files.map((file, index) => (
                        <tr key={uuid()} tabIndex={0} role="button" onClick={() => selectMusic(file)}>
                            <td>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                            <td>{file.name}</td>
                            <td>{mp3Metadata[index]?.artist || "Unknown Artist"}</td>
                            <td>{mp3Metadata[index]?.album || "Unknown Album"}</td>
                            <td>{mp3Metadata[index]?.year || "Unknown Year"}</td>
                            <td>{2 || "Unknown Year"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <input type="file" id="mp3Directory" name="mp3Directory" webkitdirectory="" multiple onChange={handleDirectorySelect} />
        </Layout>
    );
};
export default Music;
