import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import Main from "../layouts/Main";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Auth = lazy(() => import("../pages/Auth"));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/authenticate" element={<Auth />} />

                <Route element={<Main />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/carrito" element={<Cart />} />
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}