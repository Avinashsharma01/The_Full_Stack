import { MyContext } from "../Context/MyContext";
import { useContext } from "react";
function InnerHome3() {
    const { avinash, soumya, brijesh } = useContext(MyContext);
    return (
        <div className={`${avinash.style} bg-slate-700 w-[400px] p-5 `}>
            <h1>
                {soumya.name} {avinash.lastName}
            </h1>
            <h1 className={`${soumya.color}`}>
                {avinash.name} {soumya.lastName}
            </h1>
            <h1 className={`${brijesh.color}`}>
                {avinash.name} {soumya.lastName}
            </h1>
        </div>
    );
}

export default InnerHome3;
