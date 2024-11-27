import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AllChats from "./Components/AllChats";
import About from "./Components/Pages/About";
import Nav from "./Components/Pages/Nav";
import Create from "./Components/Create";
import Delete from "./Components/Delete";
import Edit from "./Components/Edit";
import Search from "./Components/Search";
// import Footer from "./Components/Pages/Footer"
function App() {


    return (
        <>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/AllChats" element={<AllChats />} />
                    <Route exact path="/About" element={<About />} />
                    <Route exact path="/Create" element={<Create />} />
                    <Route path="/Delete" element={<Delete />} />
                    <Route path="/Edit/:id" element={<Edit />} />
                    <Route path="Search" element={<Search/>}/>
                </Routes>
                {/* <Footer/> */}
            </BrowserRouter>
        </>
    );
}

export default App;
