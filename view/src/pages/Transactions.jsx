import {useState, useEffect, useLayoutEffect} from 'react';
import axios from 'axios';
import Pagination from "./Pagnition.jsx";
import {useCallback} from "react";
import MonthDropdown, {months} from "./MonthDropdown.jsx";
import Statistics from "./Statistics.jsx";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [month, setMonth] = useState(3);
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, [page, search, perPage]);

    useLayoutEffect(() => {
        fetchMonthStatistics();
    }, [month]);

    const fetchMonthStatistics = async () => {
        try{
            const { data } = await axios.get(`http://localhost:3001/api/statistics/${month}`);
            setStatistics(data.statistics);
            console.log(data.statistics);
        }catch (err){
            console.log("Error while fetching Statistics" , err);
        }
    }

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
                <MonthDropdown currentMonth={month} handleSetMonth={handleSetMonth}/>
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
            <div className="border-t border-neutral-500 m-4"></div>
            <div className="flex flex-col items-center justify-between">
                <h2 className="text-3xl font-bold font-mono">Statistics for {months[month]} month:</h2>
                <Statistics statistics={statistics} month={month}/>
            </div>
        </div>
    );
}

export default Transactions;
