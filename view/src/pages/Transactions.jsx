import {useState, useEffect, useLayoutEffect} from 'react';
import axios from 'axios';
import Pagination from "./Pagnition.jsx";
import {useCallback} from "react";
import MonthDropdown, {months} from "./MonthDropdown.jsx";
import Statistics from "./Statistics.jsx";
import convertToDateOnly from "../store/DateConvert.js";
import BarChart from "./BarChart.jsx";
import PieChart from "./PieChart.jsx";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [month, setMonth] = useState(3);
    const [statistics, setStatistics] = useState([]);
    const [barChartData, setBarChartData] = useState([
        { range: '0-100', count: 0 },
        { range: '101-200', count: 0 },
        { range: '201-300', count: 1 },
        { range: '301-400', count: 0 },
        { range: '401-500', count: 0 },
        { range: '501-600', count: 0 },
        { range: '601-700', count: 0 },
        { range: '701-800', count: 2 },
        { range: '801-900', count: 0 },
        { range: '901-above', count: 0 }
    ]);
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, [page, search, perPage]);

    useLayoutEffect(() => {
        fetchMonthStatistics();
        fetchBarChartStatistics();
    }, [month]);

    useLayoutEffect(() => {
        fetchPieChartStatistics()
    }, [])

    const fetchMonthStatistics = async () => {
        try{
            const { data } = await axios.get(`http://localhost:3001/api/statistics/${month}`);
            await setStatistics(() => data.statistics);
        }catch (err){
            console.log("Error while fetching Statistics" , err);
        }
    }

    const fetchPieChartStatistics = async () => {
        try{
            const { data } = await axios.get(`http://localhost:3001/api/pieChart`);
            await setPieChartData(() => data);
        }catch (err){
            console.log("Error while fetching Statistics" , err);
        }
    }

    const fetchBarChartStatistics = async () => {
        try{
            const { data } = await axios.get(`http://localhost:3001/api/priceRange/${month}`);
            setTimeout(()=>{
                setBarChartData(() => data);
            }, 200)
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
        setPage(1);
    };

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
                    <caption className="caption-bottom mt-2">
                        Transaction Table
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
                            <td className="border-r border-neutral-500 p-1">{convertToDateOnly(transaction.dateOfSale)}</td>
                            <td className="border-r border-neutral-500 p-1">{transaction.sold}</td>
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
            <div className="border-t border-neutral-500 m-4"></div>
            <div>
                {
                    barChartData.length >= 1 ? (<BarChart barChartData={barChartData}/>) : null
                }
            </div>
            <div className="border-t border-neutral-500 m-4"></div>
            <div className="flex flex-col items-center justify-between">
                <h2 className="text-3xl font-bold font-mono">Pie Chart for product categories</h2>
                {
                    pieChartData.length >= 1 ? (<PieChart pieChartData={pieChartData}/>) : null
                }
            </div>
        </div>
    );
}

export default Transactions;
