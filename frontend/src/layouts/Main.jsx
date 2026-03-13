import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import Header from "../components/Header";
import Loader from "../components/Loader";
import ScrollTopButton from "../components/ScrollTopButton";

export default function Main() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
            <ScrollTopButton />
        </>
    );
}