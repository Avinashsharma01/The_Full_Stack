import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BothAllAndUpload from "./Components/BothAllAndUpload";
import NavBaar from "./Components/NavBaar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Users from "./pages/Users";
function App() {
    return (
        <BrowserRouter>
            <NavBaar />
            <Routes>
                <Route path="/" element={<BothAllAndUpload />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Contact />} />
                <Route path="/contact" element={<Services />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
                <Route path="/user/:name" element={<Users />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
