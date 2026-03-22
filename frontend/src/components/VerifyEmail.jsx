import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { apiVerifyCode, apiResendCode } from "../api/auth"

function VerifyEmail() {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [loading, setLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState(300)

    useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`).focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const fullCode = code.join("")

        if (fullCode.length !== 6) {
            Swal.fire("Error", "Ingresa el código completo", "error")
            return
        }

        try {
            setLoading(true)
            const { success } = await apiVerifyCode({ code: fullCode })

            if (success) {
                Swal.fire("Éxito", "Correo verificado correctamente", "success")
            } else {
                Swal.fire("Error", "Código inválido", "error")
            }

        } catch (error) {
            console.error(error)
            Swal.fire("Error", "Error en el servidor", "error")
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        try {
            await apiResendCode()
            setTimeLeft(300)
            Swal.fire("Enviado", "Nuevo código enviado", "success")
        } catch (error) {
            console.error(error)
            Swal.fire("Error", "No se pudo reenviar el código", "error")
        }
    }

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s.toString().padStart(2, "0")}`
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-neutral-900 p-8 rounded-2xl shadow-lg flex flex-col gap-6 w-full max-w-sm"
            >
                <h2 className="text-white text-xl font-semibold text-center">
                    Verifica tu correo
                </h2>

                <p className="text-neutral-400 text-sm text-center">
                    Ingresa el código de 6 dígitos enviado a tu correo
                </p>

                <div className="flex justify-between gap-2">
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            id={`code-${i}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            className="w-12 h-12 text-center text-white bg-neutral-800 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-lg"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-900 transition rounded-lg py-3 font-semibold cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Verificando..." : "Verificar"}
                </button>

                <div className="text-center text-sm text-neutral-400">
                    {timeLeft > 0 ? (
                        <span>Reenviar código en {formatTime(timeLeft)}</span>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-red-500 hover:underline"
                        >
                            Reenviar código
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default VerifyEmail