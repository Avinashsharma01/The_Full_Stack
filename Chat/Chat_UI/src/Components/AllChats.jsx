// import axios from "axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


function AllChats() {
    // const [response, setResponse] = useState([]);
    const [Fetching, setFetching] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:4000/chats")
    //         .then((response) => {
    //             setResponse(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    useEffect(() => {
        fetch("http://localhost:4000/chats")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setFetching(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmitOne = (id) => {
        axios
            .delete(`http://localhost:4000/delete/${id}`)
            .then((response) => {
                console.log(response);
                // Refresh the page by refetching the data
                fetch("http://localhost:4000/chats")
                    .then((response) => response.json())
                    .then((data) => {
                        setFetching(data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };




    if(loading) return <h1 className=" text-center mt-96 text-2xl">Loading...</h1>
    return (
        <div className="allChats flex justify-around flex-wrap">
            {Fetching.map((item, index) => (
                <div key={index} className="chat  ">
                    {
                        // loading && <p>Loading...</p>
                        
                    }
                    <p className="id">Id: {item._id}</p>
                    <h3 className="name">From: {item.from}</h3>
                    <h2 className="to">To: {item.to}</h2>
                    <p className="message"> Message: {item.message}</p>
                    <p className="time">
                        {" "}
                        Created_at:{" "}
                        {item.created_at.substring(11, 19) <= "12: 00: 00"
                            ? item.created_at.substring(11, 19) + " AM"
                            : item.created_at.substring(11, 19) + " PM"}
                    </p>
                    <div className="btn flex justify-around mt-4">
                        <button
                            onClick={() => handleSubmitOne(item._id)}
                            className="delete bg-red-500 px-4 text-white"
                        >
                            Delete
                        </button>
                        <NavLink to={`/Edit/${item._id}`}>
                            <p href="" className="edit bg-yellow-500 px-4 text-white">Edit</p>
                            </NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllChats;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function AllChats() {
//     // Use state to hold the chat data
//     const [chats, setChats] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Fetch data using useEffect on component mount
//     useEffect(() => {
//         axios
//             .get("http://localhost:4000/chats")
//             .then((response) => {
//                 setChats(response.data); // Set the chat data
//                 setLoading(false);       // Set loading to false once data is fetched
//             })
//             .catch((error) => {
//                 console.log(error);
//                 setLoading(false); // Stop loading if there's an error
//             });
//     }, []); // Empty dependency array means this runs once after the component mounts

//     // Show a loading state while the data is being fetched
//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="allChats">
//             {chats.map((item, index) => (
//                 <div key={index} className="chat">
//                     <h3 className="name">{item.from}</h3>
//                     <h2 className="to">{item.to}</h2>
//                     <p className="message">{item.message}</p>
//                     <p className="time">{new Date(item.created_at).toLocaleString()}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default AllChats;
