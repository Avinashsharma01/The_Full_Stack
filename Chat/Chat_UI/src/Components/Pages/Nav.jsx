import { NavLink } from "react-router-dom";
function Nav() {
    return (
        <>
            {/* Header  */}
            <header className="sticky top-0 left-0">
                <nav className="bg-slate-600 w-full h-[60px] flex justify-around items-center text-white ">
                    <div className="logo">
                        <h1 className="text-xl">Avinash</h1>
                    </div>
                    <div className="link">
                        <ul className="flex">
                            <NavLink to="/">
                                <li className="p-3 text-lg">Home</li>
                            </NavLink>
                            <NavLink to="/About">
                                <li className="p-3 text-lg">About</li>
                            </NavLink>
                            <NavLink to="/Contact">
                                <li className="p-3 text-lg">Contact</li>
                            </NavLink>
                            <NavLink to="/AllChat">
                                <li className="p-3 text-lg">All Chats</li>
                            </NavLink>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Nav;
