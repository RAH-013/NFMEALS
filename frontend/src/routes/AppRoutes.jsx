import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { PrivateRoute, RoleGuard } from "./PrivateRoutes";
import { UserProvider } from "../context/User";

import Main from "../layouts/Main";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Auth = lazy(() => import("../pages/Auth"));

const AdminHome = lazy(() => import("../pages/admin/Home"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminOrders = lazy(() => import("../pages/admin/Orders"));
const AdminCoupons = lazy(() => import("../pages/admin/Coupons"));
const AdminIngredients = lazy(() => import("../pages/admin/Ingredients"));
const AdminMeals = lazy(() => import("../pages/admin/Meals"));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    {/* ruta pública */}
                    <Route path="/authenticate" element={<Auth />} />
                    <Route path="/authenticate/verify-email" element={<Auth />} />

                    {/* layout público */}
                    <Route element={<Main />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/carrito" element={<Cart />} />
                    </Route>

                    {/* rutas privadas */}
                    <Route element={<PrivateRoute />}>
                        <Route element={<Main />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Route>

                    {/* rutas admin */}
                    <Route element={<RoleGuard role="admin" />}>
                        <Route element={<Main />}>
                            <Route path="/admin" element={<AdminHome />} />
                            <Route path="/admin/users" element={<AdminUsers />} />
                            <Route path="/admin/orders" element={<AdminOrders />} />
                            <Route path="/admin/coupons" element={<AdminCoupons />} />
                            <Route path="/admin/ingredients" element={<AdminIngredients />} />
                            <Route path="/admin/meals" element={<AdminMeals />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}