import { NavLink } from "react-router-dom";
const About = () => {
    const names = [
        "Avinash",
        "Soumya",
        "Brijesh",
        "Anup",
        "Ankrita",
        "Amresh",
        "Vijay",
        "Ajay",
        "Chandan",
        "Krishana",
        "Akash",
        "Vishal",
        "Vikash",
        "Abhishek",
    ];
    return (
        <div className="w-full min-h-screen h-auto bg-slate-700 flex justify-center items-center flex-col ">
            <div className="head">
                <h1 className="text-white text-3xl">
                    There are some users you want to check their profile then
                    click on the user name
                </h1>
                <marquee direction="" className="text-green-500">
                    This is the example of Dynaminc route
                </marquee>
            </div>
            <ul className="text-white text-3xl">
                {names.map((name, index) => (
                    <div key={index} className="list">
                        <NavLink to={`/user/${name}`}>
                            <li className="p-3">{name}</li>
                        </NavLink>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default About;
