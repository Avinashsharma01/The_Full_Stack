/* eslint-disable react/prop-types */
import MyContext from "./MyContext";
import { useState } from "react";

const MyContextProvider = (props) => {
    const [file, setFile] = useState(null); // Manage file state globally
    const [AfterUpload, setAfterUpload] = useState(false);

    return (
        <MyContext.Provider
            value={{ file, setFile, AfterUpload, setAfterUpload }}
        >
            {props.children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
