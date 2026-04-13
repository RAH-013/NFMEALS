import React, { useEffect, useState } from "react";
import Tables from "../../layouts/Tables";
import { apiGetUsers } from "../../api/users";

function Users() {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ role: "" });

    useEffect(() => {
        fetchUsers(pageIndex);
    }, [pageIndex]);

    const fetchUsers = async (page, searchValue = search, filterValues = filters) => {
        setLoading(true);

        const res = await apiGetUsers({
            page: page + 1,
            limit: pageSize,
            search: searchValue,
            ...filterValues
        });

        if (res.data) {
            setUsers(res.data.users);
            setTotal(res.data.info.totalItems);
        }

        setLoading(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 0) return;
        setPageIndex(newPage);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        setPageIndex(0);
        fetchUsers(0, value, filters);
    };

    const handleRoleFilter = (e) => {
        const newFilters = { ...filters, role: e.target.value };
        setFilters(newFilters);
        setPageIndex(0);
        fetchUsers(0, search, newFilters);
    };

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Rol" },
        {
            accessorKey: "isEmailVerified",
            header: "Verificado",
            cell: ({ row }) => (row.original.isEmailVerified ? "Sí" : "No")
        },
        {
            accessorKey: "profile.name",
            header: "Nombre",
            cell: ({ row }) => {
                const p = row.original.profile;
                return p ? `${p.name} ${p.lastname}` : "-";
            }
        }
    ];

    return (
        <div className="p-6">

            <h1 className="text-xl mb-4">Usuarios</h1>

            <div className="flex gap-3 mb-4">
                <input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar por email o nombre..."
                    className="border p-2 rounded"
                />

                <select value={filters.role} onChange={handleRoleFilter}>
                    <option value="">Todos</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            <Tables
                data={users}
                columns={columns}
                total={total}
                loading={loading}
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Users;