import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender
} from "@tanstack/react-table";

function Tables({
    data = [],
    columns = [],
    total = 0,
    loading = false,
    pageIndex = 0,
    pageSize = 10,
    actions = [],
    onPageChange
}) {

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

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="w-full">

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
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={enhancedColumns.length} className="p-6 text-center">
                                    Cargando...
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="border-t border-neutral-800">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="p-4 text-sm">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <span>
                    Página {pageIndex + 1} de {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        onClick={() => onPageChange(pageIndex - 1)}
                        disabled={pageIndex === 0}
                    >
                        Prev
                    </button>

                    <button
                        onClick={() => onPageChange(pageIndex + 1)}
                        disabled={pageIndex >= totalPages - 1}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Tables;