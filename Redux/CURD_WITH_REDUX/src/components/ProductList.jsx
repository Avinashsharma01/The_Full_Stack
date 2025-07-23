import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/features/productsSlice";
import ProductDetail from "./ProductDetail";

const ProductList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
    const [detailId, setDetailId] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        // if (window.confirm("Are you sure you want to delete this product?")) {

        // }
        dispatch(deleteProduct(id));
    };

    const handleViewDetails = (id) => {
        setDetailId(id);
    };

    if (status === "loading") {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (status === "failed") {
        return (
            <div className="text-center text-red-600 py-4">Error: {error}</div>
        );
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Products List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    {product.id}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    {product.title.substring(0, 70) + "...."}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    ${product.price}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    {product.category}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <button
                                        onClick={() =>
                                            handleViewDetails(product.id)
                                        }
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 cursor-pointer"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => onEdit(product.id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {detailId && (
                <ProductDetail
                    productId={detailId}
                    onClose={() => setDetailId(null)}
                />
            )}
        </div>
    );
};

export default ProductList;
