import "./App.css";
import Home from "./Components/Home";
import { MyContextState } from "./Context/MyContextState";
function App() {
    return (
        <>
            <div className=" w-full h-screen bg-slate-600 text-white flex justify-center items-center ">
                <MyContextState>
                    <Home />
                </MyContextState>
            </div>
        </>
    );
}

export default App;
