// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from "./context/AuthProvider";
import Taylor from "./pages/Taylor";
import {ToastContainer} from "react-toastify";


function App() {
    return (
        <Router>
            <AuthProvider>
                <ResponsiveAppBar/>
                <ToastContainer/>
                <span className={'vs'}>v1.5</span>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/funciones" element={<About />} />
                    <Route path="/taylor" element={<Taylor />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
