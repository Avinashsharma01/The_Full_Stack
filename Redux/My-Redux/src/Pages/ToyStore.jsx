import { useDispatch, useSelector } from "react-redux";
import {
    addCar,
    removeCar,
    addDolls,
    removeDolls,
} from "../../ToyStore/ToySlice";

const ToyStore = () => {
    const totalCar = useSelector((state) => state.toys.cars);
    const totalDolls = useSelector((state) => state.toys.dolls);
    const dispatch = useDispatch();
    console.log(totalCar);
    return (
        <>
            <div className="bg-slate-700 w-full h-screen text-white flex flex-col justify-center items-center ">
                <h1>Car Store and total Car is {totalCar}</h1>
                <button onClick={() => dispatch(addCar())}>AddCar</button>
                <button onClick={() => dispatch(removeCar())}>RemoveCar</button>
            </div>
            <div className="bg-slate-700 w-full h-screen text-white flex flex-col justify-center items-center ">
                <h1>Dolls Store and total Dolls is {totalDolls}</h1>
                <button onClick={() => dispatch(addDolls())}>AddDolls</button>
                <button onClick={() => dispatch(removeDolls())}>
                    RemoveDolls
                </button>
            </div>
        </>
    );
};
export default ToyStore;
