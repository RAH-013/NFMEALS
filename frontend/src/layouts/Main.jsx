import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import Header from "../components/Header";
import Loader from "./Loader";
import ScrollTopButton from "../components/ScrollTopButton";

export default function Main() {
    return (
        <>
            <Header />
            <main className="h-full flex flex-col">
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
            <ScrollTopButton />
        </>
    );
}