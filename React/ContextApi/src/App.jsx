import "./App.css";
// import Home from "./Components/Home";
// import { MyContextState } from "./Context/MyContextState";
import { ThemeProvider } from "./Context/ThemeContext";
import Home from "./Pages/Home";
function App() {
    return (
        <>
            <div className=" w-full h-screen bg-slate-600 text-white flex justify-center items-center ">
                {/* <MyContextState> */}
                <ThemeProvider>
                    <Home />
                </ThemeProvider>
                {/* </MyContextState> */}
            </div>
        </>
    );
}

export default App;
