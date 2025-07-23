import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProductById,
    clearSelectedProduct,
} from "../redux/features/productsSlice";

const ProductDetail = ({ productId, onClose }) => {
    const dispatch = useDispatch();
    const { selectedProduct, status, error } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }

        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [productId, dispatch]);

    if (!productId) return null;

    if (status === "loading") {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (status === "failed") {
        return (
            <div className="text-center text-red-600 py-4">Error: {error}</div>
        );
    }

    if (!selectedProduct) {
        return <div className="text-center py-4">Product not found</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                <button
                    onClick={onClose}
                    className="float-right text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 p-4">
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    <div className="md:w-2/3 p-4">
                        <h2 className="text-xl font-bold mb-2">
                            {selectedProduct.title}
                        </h2>
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                            ${selectedProduct.price}
                        </p>
                        <p className="bg-gray-100 inline-block px-2 py-1 rounded mb-4">
                            {selectedProduct.category}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {selectedProduct.description}
                        </p>

                        {selectedProduct.rating && (
                            <div className="mb-4">
                                <p className="font-semibold">
                                    Rating: {selectedProduct.rating.rate}/5
                                </p>
                                <p>({selectedProduct.rating.count} reviews)</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-right mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
