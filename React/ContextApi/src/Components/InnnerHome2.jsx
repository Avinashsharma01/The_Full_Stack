import InnerHome3 from "./InnerHome3";
import { useContext } from "react";
import { MyContext } from "../Context/MyContext";
function InnnerHome2() {
    const { avinash, Hello } = useContext(MyContext);
    return (
        <>
            <div className="main flex flex-col justify-center items-center">
                <h1 className={`${avinash.color}`}>
                    {Hello.name} {avinash.lastName}
                </h1>
                <div className="w-3/4 h-3/4 bg-slate-600 flex justify-center items-center">
                    <InnerHome3 />
                </div>
            </div>
        </>
    );
}

export default InnnerHome2;
