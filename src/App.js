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
import HotCode from "./pages/HotCode";
import ProjectileMotion from "./components/ProjectileMotion";
import Compiladores from "./components/Compiladores";


function App() {
    return (
        <Router>
            <AuthProvider>
                <ResponsiveAppBar/>
                <ToastContainer/>
                <span className={'vs'}>v1.8</span>
                <Routes>
                    <Route path="/" element={<Home />} />{/**/}
                    <Route path="/funciones" element={<About />} />
                    <Route path="/taylor" element={<Taylor />} />
                    <Route path="/map" element={<HotCode />} />
                    <Route path="/projectile" element={<ProjectileMotion />} />
                    <Route path="/compiladores" element={<Compiladores />} />
                    <Route path="/fisica" element={<ProjectileMotion />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
