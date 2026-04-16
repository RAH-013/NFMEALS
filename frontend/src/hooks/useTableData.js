import { useState, useEffect } from "react";

export const useTableData = ({
    fetchData,
    initialLimit = 10
}) => {

    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const [pageIndex, setPageIndex] = useState(0);
    const [limit] = useState(initialLimit);

    const [search, setSearch] = useState("");
    const [pendingSearch, setPendingSearch] = useState("");

    const [refreshKey, setRefreshKey] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPages = Math.ceil(totalItems / limit);

    const fetchTableData = async (override = {}) => {
        try {
            setLoading(true);
            setError("");

            const params = {
                page: override.page ?? pageIndex + 1,
                limit,
                search: override.search ?? pendingSearch
            };

            const res = await fetchData(params);

            setData(res.data?.users || []);
            setTotalItems(res.data?.info?.totalItems || 0);

        } catch (err) {
            setError(err.message || "Error al obtener datos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, [pageIndex, pendingSearch, refreshKey]);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handleSearch = () => {
        setPageIndex(0);
        setPendingSearch(search);
    };

    const clearSearch = () => {
        setSearch("");
        setPendingSearch("");
        setPageIndex(0);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 0 || newPage >= totalPages) return;
        setPageIndex(newPage);
    };

    const fromItem = totalItems === 0 ? 0 : pageIndex * limit + 1;
    const toItem = Math.min((pageIndex + 1) * limit, totalItems);

    return {
        data,
        totalItems,
        pageIndex,
        totalPages,
        loading,
        error,

        search,
        setSearch,

        pendingSearch,

        handleSearch,
        clearSearch,
        handlePageChange,
        handleRefresh,

        fromItem,
        toItem
    };
};