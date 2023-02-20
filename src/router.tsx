import { Transactions } from "./pages/Transactions";

import { Routes, Route, NavLink, Navigate, useNavigate } from "react-router-dom"
import { Login } from "./pages/Login";
import { useEffect } from "react";

export function Router() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, []);
    return (
        <Routes>
            <Route path="/" element={localStorage.getItem("userEmail") ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            <Route path="/home" element={<Transactions />} />
            <Route path="/login" element={<Login />} />
        </Routes>

    )
}