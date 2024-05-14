// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
//import ResponsiveAppBar from "./components/ResponsiveAppBar";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <Router>
            <div>
                <ToastContainer/>
               {/* <ResponsiveAppBar/>*/}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/taylor" element={<About />} />
                    <Route path="/coantact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
