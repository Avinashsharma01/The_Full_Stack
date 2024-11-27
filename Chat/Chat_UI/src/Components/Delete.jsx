import axios from "axios"
import { useState } from "react"

function Delete() {

    const [id, setId] = useState("");

    const handleSubmitOne = () => {
        // e.preventDefault();
        axios.delete(`http://localhost:4000/delete/${id}`)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleSubmitMany = () => {
        // e.preventDefault();
        axios.delete("http://localhost:4000/deleteMany")
        .then((response)=>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    

  return (
    <div className="container w-full  bg-cyan-900 flex justify-center items-center text-black ">
        <div className="delete w-72 h-40 bg-gray-400 p-4">
        <h1 className=" text-center text-2xl">Delete chat by id</h1>

    
        <form action="" className="p-6 ">
            <label htmlFor="">Id: </label>
            <input onChange={(e) => setId(e.target.value)} className="inline-block outline-none " type="text" />
            <button onClick={handleSubmitOne} className="bg-red-600 mt-5 mr-5 text-white px-2 ">Delete by id</button>
            <button onClick={handleSubmitMany} className="bg-red-600 mt-5  text-white px-2 ">Delete All</button>
        </form>
        </div>
    </div>
  )
}

export default Delete