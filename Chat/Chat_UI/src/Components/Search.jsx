import { useEffect, useState } from "react";

// Desc: Search component for searching users
function Search() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    console.log(result);

    const handleSearch = (query) => {
        if (!query) return; // If query is empty, avoid making the request
        fetch(`http://localhost:4000/search?query=${query}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setResult(data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    // useEffect to call handleSearch when query changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(query);
        }, 200); // Delay of 500ms for debounce effect

        return () => clearTimeout(delayDebounceFn); // Cleanup on unmount or when query changes
    }, [query]);

    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <div className="searchCon w-full  h-40 flex  flex-col p-5">
                <h1 className="text-4xl">Search</h1>
                <p className="text-2xl">Search for users</p>
                <input
                    className="h-[30px]  outline-none px-2 p-2 border-black border"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="px-4 bg-blue-600 mt-5"
                >
                    Search
                </button>
            </div>

            {/* User willl be display heere  */}

            <div className="userlist mt-10">
                <ul>
                    {result.map((item, id) => (
                        // <li key={id}>From: {item.from}, To: {item.to}, Message: {item.message}</li>
                        <li key={id} className="border p-2 m-2">
                            <p>{item.from}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Search;
