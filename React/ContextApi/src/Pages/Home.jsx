import { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";

function Home() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div
            className="w-full h-screen"
            style={{
                background: theme === "light" ? "#fff" : "#333",
                color: theme === "light" ? "#000" : "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <button
                onClick={toggleTheme}
                className="bg-blue-600 text-white p-4 rounded-md"
            >
                Toggle Theme
            </button>
        </div>
    );
}

export default Home;
