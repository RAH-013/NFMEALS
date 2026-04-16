import { useState, useMemo } from "react";
import {
    apiGetUsers,
    apiGetUserProfile,
    apiChangeUserRole,
    apiUserDelete
} from "../../api/users";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faTrash, faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";

import { useTableData } from "../../hooks/useTableData";
import { SwalCustom } from "../../utils/modal";

import Table from "../../layouts/Tables";
import Loader from "../../layouts/Loader";
import InputField from "../../layouts/InputField";

function Users() {
    const [pageInput, setPageInput] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const table = useTableData({
        fetchData: apiGetUsers,
    });

    const handleViewProfile = async (user) => {
        try {
            const res = await apiGetUserProfile(user.id);

            const mergedUser = {
                id: user.id,
                role: user.role,
                ...res.data,
                name: user.profile?.name,
                lastname: user.profile?.lastname
            };

            setSelectedUser(mergedUser);
        } catch (error) {
            SwalCustom({
                icon: "error",
                message: error.message || "Error al obtener perfil"
            });
        }
    };

    const handleDeleteAccount = async (user) => {
        const phrase = `ELIMINAR A ${user.profile?.name || "USUARIO"}`.trim().toUpperCase();

        const confirmText = await new Promise((resolve) => {
            SwalCustom({
                icon: "warning",
                message: `Escribe "${phrase}" para confirmar esta acción`,
                input: true,
                inputPlaceholder: phrase,
                callback: (result) => resolve(result.value || "")
            });
        });

        if (confirmText !== phrase) return;

        try {
            await apiUserDelete(user.id);

            SwalCustom({
                icon: "success",
                message: "Usuario eliminado correctamente",
                autoclose: true
            });

            table.handleRefresh();
        } catch (error) {
            SwalCustom({
                icon: "error",
                message: error.message || "Error al eliminar usuario"
            });
        }
    };

    const handleToggleRole = async () => {
        const currentRole = selectedUser?.role;
        const newRole = currentRole === "admin" ? "customer" : "admin";

        const confirm = await new Promise((resolve) => {
            SwalCustom({
                icon: "warning",
                message: `¿Cambiar rol a "${newRole}"?`,
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                callback: (result) => resolve(result.isConfirmed)
            });
        });

        if (!confirm) return;

        try {
            await apiChangeUserRole(selectedUser.id, newRole);

            setSelectedUser(prev => ({
                ...prev,
                role: newRole
            }));

            table.handleRefresh();

            SwalCustom({
                icon: "success",
                message: "Rol actualizado correctamente",
                autoclose: true
            });
        } catch (error) {
            SwalCustom({
                icon: "error",
                message: error.message || "Error al cambiar rol"
            });
        }
    };

    const columns = useMemo(() => [
        {
            header: "Email",
            accessorFn: row => row.email
        },
        {
            header: "Rol",
            accessorFn: row => row.role,
            cell: ({ row }) => {
                const role = row.original.role;

                const styles = {
                    admin: "bg-blue-500/20 text-blue-400"
                };

                return (
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${styles[role] || "bg-zinc-700 text-zinc-300"}`}>
                        {role}
                    </span>
                );
            }
        },
        {
            header: "Verificado",
            accessorFn: row => row.isEmailVerified,
            cell: ({ row }) => {
                const verified = row.original.isEmailVerified;

                return (
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${verified
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-700 text-zinc-400"
                        }`}>
                        {verified ? "Verificado" : "No verificado"}
                    </span>
                );
            }
        },
        {
            header: "Nombre",
            accessorFn: row => row.profile?.name || "-"
        },
        {
            header: "Apellido",
            accessorFn: row => row.profile?.lastname || "-"
        }
    ], []);

    const actions = useMemo(() => [
        {
            label: <FontAwesomeIcon icon={faAddressCard} />,
            className: "p-2 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 cursor-pointer",
            onClick: handleViewProfile
        },
        {
            label: <FontAwesomeIcon icon={faTrash} />,
            className: "p-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 cursor-pointer",
            onClick: handleDeleteAccount
        }
    ], []);

    const clearSelectedUser = () => setSelectedUser(null);

    const totalPages = table.totalPages;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-zinc-950 text-zinc-100 p-4 md:p-6">
            {selectedUser ? (
                <div className="max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">

                    <button
                        onClick={clearSelectedUser}
                        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                        Volver
                    </button>

                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold">
                            {selectedUser?.name} {selectedUser?.lastname}
                        </h2>

                        <button
                            onClick={handleToggleRole}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer flex items-center gap-2
                                ${selectedUser?.role === "admin"
                                    ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                    : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                                }`}
                        >
                            <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
                            {selectedUser?.role}
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <InputField name="city" label="Ciudad" value={selectedUser?.city || "---"} disabled />
                        <InputField name="country" label="País" value={selectedUser?.country || "---"} disabled />
                        <InputField name="street" label="Calle" value={selectedUser?.street || "---"} disabled />
                        <InputField name="state" label="Estado" value={selectedUser?.state || "---"} disabled />
                        <InputField name="postalCode" label="Código Postal" value={selectedUser?.postalCode || "---"} disabled />
                        <InputField name="phoneNumber" label="Número de Teléfono" value={selectedUser?.phoneNumber || "---"} disabled />
                        <InputField name="municipality" label="Municipio" value={selectedUser?.municipality || "---"} disabled />
                        <InputField name="interiorNumber" label="Número Interior" value={selectedUser?.interiorNumber || "---"} disabled />
                        <InputField name="exteriorNumber" label="Número Exterior" value={selectedUser?.exteriorNumber || "---"} disabled />
                        <InputField name="neighborhood" label="Colonia" value={selectedUser?.neighborhood || "---"} disabled />
                    </div>
                </div>

            ) : (
                <div className="flex flex-col gap-6">
                    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex gap-3 w-full md:w-auto">
                            <input
                                type="search"
                                value={table.search}
                                onChange={(e) => table.setSearch(e.target.value)}
                                placeholder="Buscar usuario..."
                                className="w-full md:w-72 bg-zinc-950 border border-zinc-700 px-4 py-2 rounded-lg text-sm"
                            />

                            <button
                                onClick={table.handleSearch}
                                disabled={table.loading}
                                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm cursor-pointer"
                            >
                                Buscar
                            </button>

                            {table.search && (
                                <button
                                    onClick={table.clearSearch}
                                    className="px-3 py-2 rounded-lg text-sm border border-zinc-700 cursor-pointer"
                                >
                                    Limpiar
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <span>Página</span>

                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                value={pageInput}
                                onChange={(e) => setPageInput(e.target.value)}
                                className="w-16 px-2 py-1 bg-zinc-950 border border-zinc-700 rounded text-center"
                            />

                            <button
                                onClick={() => {
                                    const page = Number(pageInput || 1);
                                    table.handlePageChange(page - 1);
                                }}
                                className="px-3 py-1 bg-red-600 rounded text-white cursor-pointer"
                            >
                                Ir
                            </button>

                        </div>
                    </header>

                    <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        {table.loading ? (
                            <div className="text-center py-6">
                                <Loader />
                            </div>
                        ) : table.data.length === 0 ? (
                            <div className="text-center py-6 text-zinc-500">
                                Sin registros
                            </div>
                        ) : (
                            <Table columns={columns} hook={table} actions={actions} />
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}

export default Users;