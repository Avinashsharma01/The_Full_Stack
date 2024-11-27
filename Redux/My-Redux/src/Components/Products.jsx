import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../Store/CartSlice";
import { getProduct } from "../Store/productsSlice";
const Products = () => {
    const dispatch = useDispatch();
    const { data: products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProduct());
        // dispatch store here
        // fetch("https://fakestoreapi.com/products")
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error(
        //                 "Network response was not ok " + response.statusText
        //             );
        //         }
        //         return response.json(); // assuming the response is JSON
        //     })
        //     .then((data) => {
        //         setProduct(data);
        //     })
        //     .catch((error) => {
        //         console.error(
        //             "There has been a problem with your fetch operation:",
        //             error
        //         );
        //     });
    }, [dispatch]);

    const addToCart = (product) => {
        dispatch(add(product));
    };
    return (
        <>
            <div className="w-full h-auto p-10 grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                <h1 className="text-4xl text-center text-white ">
                    The products
                </h1>
                {products.map((product) => (
                    <div
                        className="border flex justify-center items-center flex-col p-5"
                        key={product.id}
                    >
                        <img className="w-48" src={product.image} alt="" />
                        <div className="detail">
                            <p> {product.title}</p>
                            <h1 className="font-bold">
                                {" "}
                                Price:- {product.price}
                            </h1>
                            <span>category:- {product.category}</span>
                        </div>
                        <div className="btn m-5">
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-blue-600 text-white px-4 py-2"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Products;
