import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("product id", productId);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://dummyjson.com/products/${productId}`
                );
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading)
        return <div className="loading">Loading product details...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!product) return <div className="not-found">Product not found</div>;

    return (
        <div className="product-detail-container">
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Products
            </button>
            <div className="product-detail">
                <div className="product-images">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="main-image"
                    />
                    <div className="image-gallery">
                        {product.images &&
                            product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${product.title} view ${index + 1}`}
                                    className="thumbnail-image"
                                />
                            ))}
                    </div>
                </div>
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <div className="product-meta">
                        <span className="product-brand">
                            Brand: {product.brand}
                        </span>
                        <span className="product-category">
                            Category: {product.category}
                        </span>
                        <div className="product-rating">
                            Rating: {product.rating} ★
                        </div>
                    </div>
                    <div className="product-price">
                        <span className="price">₹{product.price}</span>
                        {product.discountPercentage > 0 && (
                            <span className="discount">
                                {product.discountPercentage}% OFF
                            </span>
                        )}
                    </div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-stock">
                        Stock: {product.stock} units available
                    </div>
                    <button className="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
