import { useContext, useEffect, useState, useMemo, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong, faXmark, faCircleDot } from "@fortawesome/free-solid-svg-icons"

import { UserContext } from "../context/User"
import { apiMeProfile } from "../api/users"

import Menu from "../layouts/Menu"
import ProfileSections from "../components/ProfileSections"

const SECTIONS = [
    { id: "account", label: "Cuenta", color: "bg-blue-500", textHover: "hover:text-red-400", fields: ["email"] },
    { id: "profile", label: "Perfil", color: "bg-green-500", textHover: "hover:text-green-400", fields: ["name", "lastname", "phoneNumber"] },
    { id: "address", label: "Dirección", color: "bg-amber-500", textHover: "hover:text-amber-400", fields: ["street", "exteriorNumber", "interiorNumber", "neighborhood", "postalCode", "municipality", "city", "state", "country"] },
];

function Profile() {
    const { user } = useContext(UserContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const [form, setForm] = useState({})
    const [initialData, setInitialData] = useState({})
    const [passwords, setPasswords] = useState({ prevPassword: "", password: "", confirmPassword: "" })

    const activeSection = useMemo(() => {
        const tab = searchParams.get("tab")
        const validSections = SECTIONS.map(s => s.id)
        return [...validSections, "danger"].includes(tab) ? tab : "account"
    }, [searchParams])

    const sectionsWithChanges = useMemo(() => {
        const changed = new Set();
        Object.keys(form).forEach(key => {
            if (form[key] !== initialData[key]) {
                const section = SECTIONS.find(s => s.fields?.includes(key));
                if (section) changed.add(section.id);
            }
        });
        if (passwords.password || passwords.prevPassword) changed.add("account");
        return Array.from(changed);
    }, [form, initialData, passwords]);

    useEffect(() => {
        if (!user) return

        const fetchData = async () => {
            try {
                const response = await apiMeProfile()
                const data = response.data

                const merged = { ...data, ...user }

                setForm(merged)
                setInitialData(merged)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user?.id])

    const handleSectionChange = (sectionId) => {
        setOpen(false)
        setSearchParams({ tab: sectionId })
    }

    if (!user) return <div className="p-10 text-gray-400 flex justify-center items-center h-screen text-xl">Inicia sesión para ver tu perfil</div>

    return (
        <div className="bg-neutral-950 text-white flex md:flex-row h-[calc(100vh-5rem)] overflow-hidden">

            <aside className="hidden md:flex md:w-64 border-r border-neutral-800 p-4 md:p-6 flex-col shrink-0">
                <nav className="mt-6 flex md:flex-col gap-2 text-sm">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => handleSectionChange(section.id)}
                            className={`cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === section.id
                                ? "bg-white/10 text-white font-medium shadow-sm"
                                : "text-neutral-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${section.color} ${sectionsWithChanges.includes(section.id) ? "animate-pulse ring-2 ring-white/20" : ""}`}></span>
                                {section.label}
                            </div>
                            {sectionsWithChanges.includes(section.id) && (
                                <FontAwesomeIcon icon={faCircleDot} className="text-[10px] text-orange-500" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto border-t border-neutral-800 pt-4">
                    <button
                        onClick={() => handleSectionChange("danger")}
                        className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl w-full transition ${activeSection === "danger"
                            ? "bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm"
                            : "text-red-500 hover:bg-red-500/10"
                            }`}
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Eliminar cuenta
                    </button>
                </div>
            </aside>

            <ProfileSections
                loading={loading}
                form={form}
                setForm={setForm}
                initialData={initialData}
                setInitialData={setInitialData}
                passwords={passwords}
                setPasswords={setPasswords}
                activeSection={activeSection}
                sectionsWithChanges={sectionsWithChanges}
                setOpen={setOpen}
                searchParams={searchParams}
            />

            <Menu open={open} onClose={() => setOpen(false)}>
                <button className="absolute top-6 right-6 text-3xl text-neutral-400 hover:text-white transition" onClick={() => setOpen(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className="flex flex-col items-center justify-center h-full text-white w-full px-6">
                    <nav className="flex flex-col gap-4 w-full max-w-sm">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => handleSectionChange(section.id)}
                                className={`w-full px-5 py-4 rounded-xl font-medium text-lg flex justify-between items-center transition active:scale-95 ${activeSection === section.id
                                    ? "bg-neutral-800 border-neutral-600 border"
                                    : "bg-neutral-900 border border-neutral-800 hover:bg-neutral-800"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${section.color}`}></span>
                                    {section.label}
                                </div>
                                <div className="flex items-center gap-3">
                                    {sectionsWithChanges.includes(section.id) && (
                                        <FontAwesomeIcon icon={faCircleDot} className="text-orange-500 text-sm" />
                                    )}
                                    <span className={section.textHover}>
                                        <FontAwesomeIcon icon={faArrowRightLong} />
                                    </span>
                                </div>
                            </button>
                        ))}

                        <button
                            onClick={() => handleSectionChange("danger")}
                            className={`w-full mt-4 px-5 py-4 rounded-xl font-medium text-lg flex justify-between items-center transition active:scale-95 ${activeSection === "danger"
                                ? "bg-red-500/20 border border-red-500/40 text-red-300 shadow-sm"
                                : "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                Eliminar cuenta
                            </div>
                            <span className="text-red-500">
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </span>
                        </button>
                    </nav>
                </div>
            </Menu>
        </div>
    )
}

export default Profile