import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/User"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { SwalCustom } from "../utils/modal";

import VerifyEmail from "../components/VerifyEmail";
import Login from "../components/Login";
import Register from "../components/Register";
import Images from "../layouts/Images";

function Auth() {
    const [mode, setMode] = useState("login");
    const isLogin = mode === "login";

    const { login } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const isVerifyEmail = location.pathname.includes("verify-email");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        if (token) {
            login(token);
            SwalCustom({
                icon: "success",
                message: "Autenticación exitosa",
                autoclose: true,
                callback: () => navigate("/")
            });
        }
    }, [location.search, login, location.pathname]);

    return (
        <div className="flex min-h-screen bg-neutral-950 text-white">

            <Link
                className="text-4xl font-bold md:font-normal md:text-base absolute top-4 left-4 flex items-center gap-2 px-2 py-1 text-red-700 cursor-pointer rounded hover:bg-neutral-700 z-10"
                to="/"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="hidden md:block">Regresar</span>
            </Link>

            <div className="hidden md:flex flex-1 items-center justify-center bg-neutral-900">
                <div className="flex flex-col items-center gap-4 text-center px-10">

                    <Images src="/NF.svg" alt="Logotipo" className="bg-black" width="120px" height="120px" />

                    {!isVerifyEmail && (
                        <>
                            <h2 className="text-2xl font-semibold">
                                {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
                            </h2>

                            <p className="text-neutral-400 text-sm max-w-sm">
                                {isLogin
                                    ? "Accede a tu cuenta y continúa donde lo dejaste."
                                    : "Regístrate y empieza a usar la plataforma en segundos."}
                            </p>
                        </>
                    )}

                </div>
            </div>

            <div className="flex flex-1 items-center justify-center md:p-6">
                <div className="w-full md:h-auto h-full max-w bg-neutral-900 md:rounded-2xl shadow-xl p-6 flex flex-col gap-5">

                    <div className="flex flex-col items-center gap-3 md:hidden">
                        <Images src="/NF.svg" alt="Logotipo" className="bg-black" width="90px" height="90px" />
                        <h1 className="hidden md:flex text-xl font-semibold text-center">
                            {isLogin ? "Hola de nuevo" : "Únete ahora"}
                        </h1>
                    </div>

                    {isVerifyEmail ? (
                        <VerifyEmail />
                    ) : isLogin ? (
                        <Login />
                    ) : (
                        <Register callback={setMode} />
                    )}

                    {!isVerifyEmail && (
                        <p className="text-center text-sm text-neutral-400">
                            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                            <span
                                className="text-red-500 cursor-pointer hover:underline"
                                onClick={() => setMode(isLogin ? "register" : "login")}
                            >
                                {isLogin ? "Crear cuenta" : "Iniciar sesión"}
                            </span>
                        </p>
                    )}

                    {isLogin && !isVerifyEmail && (
                        <>
                            <div className="flex items-center gap-3 text-neutral-500 text-sm">
                                <div className="flex-1 h-px bg-neutral-700"></div>
                                o
                                <div className="flex-1 h-px bg-neutral-700"></div>
                            </div>

                            <a href="/api/users/auth" className="flex items-center justify-center gap-3 bg-white text-black rounded-lg py-3 font-medium hover:bg-neutral-200 transition cursor-pointer">
                                <Images
                                    src="/Google.svg"
                                    alt="Google"
                                    width="20px"
                                    height="20px"
                                />
                                Continuar con Google
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;