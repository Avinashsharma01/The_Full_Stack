import { useSelector, useDispatch } from "react-redux";
import { remove } from "../Store/CartSlice";
const Cart = () => {
    const cartProduct = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const RemoveToCart = (product) => {
        dispatch(remove(product));
    };
    return (
        <div className="w-full bg-[#1E2228] text-white min-h-screen h-auto p-10 grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {cartProduct.map((product) => (
                <div
                    className="border flex justify-center items-center flex-col p-5"
                    key={product.id}
                >
                    <img className="w-48" src={product.image} alt="" />
                    <div className="detail">
                        <p> {product.title}</p>
                        <h1 className="font-bold"> Price:- {product.price}</h1>
                        <span>category:- {product.category}</span>
                    </div>
                    <div className="btn m-5">
                        <button
                            onClick={() => RemoveToCart(product.id)}
                            className="bg-red-600 text-white px-4 py-2"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cart;
