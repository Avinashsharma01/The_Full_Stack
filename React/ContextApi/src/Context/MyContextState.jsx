/* eslint-disable react/prop-types */
import { MyContext } from "./MyContext";

export const MyContextState = (props) => {
    const avinash = {
        name: "Avinash ",
        lastName: "Sharma",
        age: 23,
        style: "text-white  text-4xl",
        color: "text-red-500",
    };

    const soumya = {
        name: "soumya ",
        lastName: "Sharma",
        age: 23,
        style: "text-white  text-4xl",
        color: "text-black",
    };

    const brijesh = {
        name: "soumya ",
        lastName: "Sharma",
        age: 23,
        style: "text-white  text-4xl",
        color: "text-black",
    };
    const Hello = {
        name: "Hello ",
        lastName: "Sharma",
        age: 99999,
        style: "text-white  text-4xl",
        color: "text-black",
    };

    const contextvalue = {
        avinash,
        soumya,
        brijesh,
        Hello,
    };

    return (
        <MyContext.Provider value={contextvalue}>
            {props.children}
        </MyContext.Provider>
    );
};
