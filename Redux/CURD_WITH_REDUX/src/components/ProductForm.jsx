import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProduct,
    updateProduct,
    fetchProductById,
    clearSelectedProduct,
} from "../redux/features/productsSlice";

const ProductForm = ({ editId, setEditId }) => {
    const dispatch = useDispatch();
    const { selectedProduct, status } = useSelector((state) => state.products);

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });

    // Fetch product data if in edit mode
    useEffect(() => {
        if (editId) {
            dispatch(fetchProductById(editId));
        } else {
            dispatch(clearSelectedProduct());
            resetForm();
        }
    }, [editId, dispatch]);

    // Update form when selected product changes
    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                title: selectedProduct.title || "",
                price: selectedProduct.price || "",
                description: selectedProduct.description || "",
                category: selectedProduct.category || "",
                image: selectedProduct.image || "",
            });
        }
    }, [selectedProduct]);

    const resetForm = () => {
        setFormData({
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "price" ? parseFloat(value) || "" : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            dispatch(updateProduct({ id: editId, productData: formData }));
            setEditId(null);
        } else {
            dispatch(addProduct(formData));
        }

        resetForm();
    };

    const handleCancel = () => {
        setEditId(null);
        resetForm();
        dispatch(clearSelectedProduct());
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
                {editId ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="price"
                    >
                        Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="image"
                    >
                        Image URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={status === "loading"}
                    >
                        {status === "loading"
                            ? "Processing..."
                            : editId
                            ? "Update Product"
                            : "Add Product"}
                    </button>
                    {editId && (
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
