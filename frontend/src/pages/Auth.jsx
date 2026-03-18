import { useState } from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import Login from "../components/Login";
import Register from "../components/Register";
import Images from "../layouts/Images";

function Auth() {
    const [mode, setMode] = useState("login");

    const isLogin = mode === "login";

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white sm:px-2 sm:py-6">

            <Link
                className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 text-red-700 cursor-pointer rounded hover:bg-neutral-700"
                to="/"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
                Regresar
            </Link>

            <div className="w-full h-screen sm:h-auto sm:max-w-md mx-auto bg-neutral-900 sm:rounded-2xl shadow-xl p-6 sm:p-5 flex flex-col gap-5">

                <div className="flex flex-col items-center gap-3">
                    <Images src="/NF.svg" alt="Logotipo" width="90px" height="90px" />

                    <h1 className="text-xl sm:text-xl font-semibold text-center">
                        {isLogin ? "Hola de nuevo" : "Únete ahora"}
                    </h1>
                </div>

                {isLogin ? <Login /> : <Register />}

                <p className="text-center text-xs sm:text-sm text-neutral-400">
                    {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                    <span
                        className="text-red-500 cursor-pointer hover:underline"
                        onClick={() => setMode(isLogin ? "register" : "login")}
                    >
                        {isLogin ? "Crear cuenta" : "Iniciar sesión"}
                    </span>
                </p>

                {isLogin && (
                    <>
                        <div className="flex items-center gap-3 text-neutral-500 text-xs sm:text-sm">
                            <div className="flex-1 h-px bg-neutral-700"></div>
                            o
                            <div className="flex-1 h-px bg-neutral-700"></div>
                        </div>

                        <button className="flex items-center justify-center gap-3 bg-white text-black rounded-lg py-3 font-medium hover:bg-neutral-200 transition cursor-pointer">
                            <Images src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20px" height="20px" />
                            Continuar con Google
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Auth;