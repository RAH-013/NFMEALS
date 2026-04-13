import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SwalCustom } from "../utils/modal";
import { apiVerifyEmail, apiVerifyEmailToken } from "../api/auth";

export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const search = location?.search || "";

    const [status, setStatus] = useState("idle");

    const params = new URLSearchParams(search);
    const token = params.get("token");

    useEffect(() => {
        if (!token) return;

        const verify = async () => {
            try {
                setStatus("loading");
                const res = await apiVerifyEmailToken(token);
                if (!res) throw new Error();

                setStatus("success");
                SwalCustom({
                    icon: "success",
                    message: "Correo verificado",
                    autoclose: true,
                    callback: () => navigate("/authenticate"),
                });
            } catch {
                setStatus("error");
            }
        };

        verify();
    }, [token, navigate]);

    const handleSendEmail = async () => {
        try {
            setStatus("loading");
            const res = await apiVerifyEmail();
            if (!res) throw new Error();

            setStatus("success");
            SwalCustom({
                icon: "success",
                message: "Correo enviado. Por seguridad, esta pestaña se cerrará.",
                autoclose: true,
                callback: () => window.close(),
            });
        } catch {
            SwalCustom({
                icon: "error",
                message: "No se pudo enviar el correo",
                autoclose: true,
            });
            setStatus("idle");
        }
    };

    const getMessage = () => {
        if (!token && status === "idle") return "Verifica tu correo";
        if (!token && status === "loading") return "Enviando correo...";
        if (!token && status === "success") return "¡Revisa tu bandeja!";
        if (!token && status === "error") return "No se pudo enviar";

        if (token && status === "loading") return "Verificando correo";
        if (token && status === "success") return "Correo verificado";
        if (token && status === "error") return "Enlace inválido o expirado";
    };

    return (
        <div className="w-full min-h-80 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-center gap-6 transition-all duration-300">
            <div
                className={`w-20 h-20 flex items-center justify-center rounded-full bg-neutral-800 transition-all duration-300 shadow-inner
          ${status === "loading" ? "animate-pulse" : ""}`}
            >
                {status === "loading" && (
                    <div className="w-10 h-10 border-4 border-neutral-700 border-t-red-500 rounded-full animate-spin"></div>
                )}
                {status === "success" && (
                    <span className="text-4xl text-green-400">✓</span>
                )}
                {status === "error" && (
                    <span className="text-4xl text-red-400">✕</span>
                )}
                {status === "idle" && (
                    <span className="text-3xl">✉️</span>
                )}
            </div>

            <div className="flex flex-col gap-2 min-h-15 w-full">
                <h1 className="text-xl font-semibold text-white tracking-wide">
                    {getMessage()}
                </h1>

                {/* Textos para el flujo sin token (Solicitar correo) */}
                {!token && status === "idle" && (
                    <p className="text-sm text-neutral-400 px-2">
                        ¡Gracias por unirte! Solicita tu correo de confirmación para activar tu cuenta.
                    </p>
                )}
                {!token && status === "loading" && (
                    <p className="text-sm text-neutral-500">
                        Esto tomará unos segundos...
                    </p>
                )}
                {!token && status === "success" && (
                    <p className="text-sm text-neutral-400">
                        Puedes cerrar esta pestaña y continuar desde tu correo.
                    </p>
                )}

                {token && status === "loading" && (
                    <p className="text-sm text-neutral-500">
                        Validando enlace de seguridad...
                    </p>
                )}
                {token && status === "success" && (
                    <p className="text-sm text-neutral-400">
                        Redirigiendo al sistema...
                    </p>
                )}
                {token && status === "error" && (
                    <p className="text-sm text-neutral-400">
                        El enlace ha expirado o es incorrecto.
                    </p>
                )}
            </div>

            <div className="w-full flex justify-center min-h-11">
                {!token && status !== "success" && (
                    <button
                        onClick={handleSendEmail}
                        disabled={status === "loading"}
                        className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:scale-95 transition-all duration-200 text-white text-sm font-medium shadow-lg hover:shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center"
                    >
                        {status === "loading"
                            ? "Enviando..."
                            : "Enviar correo de verificación"}
                    </button>
                )}

                {token && status === "error" && (
                    <button
                        onClick={() => navigate("/authenticate")}
                        className="px-6 py-2.5 rounded-lg border border-neutral-700 hover:border-red-500 text-sm font-medium text-neutral-300 hover:text-red-400 transition-all duration-200 cursor-pointer"
                    >
                        Volver al inicio
                    </button>
                )}
            </div>
        </div>
    );
}