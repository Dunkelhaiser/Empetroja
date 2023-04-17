import LayoutStyles from "./Layout.module.scss";

interface Props {
    title: string;
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, children }) => {
    return (
        <section className={LayoutStyles.main}>
            <h1 className={LayoutStyles.title}>{title}</h1>
            <div className={LayoutStyles.content}>{children}</div>
        </section>
    );
};
export default Layout;
