import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsCard from "./compoenets/ProductsCard";
import Pagination from "./compoenets/Pagination";
import ProductDetail from "./compoenets/ProductDetail";

const App = () => {
    const [items, setitems] = useState([]);
    const fetchData = async () => {
        const fetchItem = await fetch(
            "https://dummyjson.com/products?limit=200"
        );
        const data = await fetchItem.json();
        setitems(data.products);
    };

    console.log(typeof items);
    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    // pagination start from here
    const [currentPage, setCurrentPage] = useState(0);
    const OnePageItemSize = 8;
    const totatProducts = items.length;
    const totalPages = Math.ceil(totatProducts / OnePageItemSize);
    // console.log(totalPages);

    const start = currentPage * OnePageItemSize;
    const end = start + OnePageItemSize;

    console.log("Start:- ", start, " ---End:- ", end);

    const hanndlePageChange = (n) => {
        setCurrentPage(n);
    };

    const handlePrevious = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        setCurrentPage((prev) => prev + 1);
    };
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <h1 style={{ textAlign: "center" }}>
                                    Pagination
                                </h1>

                                <div className="product-container">
                                    {items
                                        .slice(start, end)
                                        .map((item, index) => (
                                            <ProductsCard
                                                product={item}
                                                key={index}
                                            />
                                        ))}
                                </div>
                                {/* pagination */}
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    handleNext={handleNext}
                                    handlePrevious={handlePrevious}
                                    hanndlePageChange={hanndlePageChange}
                                />
                            </div>
                        }
                    ></Route>
                    <Route
                        path="/detail/:productId"
                        element={<ProductDetail items={items} />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
