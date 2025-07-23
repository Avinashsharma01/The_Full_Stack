import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Cart from "./Components/Cart";
import { Provider } from "react-redux";
import store from "./Store/store.js"; // Assuming you've set up Redux store
import ToyStore from "./Pages/ToyStore.jsx";
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/ToyStore" element={<ToyStore />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
