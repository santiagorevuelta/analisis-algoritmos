// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from "./context/AuthProvider";


function App() {
    return (
        <Router>
            <AuthProvider>
                <ToastContainer/>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/funciones" element={<About />} />
                    <Route path="/coantact" element={<Contact />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
