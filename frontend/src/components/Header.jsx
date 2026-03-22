import { useState, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong, faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

import UserOptions from "./UserOptions"
import Images from "../layouts/Images"
import Menu from "../layouts/Menu"

const navLinks = [
    { label: "Menu", link: "/otra-pagina" },
    { label: "Como funciona", link: "#how-it-works" },
    { label: "Nosotros", link: "#about-us" },
    { label: "Comunidad", link: "#testimonials" }
]

function Header() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeElement, setActiveElement] = useState(null)
    const { pathname, hash } = useLocation()
    const navigate = useNavigate()
    const isHome = pathname === "/"

    useEffect(() => {
        if (!isHome) setActiveElement(null)
    }, [isHome])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
            if (!isHome) return

            let current = null
            navLinks.forEach(link => {
                if (!link.link.startsWith("#")) return
                const id = link.link.replace("#", "")
                const el = document.getElementById(id)
                if (el && window.scrollY + 100 >= el.offsetTop) current = id
            })
            setActiveElement(current)
        }

        if (isHome) window.addEventListener("scroll", handleScroll)
        handleScroll()

        if (hash) {
            const id = hash.replace("#", "")
            setActiveElement(id)

            if (isHome) {
                const el = document.getElementById(id)
                if (el) {
                    const offset = document.querySelector("header")?.offsetHeight || 0
                    window.scrollTo({
                        top: el.getBoundingClientRect().top + window.scrollY - offset,
                        behavior: "smooth"
                    })
                }
            }
        }

        return () => window.removeEventListener("scroll", handleScroll)
    }, [isHome, hash])

    const goTo = (link) => {
        setOpen(false)
        if (!link) return

        if (link.startsWith("/")) {
            navigate(link)
        } else if (link.startsWith("#")) {
            const id = link.replace("#", "")
            if (!isHome) return navigate("/" + link)

            const el = document.getElementById(id)
            if (!el) return

            const offset = document.querySelector("header")?.offsetHeight || 0
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - offset,
                behavior: "smooth"
            })

            setActiveElement(id)
        }
    }

    const headerClass = scrolled
        ? "bg-black/40 backdrop-blur-md sticky top-0 z-50 flex justify-between px-4 items-center transition-all duration-300"
        : "bg-linear-65 from-black to-neutral-500 sticky top-0 z-50 flex justify-between px-4 items-center transition-all duration-300"

    const linkClass = (link) => {
        if (link.startsWith("/")) {
            return pathname === link
                ? "text-red-400 font-semibold"
                : "hover:text-red-400 transition cursor-pointer"
        }

        return isHome && activeElement === link.replace("#", "")
            ? "text-red-400 font-semibold"
            : "hover:text-red-400 transition cursor-pointer"
    }

    return (
        <header className={headerClass}>
            <div className="flex gap-1 items-center">
                {isHome ? (
                    <>
                        <Images src="/NF.svg" alt="Logotipo" width="80px" height="80px" objectFit="contain" />
                        <span className="text-2xl font-bold text-white">Meals</span>
                    </>
                ) : (
                    <Link to="/" className="flex items-center gap-1">
                        <Images src="/NF.svg" alt="Logotipo" width="80px" height="80px" objectFit="contain" />
                        <span className="text-2xl font-bold text-white">Meals</span>
                    </Link>
                )}
            </div>

            <nav className="hidden md:flex gap-6 text-white items-center">
                {navLinks.map(({ label, link }) => (
                    <button key={label} onClick={() => goTo(link)} className={linkClass(link)}>
                        {label}
                    </button>
                ))}
                <UserOptions />
            </nav>

            <div className="flex items-center gap-4 md:hidden">
                <UserOptions />

                <button
                    className="hover:text-red-400 text-3xl text-white cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            <Menu open={open} onClose={() => setOpen(false)}>
                <button
                    className="absolute top-6 right-6 text-3xl hover:text-red-400 transition"
                    onClick={() => setOpen(false)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className="flex flex-col items-center justify-center h-full text-white w-full">

                    <div className="flex flex-col items-center gap-2 mb-10">
                        <Images src="/NF.svg" alt="Logotipo" width="100px" height="100px" objectFit="contain" />
                    </div>

                    <nav className="flex flex-col gap-5 w-full max-w-sm">
                        {navLinks.map(({ label, link }) => (
                            <button
                                key={label}
                                onClick={() => goTo(link)}
                                className={`w-full px-5 py-4 rounded-xl font-semibold text-lg flex justify-between items-center bg-neutral-900 border border-neutral-700 transition hover:border-neutral-500 hover:bg-neutral-800 active:scale-95 ${linkClass(link)}`}
                            >
                                {label}
                                <span className="text-gray-400">
                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>
            </Menu>
        </header>
    )
}

export default Header