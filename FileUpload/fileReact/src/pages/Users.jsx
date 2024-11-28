import { useParams } from "react-router-dom";
const Users = () => {
    const params = useParams();
    const { name } = params;
    if (!name) {
        return <div>No user name provided</div>;
    }
    return (
        <div className="w-full h-screen bg-slate-700 flex justify-center items-center text-white text-3xl">
            <h1>This is {name.toUpperCase()} page</h1>
        </div>
    );
};

export default Users;
