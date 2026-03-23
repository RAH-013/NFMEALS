import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SwalCustom } from "../utils/modal";

import { apiVerifyEmail, apiVerifyEmailToken } from "../api/auth";

function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();

    const search = location?.search || "";

    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const params = new URLSearchParams(search);
    const token = params.get("token");

    useEffect(() => {
        if (!token) return;

        const verify = async () => {
            try {
                setStatus("loading");

                // Endpoint real para validar token
                const res = await apiVerifyEmailToken(token);

                if (!res) throw new Error("Token inválido");

                setStatus("success");

                SwalCustom({
                    icon: "success",
                    message: "Correo verificado",
                    autoclose: true,
                    callback: () => navigate("/authenticate"),
                });
            } catch (err) {
                console.error(err);
                setStatus("error");
            }
        };

        verify();
    }, [token, navigate]);

    const handleSendEmail = async () => {
        try {
            setStatus("loading");

            const res = await apiVerifyEmail();

            if (!res) throw new Error("Error al enviar correo");

            SwalCustom({
                icon: "success",
                message: "Correo enviado",
                autoclose: true,
            });


            setStatus("idle");
        } catch (err) {
            console.error(err);
            SwalCustom({
                icon: "error",
                message: "No se pudo enviar el correo",
                autoclose: true,
            });
            setStatus("error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center gap-5">

            {/* Icono dinámico */}
            <div className={`transition-all duration-300 
        ${status === "loading" ? "animate-spin" : ""} 
        ${status === "success" ? "text-green-400" : ""} 
        ${status === "error" ? "text-red-400" : ""}`}
            >
                {status === "loading" && (
                    <div className="w-7 h-7 border-2 border-neutral-600 border-t-red-600 rounded-full"></div>
                )}
                {status === "success" && <span className="text-2xl">✓</span>}
                {status === "error" && <span className="text-2xl">✕</span>}
            </div>

            {/* Mensaje dinámico */}
            <p className="text-sm font-medium tracking-wide">
                {!token && status === "idle" && "Verifica tu correo"}
                {!token && status === "loading" && "Enviando correo"}
                {!token && status === "error" && "No se pudo enviar el correo"}

                {token && status === "loading" && "Verificando correo"}
                {token && status === "success" && "Correo verificado"}
                {token && status === "error" && "Enlace inválido o expirado"}
            </p>

            {/* Subtexto */}
            {!token && status === "idle" && (
                <span className="text-xs text-neutral-500">
                    Te enviaremos un enlace para verificar tu cuenta
                </span>
            )}
            {!token && status === "loading" && (
                <span className="text-xs text-neutral-500">
                    Esto tomará unos segundos
                </span>
            )}
            {token && status === "loading" && (
                <span className="text-xs text-neutral-500">
                    Esto tomará solo un momento
                </span>
            )}

            {/* Botón enviar correo */}
            {!token && (
                <button
                    onClick={handleSendEmail}
                    disabled={status === "loading"}
                    className="text-sm text-red-500 hover:text-red-400 transition disabled:opacity-50"
                >
                    {status === "loading" ? "Enviando..." : "Enviar correo de verificación"}
                </button>
            )}

            {/* Error con token */}
            {token && status === "error" && (
                <button
                    onClick={() => navigate("/authenticate")}
                    className="text-xs text-red-500 hover:text-red-400 transition"
                >
                    Volver
                </button>
            )}
        </div>
    );
}

export default VerifyEmail;