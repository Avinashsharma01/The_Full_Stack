import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Edit() {
    const { id } = useParams();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    console.log(id);


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:4000/edit/${id}`, {
            from,
            to,
            message,
        });
        navigate("/AllChats", { replace: true });
    };
    return (
        <div className="editsss w-full   bg-slate-500 flex justify-center items-center">
            <form
                action=""
                className="w-1/3 h-1/1 bg-slate-600 p-20 text-white flex justify-center flex-col"
            >
              <h1 className="text-yellow-500 text-xl">Edit Section</h1>
                <label htmlFor="">From</label>
                <input
                    className="text-black outline-none px-2 py-1"
                    onChange={(e) => setFrom(e.target.value)}
                    type="text"
                />
                <label htmlFor="">To</label>
                <input
                    className="text-black outline-none px-2 py-1"
                    onChange={(e) => setTo(e.target.value)}
                    type="text"
                />
                <label htmlFor="">Message</label>
                <input
                    className="text-black outline-none px-2 py-1"
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-yellow-500 mt-4"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Edit;
