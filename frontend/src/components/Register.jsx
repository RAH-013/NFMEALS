import { useState, useRef, useEffect } from "react"
import { apiCreate } from "../api/auth"
import { SwalCustom } from "../utils/modal"

import Swal from "sweetalert2"
import "altcha"
import "altcha/i18n/es-419"

function Register({ callback }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [captcha, setCaptcha] = useState(null)

    const altchaRef = useRef(null)

    useEffect(() => {
        const el = altchaRef.current
        const handler = (ev) => {
            if (ev.detail) setCaptcha(ev.detail.payload || null)
        }
        el?.addEventListener("statechange", handler)
        return () => el?.removeEventListener("statechange", handler)
    }, [])

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const validatePassword = (password) =>
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)

    const isFormValid =
        email &&
        password &&
        confirmPassword &&
        captcha &&
        validateEmail(email) &&
        validatePassword(password) &&
        password === confirmPassword

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { success, data, error } = await apiCreate({
            email,
            password,
            captcha
        })

        if (!success) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: error?.message || "Registro Fallido",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            })
            return
        }

        SwalCustom({
            icon: "success",
            message: "Registro exitoso",
            autoclose: true,
            callback: () => callback("login")
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <input
                    autoComplete="off"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-neutral-800 rounded-lg px-4 py-3 outline-none focus:ring-2 
                        ${email && !validateEmail(email) ? "focus:ring-yellow-400 border border-yellow-400" : "focus:ring-red-500"}`}
                />
                {email && !validateEmail(email) && (
                    <span className="text-yellow-400 text-sm">
                        Formato de correo inválido
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <input
                    autoComplete="off"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`bg-neutral-800 rounded-lg px-4 py-3 outline-none focus:ring-2 
                        ${password && !validatePassword(password) ? "focus:ring-yellow-400 border border-yellow-400" : "focus:ring-red-500"}`}
                />
                {password && !validatePassword(password) && (
                    <span className="text-yellow-400 text-sm">
                        La contraseña debe tener mínimo 8 caracteres, al menos una letra y un número
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <input
                    autoComplete="off"
                    type="password"
                    placeholder="Confirma Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`bg-neutral-800 rounded-lg px-4 py-3 outline-none focus:ring-2 
                        ${confirmPassword && confirmPassword !== password ? "focus:ring-yellow-400 border border-yellow-400" : "focus:ring-red-500"}`}
                />
                {confirmPassword && confirmPassword !== password && (
                    <span className="text-yellow-400 text-sm">
                        Las contraseñas no coinciden
                    </span>
                )}
            </div>

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
                Registrarse
            </button>
        </form>
    )
}

export default Register