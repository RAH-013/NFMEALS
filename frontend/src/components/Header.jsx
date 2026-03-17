import { useState, useEffect, useCallback } from "react"
import { useLocation, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"

const navLinks = [
    { label: "Menu", id: "1" },
    { label: "Como funciona", id: "2" },
    { label: "Nosotros", id: "3" },
    { label: "Comunidad", id: "testimonials", isButton: true }
]

function Header() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hover, setHover] = useState(false)
    const [activeSection, setActiveSection] = useState(null)

    const { pathname, hash } = useLocation()
    const isHome = pathname === "/"
    const iconBtn = "p-2 rounded-lg transition duration-200 text-lg"

    const iconClass = (path) =>
        pathname === path
            ? `${iconBtn} text-red-400 pointer-events-none`
            : `${iconBtn} hover:bg-white/10`

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 10)

        if (!isHome) return
        let current = null
        for (const { id } of navLinks) {
            const el = document.getElementById(id)
            if (el && window.scrollY + 100 >= el.offsetTop) {
                current = id
            }
        }
        setActiveSection(current)
    }, [isHome])

    useEffect(() => {
        if (isHome) {
            handleScroll()
            window.addEventListener("scroll", handleScroll)
        } else {
            setActiveSection(null)
        }

        // Detectar hash al cargar o navegar desde otra página
        if (hash) {
            const id = hash.replace("#", "")
            setActiveSection(id)
            if (isHome) {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
        }

        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll, isHome, hash])

    const headerStyle = scrolled && !hover
        ? "md:bg-black/40 md:backdrop-blur-md"
        : "bg-linear-65 from-black to-neutral-500"

    const goToSection = (id) => {
        if (pathname !== "/") {
            window.location.href = `/#${id}`
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            setActiveSection(id)
        }
        setOpen(false)
    }

    const renderNavLink = ({ label, id, isButton }) => {
        const active = activeSection === id
        const classes = active ? "text-red-400 font-semibold" : "hover:text-red-400 transition cursor-pointer"

        return isButton ? (
            <button key={id} onClick={() => goToSection(id)} className={classes}>{label}</button>
        ) : (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={classes}>{label}</a>
        )
    }

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
                        <span className="text-2xl font-bold text-white">Meals</span>
                    </>
                ) : (
                    <Link to="/" className="flex items-center gap-1">
                        <img className="size-20" src="/NF.svg" alt="Logotipo" />
                        <span className="text-2xl font-bold text-white">Meals</span>
                    </Link>
                )}
            </div>

            <nav className="hidden md:flex gap-6 text-white items-center">
                {navLinks.map(renderNavLink)}
                <Link to="/carrito" className={iconClass("/carrito")}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </Link>
                <Link to="/account" className={iconClass("/account")}>
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </nav>

            <button className="md:hidden hover:text-red-400 text-3xl text-white cursor-pointer" onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-10 z-50 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <button className="absolute top-6 right-6 text-3xl cursor-pointer hover:text-red-400 transition" onClick={() => setOpen(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <nav className="flex flex-col items-center gap-8 text-2xl">
                    {navLinks.map(renderNavLink)}
                    <div className="flex gap-6 text-3xl mt-4">
                        <Link to="/carrito" onClick={() => setOpen(false)} className={iconClass("/carrito")}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>
                        <Link to="/account" onClick={() => setOpen(false)} className={iconClass("/account")}>
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header