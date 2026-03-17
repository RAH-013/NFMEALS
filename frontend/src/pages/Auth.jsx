import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Auth() {
    const [mode, setMode] = useState("login");

    const isLogin = mode === "login";

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white sm:px-2 sm:py-6">

            <div className="w-full h-screen sm:h-auto sm:max-w-md mx-auto bg-neutral-900 sm:rounded-2xl shadow-xl p-6 sm:p-5 flex flex-col gap-5">

                <div className="flex flex-col items-center gap-3">
                    <img
                        className="w-20 sm:w-22"
                        src="/NF.svg"
                        alt="Logotipo"
                    />

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
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5"
                            />
                            Continuar con Google
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Auth;