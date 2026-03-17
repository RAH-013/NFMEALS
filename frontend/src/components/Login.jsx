import React from 'react'

function Login() {
    return (
        <form className="flex flex-col gap-4">
            <input
                type="email"
                placeholder="Correo electrónico"
                className="bg-neutral-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
                type="password"
                placeholder="Contraseña"
                className="bg-neutral-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
                type="submit"
                className="bg-red-500 hover:bg-red-900 transition rounded-lg py-3 font-semibold cursor-pointer"
            >
                Iniciar Sesión
            </button>
        </form>
    )
}

export default Login