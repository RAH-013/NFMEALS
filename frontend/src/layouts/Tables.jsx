import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender
} from "@tanstack/react-table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";

import Loader from "../layouts/Loader"

function Table({
    columns = [],
    hook,
    actions = []
}) {
    const {
        data,
        loading,
        error,
        pageIndex,
        totalPages,
        handlePageChange,
        handleRefresh,
        fromItem,
        toItem,
        totalItems
    } = hook;

    const enhancedColumns = actions.length > 0
        ? [
            ...columns,
            {
                id: "actions",
                header: "",
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        {actions.map((action, i) => (
                            <button
                                key={i}
                                onClick={() => action.onClick(row.original)}
                                className={action.className}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )
            }
        ]
        : columns;

    const table = useReactTable({
        data,
        columns: enhancedColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <div className="flex flex-col gap-4">

            <div className="flex items-center justify-between text-sm text-zinc-400">
                <span>
                    {loading
                        ? <Loader />
                        : error
                            ? error
                            : `${fromItem}-${toItem} de ${totalItems}`}
                </span>

                <button
                    onClick={() => handleRefresh()}
                    disabled={loading}
                    className="p-2 rounded-lg bg-zinc-900 border border-red-900/40 text-red-400 cursor-pointer hover:text-red-300 hover:border-red-500/60 hover:bg-red-500/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <FontAwesomeIcon
                        icon={faRefresh}
                        className={`transition ${loading ? "animate-spin" : "hover:rotate-180"}`}
                    />
                </button>
            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-neutral-800 rounded-xl overflow-hidden">
                    <thead className="bg-neutral-900">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="p-4 text-left text-sm cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={enhancedColumns.length} className="p-6 text-center">
                                    <Loader />
                                </td>
                            </tr>
                        ) : table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-t border-neutral-800">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-4 text-sm">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden flex flex-col gap-4">
                {loading ? (
                    <div className="text-center text-sm text-zinc-400 py-6">
                        <Loader />
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center text-sm text-zinc-500 py-6">
                        Sin resultados
                    </div>
                ) : (
                    table.getRowModel().rows.map(row => (
                        <div key={row.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col gap-3">
                            {row.getVisibleCells().map(cell => {
                                const header = cell.column.columnDef.header;

                                return (
                                    <div key={cell.id} className="flex justify-between gap-4">
                                        <span className="text-xs text-zinc-400">
                                            {typeof header === "string" ? header : ""}
                                        </span>

                                        <span className="text-sm text-right">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-between items-center pt-2">

                <button
                    onClick={() => handlePageChange(pageIndex - 1)}
                    disabled={pageIndex === 0}
                    className="px-4 py-2 text-sm border border-zinc-700 rounded-lg text-zinc-300
                        hover:bg-zinc-800 hover:text-white hover:border-zinc-500
                        transition cursor-pointer
                        disabled:opacity-40 disabled:cursor-not-allowed
                        disabled:hover:bg-transparent disabled:hover:text-zinc-300"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Anterior
                </button>

                <span className="text-sm text-zinc-400">
                    {pageIndex + 1} / {totalPages || 1}
                </span>

                <button
                    onClick={() => handlePageChange(pageIndex + 1)}
                    disabled={pageIndex + 1 >= totalPages}
                    className="px-4 py-2 text-sm border border-zinc-700 rounded-lg text-zinc-300
                        hover:bg-zinc-800 hover:text-white hover:border-zinc-500
                        transition cursor-pointer
                        disabled:opacity-40 disabled:cursor-not-allowed
                        disabled:hover:bg-transparent disabled:hover:text-zinc-300"
                >
                    Siguiente
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
            </div>
        </div>
    );
}

export default Table;