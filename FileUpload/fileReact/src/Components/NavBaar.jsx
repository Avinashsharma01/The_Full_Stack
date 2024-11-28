import { NavLink } from "react-router-dom";

const NavBaar = () => {
    return (
        <div className="flex  bg-cyan-600 text-white justify-around items-center w-full h-[60px]">
            <div className="logo">
                <h1 className="text-3xl">Avinash</h1>
            </div>
            <div className="link">
                <ul className="flex justify-center items-center gap-5 text-lg">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/services">Services</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contacts</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBaar;
