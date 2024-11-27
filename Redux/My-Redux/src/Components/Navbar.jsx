import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
    const cartProduct = useSelector((state) => state.cart);
    return (
        <div className="flex justify-around text-white bg-slate-600 w-full h-[80px] items-center text-lg">
            <div className="logo">
                <h1>Avinash</h1>
            </div>
            <div className="link ">
                <ul className=" flex">
                    <li>
                        <NavLink to="/" className="p-5 cursor-pointer ">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="p-5 cursor-pointer ">
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="services" className="p-5 cursor-pointer ">
                            Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="contact" className="p-5 cursor-pointer ">
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="profile flex space-x-10">
                <div className="myprofile cart  relative">
                    <NavLink to="/cart " className=" w-20 h-20">
                        <svg
                            className="cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                        >
                            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                        </svg>
                    </NavLink>
                    <span className="absolute  text-sm -top-5 -right-3 bg-gray-200 w-6 h-6 flex justify-center items-center text-black rounded-full">
                        {cartProduct.length}
                    </span>
                </div>
                <div>
                    <svg
                        className="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                    >
                        <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Navbar;