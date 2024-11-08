import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from "./Pagnition.jsx";
import {useCallback} from "react";
import MonthDropdown from "./MonthDropdown.jsx";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [month, setMonth] = useState(3);

    useEffect(() => {
        fetchTransactions();
    }, [page, search, perPage]);

    const fetchTransactions = async () => {
        try {
            const { data } = await axios.get("http://localhost:3001/api/getTransaction", {
                params: { page, perPage, search }
            });
                setTransactions(data.transactions);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page on new search
    };

    useEffect(() => {
        console.log(month)
    }, [month])

    const handleSetMonth = useCallback((event) => {
        setMonth(event.target.value);
    }, []);

    const handlePageChange = (newPage) => setPage(newPage);

    return (
        <div className="mx-24">
            <div className="flex items-center justify-between">
                <input
                    className="border border-neutral-700 rounded-md p-2 m-3 w-96"
                    type="text"
                    placeholder="Search transactions"
                    value={search}
                    onChange={handleSearchChange}
                />
                <MonthDropdown currentMonth={month} handleSetMonth={handleSetMonth} />
            </div>
            <ul>
                <table>
                    <caption className="caption-bottom">
                        Table 3.1: Professional wrestlers and their signature moves.
                    </caption>
                    <thead>
                    <tr className="border border-neutral-500">
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>sold</th>
                    </tr>
                    </thead>
                    <tbody className="border border-neutral-500">
                    {transactions.map((transaction) => (
                            <tr className="border border-neutral-500" key={transaction.id}>
                                <td className="border-r border-neutral-500 p-1">{transaction.id}</td>
                                <td className="border-r border-neutral-500 p-1">{transaction.title}</td>
                                <td className="border-r border-neutral-500 p-1">{transaction.description}</td>
                                <td className="border-r border-neutral-500 p-1">{transaction.category}</td>
                                <td className="border-r border-neutral-500 p-1">{transaction.price}</td>
                                <td className="border-r border-neutral-500 p-1">{transaction.price}</td>
                                <td className="">{transaction.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                perPage={perPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Transactions;
