import { useState } from "react";
import { useSelector } from "react-redux";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
    const [editId, setEditId] = useState(null);
    const { error } = useSelector((state) => state.products);

    const handleEdit = (id) => {
        setEditId(id);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                FakeStore API CRUD with Redux Toolkit
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
            )}

            <ProductForm editId={editId} setEditId={setEditId} />

            <ProductList onEdit={handleEdit} />
        </div>
    );
}

export default App;
