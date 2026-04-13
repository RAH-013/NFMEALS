import { useContext, useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiAuth } from "../api/auth"
import { UserContext } from "../context/User"
import { SwalCustom } from "../utils/modal"

import InputField from "../layouts/InputField"
import Swal from "sweetalert2"

import "altcha"
import "altcha/i18n/es-419"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState(null);

    const altchaRef = useRef(null);

    const navigate = useNavigate();

    const { login } = useContext(UserContext)

    useEffect(() => {
        const el = altchaRef.current

        const handler = (ev) => {
            if (ev.detail) {
                setCaptcha(ev.detail.payload || null)
            }
        }

        el?.addEventListener("statechange", handler)
        return () => el?.removeEventListener("statechange", handler)
    }, [])

    const isFormValid = email && password && captcha

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isFormValid) return

        const { success, data, error } = await apiAuth({
            email,
            password,
            captcha
        })

        if (!success) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: error?.message || "Autenticación Fallida",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            })
            return
        }

        login()

        SwalCustom({
            icon: "success",
            message: "Autenticación exitosa",
            autoclose: true,
            callback: () => navigate("/")
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
                name="email"
                autoComplete={true}
                type="email"
                label="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
                name="password"
                autoComplete={true}
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center">
                <altcha-widget
                    ref={altchaRef}
                    language="es-419"
                    challengeurl="/api/users/challenge"
                />
            </div>

            <button
                type="submit"
                disabled={!isFormValid}
                className={`rounded-lg py-3 font-semibold transition
                    ${isFormValid
                        ? "bg-red-500 hover:bg-red-900 cursor-pointer"
                        : "bg-neutral-700 cursor-not-allowed opacity-60"
                    }`}
            >
                Iniciar Sesión
            </button>
        </form>
    )
}

export default Login