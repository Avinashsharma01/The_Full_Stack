import InnerHome3 from "./InnerHome3";
import { useContext } from "react";
import { MyContext } from "../Context/MyContext";
function InnnerHome2() {
    const avinash = useContext(MyContext);
    return (
        <>
            <h1 className={`${avinash.color}`}>
                {avinash.name} {avinash.lastName}
            </h1>
            <div className="w-2/4 h-2/4 bg-slate-600 flex justify-center items-center">
                <InnerHome3 />
            </div>
        </>
    );
}

export default InnnerHome2;
