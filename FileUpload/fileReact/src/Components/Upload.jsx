import { useContext, useRef, useState } from "react";
import axios from "axios";
import MyContext from "../Context/MyContext";

const Upload = () => {
    const { file, setFile } = useContext(MyContext);
    const { setAfterUpload } = useContext(MyContext);
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false); // Track upload status

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file first!");
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append("file", file); // Key must match the backend's expected key

        setIsLoading(true); // Start the loader

        try {
            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("File uploaded successfully:", response.data);
            // alert("File uploaded successfully!");
            setAfterUpload(true);
            setFile(null);
            fileInputRef.current.value = null; // Clear the file input
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
        } finally {
            setIsLoading(false); // Stop the loader
        }
    };

    return (
        <div className="w-[90vw] mt-10 h-auto p-10 bg-slate-400 flex justify-center items-center flex-col">
            <h1 className="head bg-cyan-700 text-white px-5 py-2 w-full text-center">
                Upload Your Image Here
            </h1>
            <form
                method="POST"
                encType="multipart/form-data"
                className="flex flex-col items-center p-5"
                onSubmit={handleSubmit}
            >
                <input
                    type="file"
                    name="file"
                    className="block border p-2 mt-2"
                    onChange={handleFileChange}
                    ref={fileInputRef} // Attach the ref to the input
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-5 py-2 mt-9"
                    disabled={isLoading} // Disable button during upload
                >
                    {isLoading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {/* Loader */}
            {isLoading && (
                <div className="mt-5">
                    <div className="text-white">
                        <img
                            src="./public/uploader.gif"
                            alt=""
                            className="w-40"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upload;
