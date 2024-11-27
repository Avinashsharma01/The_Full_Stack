import { NavLink } from "react-router-dom";

function Home() {
    return (
        <div className="home bg-slate-700 w-full h-screen pt-40">
            {/* header section start from here  */}
            {/* main section start from here  */}
            <main className="flex justify-around items-center">
                <div className="box w-72 text-2xl h-40 bg-gray-400 flex justify-center items-center ">
                    <NavLink to="/AllChats">Show Data</NavLink>
                </div>
                <div className="box w-72 text-2xl h-40 bg-gray-400  flex justify-center items-center ">
                    <NavLink to="/Create">Create</NavLink>
                </div>
                <div className="box w-72 text-2xl h-40 bg-gray-400 flex justify-center items-center">
                    <NavLink to="/Delete">Delete</NavLink>
                </div>
                <div className="box w-72 text-2xl h-40 bg-gray-400 flex justify-center items-center">
                    <NavLink to="/Search">Search</NavLink>
                </div>
            </main>
        </div>
    );
}

export default Home;
