import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

function InputField({
    name,
    type = "text",
    value,
    onChange,
    label,
    alert = false,
    autoComplete = false,
    disabled = false
}) {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === "password"
    const isPhone = type === "phone"
    const isCP = type === "cp"

    let inputType = type
    if (isPassword) inputType = showPassword ? "text" : "password"
    if (isPhone) inputType = "tel"
    if (isCP) inputType = "text"

    const alertStyles = alert
        ? "focus:ring-2 focus:ring-yellow-400 border-yellow-400"
        : "focus:ring-2 focus:ring-red-500 focus:border-red-500"

    const handleChange = (e) => {
        let newValue = e.target.value

        if (isPhone) {
            if (!newValue || newValue === "+52" || newValue === "+52 ") {
                newValue = ""
            } else {
                let rawValue = newValue.startsWith("+52")
                    ? newValue.substring(3)
                    : newValue

                const digits = rawValue.replace(/\D/g, "").slice(0, 10)

                if (digits.length > 0) {
                    newValue = "+52 "
                    if (digits.length <= 3) {
                        newValue += digits
                    } else if (digits.length <= 6) {
                        newValue += `${digits.slice(0, 3)} ${digits.slice(3)}`
                    } else {
                        newValue += `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
                    }
                } else {
                    newValue = ""
                }
            }
        }

        if (isCP) {
            const digits = newValue.replace(/\D/g, "").slice(0, 5)
            newValue = digits
        }

        if (onChange) {
            onChange({
                ...e,
                target: {
                    ...e.target,
                    name,
                    value: newValue
                }
            })
        }
    }

    return (
        <div className="relative">
            <input
                name={name}
                type={inputType}
                value={value ?? ""}
                onChange={handleChange}
                disabled={disabled}
                placeholder={label}
                autoComplete={autoComplete ? name : "new-password"}
                className={`peer w-full px-3 pt-6 pb-2 pr-10 bg-transparent border rounded-lg
                text-white placeholder-transparent
                selection:bg-red-500/70 selection:text-white
                focus:outline-none transition disabled:opacity-50
                ${alert ? "border-yellow-400" : "border-neutral-600"}
                ${alertStyles}
                [&::-ms-reveal]:hidden
                [&::-ms-clear]:hidden
                [&::-webkit-credentials-auto-fill-button]:hidden
                [&::-webkit-textfield-decoration-container]:hidden`}
            />

            <label
                className={`pointer-events-none absolute left-3 top-1 text-xs transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:top-1 peer-focus:text-xs
                ${alert ? "text-yellow-400 peer-focus:text-yellow-400" : "text-neutral-400 peer-focus:text-red-500"}`}
            >
                {label}
            </label>

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            )}
        </div>
    )
}

export default InputField