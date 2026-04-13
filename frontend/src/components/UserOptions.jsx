import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faArrowRightFromBracket,
    faArrowRightLong,
    faCartShopping,
    faUser,
    faXmark
} from "@fortawesome/free-solid-svg-icons"
import { useContext, useState, useEffect, useRef } from "react"
import { UserContext } from "../context/User"
import { SwalCustom } from "../utils/modal"

import Menu from "../layouts/Menu"
import ProfileImage from "../components/ProfileImage"

function UserOptions() {
    const { user, loading, logout } = useContext(UserContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const { pathname } = useLocation()

    const linkClass = (path) =>
        `w-full px-5 py-4 rounded-xl font-semibold text-lg flex justify-between items-center 
        bg-neutral-900 border border-neutral-700 transition hover:border-neutral-500 hover:bg-neutral-800 active:scale-95
        ${pathname.startsWith(path) ? "text-red-400" : "hover:text-red-400"}`

    useEffect(() => {
        if (!menuOpen) return

        const isMobile = window.matchMedia("(max-width: 768px)").matches
        if (isMobile) return

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [menuOpen])

    if (loading) return <span className="text-red-800">Cargando</span>

    return (
        <div className="flex items-center gap-4 relative" ref={menuRef}>
            {user ? (
                <>
                    {user.role === "customer" && (
                        <Link
                            to="/carrito"
                            className="flex items-center gap-1 hover:text-red-400 transition"
                        >
                            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                        </Link>
                    )}

                    <button
                        type="button"
                        onClick={() => setMenuOpen(prev => !prev)}
                        className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-slate-400 border-2 border-slate-500 outline-4 outline-transparent hover:outline-slate-100/25 transition flex items-center justify-center text-white font-bold overflow-hidden cursor-pointer"
                    >
                        <ProfileImage user={user} />
                    </button>

                    <Menu
                        className={"md:bg-neutral-700"}
                        open={menuOpen}
                        onClose={() => setMenuOpen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 text-3xl md:hidden hover:text-red-400 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>

                        <div className="flex flex-col items-center gap-3">
                            <ProfileImage user={user} big />

                            <h3 className="text-xl font-semibold">
                                ¡Hola{user.name && ", " + user.name}!
                            </h3>

                            <span className="text-sm text-gray-400 text-center break-all">
                                {user.email}
                            </span>
                        </div>

                        <div className="w-full flex flex-col gap-5 max-w-sm mt-4">
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className={linkClass("/profile")}
                            >
                                Perfil
                                <span className="text-gray-400">
                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                </span>
                            </Link>

                            {user.role === "admin" && (
                                <Link
                                    to="/admin"
                                    onClick={() => setMenuOpen(false)}
                                    className={linkClass("/admin")}
                                >
                                    Admin
                                    <span className="text-gray-400">
                                        <FontAwesomeIcon icon={faArrowRightLong} />
                                    </span>
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    setMenuOpen(false)
                                    SwalCustom({
                                        icon: "warning",
                                        message: "¿Deseas cerrar sesión?",
                                        onConfirmAction: logout
                                    })
                                }}
                                className="w-full px-5 py-4 rounded-xl font-semibold text-lg flex cursor-pointer justify-between items-center bg-red-700 border border-red-800 transition hover:border-red-600 hover:bg-red-900 active:scale-95"
                            >
                                Cerrar sesión
                                <span className="text-gray-400">
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                </span>
                            </button>
                        </div>
                    </Menu>
                </>
            ) : (
                <Link
                    to="/authenticate"
                    className="px-3 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition flex items-center gap-2 text-sm font-medium"
                >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Iniciar sesión</span>
                </Link>
            )}
        </div>
    )
}

export default UserOptions