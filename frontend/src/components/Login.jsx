import { useContext, useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { apiAuth } from "../api/auth"
import { UserContext } from "../context/User"

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

        await Swal.fire({
            icon: "success",
            title: "Autenticación Exitosa",
            text: "Redirigiendo...",
            confirmButtonColor: "#ef4444",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        login(data.token)
        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-neutral-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
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