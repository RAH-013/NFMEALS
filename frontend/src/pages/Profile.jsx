import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/User"
import { SwalCustom } from "../utils/modal"
import ProfileImage from "../components/ProfileImage"

function Profile() {
    const { user } = useContext(UserContext)

    const [account, setAccount] = useState(null)
    const [address, setAddress] = useState(null)

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(true)

    const [activeSection, setActiveSection] = useState("account")

    const [editing, setEditing] = useState({
        account: false,
        address: false
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountData = {
                    email: user.email,
                    role: user.role,
                    name: user.name,
                    lastname: user.lastname,
                    profilePicture: user.profilePicture
                }

                const addressData = {
                    phoneNumber: "+52 33 1234 5678",
                    street: "Av. Siempre Viva",
                    exteriorNumber: "742",
                    interiorNumber: "",
                    neighborhood: "Centro",
                    city: "Guadalajara",
                    municipality: "Guadalajara",
                    state: "Jalisco",
                    postalCode: "44100",
                    country: "México"
                }

                setAccount(accountData)
                setAddress(addressData)
                setForm({ ...accountData, ...addressData })

            } finally {
                setLoading(false)
            }
        }

        if (user) fetchData()
    }, [user])

    const handleChange = ({ target: { name, value } }) => {
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleApply = async () => {
        try {
            setAccount(prev => ({
                ...prev,
                name: form.name,
                lastname: form.lastname
            }))

            setAddress(prev => ({
                ...prev,
                ...form
            }))

            SwalCustom({
                icon: "success",
                message: "Cambios guardados",
                autoclose: true
            })

        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = () => {
        SwalCustom({
            icon: "warning",
            message: "¿Eliminar tu cuenta permanentemente?",
            onConfirmAction: async () => {
                try {
                    SwalCustom({
                        icon: "success",
                        message: "Cuenta eliminada",
                        autoclose: true
                    })
                } catch (err) {
                    console.error(err)
                }
            }
        })
    }

    if (!user) return <div className="p-10 text-gray-400">No hay usuario</div>
    if (loading) return <div className="p-10 text-gray-400">Cargando...</div>

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">

            {/* Sidebar */}
            <aside className="md:w-64 border-b md:border-r border-neutral-800 p-4 md:p-6">
                <div className="flex md:flex-col items-center gap-4">
                    <ProfileImage user={user} big />
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                </div>

                <nav className="mt-6 flex md:flex-col gap-2 text-sm overflow-x-auto">
                    <button
                        onClick={() => setActiveSection("account")}
                        className={`px-3 py-2 rounded-lg ${activeSection === "account" ? "bg-neutral-800" : ""}`}
                    >
                        Cuenta
                    </button>

                    <button
                        onClick={() => setActiveSection("address")}
                        className={`px-3 py-2 rounded-lg ${activeSection === "address" ? "bg-neutral-800" : ""}`}
                    >
                        Dirección
                    </button>

                    <button
                        onClick={() => setActiveSection("danger")}
                        className={`px-3 py-2 rounded-lg ${activeSection === "danger" ? "bg-red-900 text-white" : "text-red-400"}`}
                    >
                        Zona peligrosa
                    </button>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full flex flex-col gap-10">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Configuración</h1>

                    <button
                        onClick={handleApply}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                        Aplicar cambios
                    </button>
                </div>

                {/* Cuenta */}
                {activeSection === "account" && (
                    <section className="border-b border-neutral-800 pb-8 flex flex-col gap-5">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold">Cuenta</h2>
                            <button
                                onClick={() => setEditing(e => ({ ...e, account: !e.account }))}
                                className="text-sm text-gray-400"
                            >
                                {editing.account ? "Cancelar" : "Editar"}
                            </button>
                        </div>

                        {[
                            { label: "Nombre", name: "name" },
                            { label: "Apellido", name: "lastname" },
                            { label: "Teléfono", name: "phoneNumber" }
                        ].map(({ label, name }) => (
                            <div key={name}>
                                <label className="text-sm text-gray-500">{label}</label>
                                {editing.account ? (
                                    <input
                                        name={name}
                                        value={form[name] ?? ""}
                                        onChange={handleChange}
                                        className="w-full mt-1 bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p>{form[name] || "—"}</p>
                                )}
                            </div>
                        ))}

                        <div>
                            <label className="text-sm text-gray-500">Email</label>
                            <p>{account.email}</p>
                        </div>
                    </section>
                )}

                {/* Dirección */}
                {activeSection === "address" && (
                    <section className="border-b border-neutral-800 pb-8 flex flex-col gap-5">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-semibold">Dirección</h2>
                            <button
                                onClick={() => setEditing(e => ({ ...e, address: !e.address }))}
                                className="text-sm text-gray-400"
                            >
                                {editing.address ? "Cancelar" : "Editar"}
                            </button>
                        </div>

                        {[
                            { label: "Calle", name: "street" },
                            { label: "Número exterior", name: "exteriorNumber" },
                            { label: "Colonia", name: "neighborhood" },
                            { label: "Ciudad", name: "city" },
                            { label: "Estado", name: "state" },
                            { label: "Código postal", name: "postalCode" }
                        ].map(({ label, name }) => (
                            <div key={name}>
                                <label className="text-sm text-gray-500">{label}</label>
                                {editing.address ? (
                                    <input
                                        name={name}
                                        value={form[name] ?? ""}
                                        onChange={handleChange}
                                        className="w-full mt-1 bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2"
                                    />
                                ) : (
                                    <p>{form[name] || "—"}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Danger */}
                {activeSection === "danger" && (
                    <section className="border border-red-900 bg-red-950/30 rounded-xl p-5">
                        <h2 className="text-red-400 font-semibold mb-2">Zona peligrosa</h2>

                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-700 rounded-md"
                        >
                            Eliminar cuenta
                        </button>
                    </section>
                )}

            </main>
        </div>
    )
}

export default Profile