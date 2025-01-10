import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = () => {
        // e.preventDefault();
        axios
            .post("http://localhost:4000/Create", {
                from,
                to,
                message,
            })
            .then((response) => {
                console.log(response);
                setFrom("");
                setTo("");
                setMessage("");
                navigate("/Create", { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container w-full  bg-cyan-900 flex justify-center items-center ">
            <form
                action=""
                className="w-1/3 h-1/2 bg-slate-600 p-20 text-white flex justify-center flex-col"
            >
                <h1 className="text-yellow-500 text-xl">Enter Data</h1>
                <label htmlFor="">From</label>
                <input
                    className="block p-1 text-black outline-none"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                        setFrom(e.target.value);
                    }}
                />
                <label htmlFor="">To</label>
                <input
                    className="block p-1 text-black outline-none"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                        setTo(e.target.value);
                    }}
                />
                <label htmlFor="">Message</label>
                <input
                    className="block p-1 text-black outline-none"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="bg-red-600 mt-2"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Create;
