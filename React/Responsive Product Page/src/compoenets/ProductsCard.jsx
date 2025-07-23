import { useNavigate } from "react-router-dom";

const ProductsCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className="product-card"
            onClick={() => navigate(`/detail/${product.id}`)}
        >
            <img src={product.thumbnail} alt="" />
            <h3>{product.title}</h3>
        </div>
    );
};

export default ProductsCard;
