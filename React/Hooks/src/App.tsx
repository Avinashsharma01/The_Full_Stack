import ComplexCounter from "./Component/ComplexCounter";
import UseReducerr from "./Component/UseReducerr";

function App() {
    return (
        <div className="bg-slate-600 w-full h-screen">
            <h1 className="text-white text-9xl p-5 text-center">
                USEREDUCER HOOK APP
            </h1>
            <UseReducerr />
            <ComplexCounter />
        </div>
    );
}

export default App;
