import { useState, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"

import UserOptions from "./UserOptions"
import Images from "../layouts/Images"

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
        ? "md:bg-black/40 md:backdrop-blur-md sticky top-0 z-50 flex justify-between px-4 items-center transition-all duration-300"
        : "bg-linear-65 from-black to-neutral-500 sticky top-0 z-50 flex justify-between px-4 items-center transition-all duration-300"


    const linkClass = (link) => {
        if (link.startsWith("/")) return pathname === link ? "text-red-400 font-semibold" : "hover:text-red-400 transition cursor-pointer"
        return isHome && activeElement === link.replace("#", "") ? "text-red-400 font-semibold" : "hover:text-red-400 transition cursor-pointer"
    }

    return (
        <header className={headerClass}>
            <div className="flex gap-1 items-center">
                {isHome ? (
                    <>
                        <Images
                            src="/NF.svg"
                            alt="Logotipo"
                            width="80px"
                            height="80px"
                            objectFit="contain"
                        />
                        <span className="text-2xl font-bold text-white">Meals</span>
                    </>
                ) : (
                    <Link to="/" className="flex items-center gap-1">
                        <Images
                            src="/NF.svg"
                            alt="Logotipo"
                            width="80px"
                            height="80px"
                            objectFit="contain"
                        />
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

            <button className="md:hidden hover:text-red-400 text-3xl text-white cursor-pointer" onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-10 z-50 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <button className="absolute top-6 right-6 text-3xl cursor-pointer hover:text-red-400 transition" onClick={() => setOpen(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <nav className="flex flex-col items-center gap-8 text-2xl">
                    {navLinks.map(({ label, link }) => (
                        <button key={label} onClick={() => goTo(link)} className={linkClass(link)}>
                            {label}
                        </button>
                    ))}
                    <div className="flex gap-6 text-3xl mt-4">
                        <UserOptions />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header