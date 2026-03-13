import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"

function Header() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hover, setHover] = useState(false)

    const { pathname } = useLocation()

    const close = () => setOpen(false)

    const iconBtn = "p-2 rounded-lg transition duration-200 text-lg"

    const linkClass = (path) =>
        pathname === path
            ? "text-green-400 pointer-events-none"
            : "hover:text-green-400 transition"

    const iconClass = (path) =>
        pathname === path
            ? `${iconBtn} text-green-400 pointer-events-none`
            : `${iconBtn} hover:bg-white/10`

    const isHome = pathname === "/"

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const headerStyle =
        scrolled && !hover
            ? "md:bg-black/40 md:backdrop-blur-md"
            : "bg-linear-65 from-black to-neutral-500"

    return (
        <header
            className={`sticky top-0 z-50 flex justify-between px-4 items-center transition-all duration-300 ${headerStyle}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            <div className="flex gap-1 items-center">
                {isHome ? (
                    <>
                        <img className="size-20" src="/NF.svg" alt="Logotipo" />
                        <span className="text-2xl font-bold text-green-600">Meals</span>
                    </>
                ) : (
                    <Link to="/" className="flex items-center gap-1">
                        <img className="size-20" src="/NF.svg" alt="Logotipo" />
                        <span className="text-2xl font-bold text-green-600">Meals</span>
                    </Link>
                )}
            </div>

            <nav className="hidden md:flex gap-6 text-white items-center">
                <a className="hover:text-green-400 transition" href="#1">Menu</a>
                <a className="hover:text-green-400 transition" href="#2">Como funciona</a>
                <a className="hover:text-green-400 transition" href="#3">Nosotros</a>
                <a className="hover:text-green-400 transition" href="#4">Comunidad</a>

                <Link to="/carrito" className={iconClass("/carrito")}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </Link>

                <Link to="/account" className={iconClass("/account")}>
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </nav>

            <button
                className="md:hidden hover:text-green-400 text-3xl text-white cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div
                className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-10 z-50 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >

                <button
                    className="absolute top-6 right-6 text-3xl cursor-pointer hover:text-green-400 transition"
                    onClick={close}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <nav className="flex flex-col items-center gap-8 text-2xl">
                    <a href="#1" onClick={close}>Menu</a>
                    <a href="#2" onClick={close}>Como funciona</a>
                    <a href="#3" onClick={close}>Nosotros</a>
                    <a href="#4" onClick={close}>Comunidad</a>

                    <div className="flex gap-6 text-3xl mt-4">
                        <Link to="/carrito" onClick={close} className={iconClass("/carrito")}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>

                        <Link to="/account" onClick={close} className={iconClass("/account")}>
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </div>
                </nav>

            </div>

        </header>
    )
}

export default Header