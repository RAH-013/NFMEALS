import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons"

import { useUser } from '../hooks/useUser'

function UserOptions() {
    const { user, loading, refreshUser } = useUser()

    return (
        <>
            {loading ? (
                <span>Cargando...</span>
            ) : user ? (
                <>
                    <span>Hola, {user.name}</span>
                    <button onClick={() => {
                        localStorage.removeItem("nf_meals")
                        refreshUser()
                    }} className="ml-2 px-2 py-1 bg-red-500 rounded">Cerrar sesión</button>
                </>
            ) : (
                <Link to="/authenticate" className="px-2 py-1 bg-green-500 rounded">
                    <FontAwesomeIcon icon={faUser} /> Iniciar sesión
                </Link>
            )}
        </>
    )
}

export default UserOptions
/*
<Link to="/carrito" onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <Link to="/authenticate" onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faUser} />
            </Link>*/