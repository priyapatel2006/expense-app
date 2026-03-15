"use client"
import { useState, useMemo, useEffect } from "react";
import Addtransactions from "../components/Addtransactions";
import Deleteconfirmation from "../components/Deleteconfirmation";
import Header from "../components/Header";
import Summary from "../components/Summary.jsx";
import SwipeableCard from "../components/SwipeableCard";
import axios from 'axios';

export default function Dashboard() {
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [editing, setEditing] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const categories = [...new Set(transactions.map(t => t.category))];

    const categoryIcons = {
        food: 'fa-utensils',
        shopping: 'fa-bag-shopping',
        groceries: 'fa-cart-shopping',
        salary: 'fa-money-bill-wave',
        income: 'fa-arrow-trend-up',
        entertainment: 'fa-film',
        transport: 'fa-car',
        health: 'fa-heart-pulse',
        bills: 'fa-file-invoice-dollar',
    };

    const getCategoryIcon = (cat) => categoryIcons[cat?.toLowerCase()] || 'fa-receipt';

    const getAllTransactions = async () => {
        setLoading(true);
        try {
            const resp = await axios.get('http://localhost:5000/transactions');
            setTransactions(resp.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getAllTransactions(); }, []);

    const filtered = useMemo(() => {
        return transactions.filter(t => {
            const matchSearch = !search || t.description?.toLowerCase().includes(search.toLowerCase()) || t.category?.toLowerCase().includes(search.toLowerCase()) || t.amount?.toString().includes(search);
            const matchCategory = category === "all" || t.category === category;
            const tDate = t.date?.split('T')[0];
            const matchFrom = !dateFrom || tDate >= dateFrom;
            const matchTo = !dateTo || tDate <= dateTo;
            return matchSearch && matchCategory && matchFrom && matchTo;
        });
    }, [transactions, search, category, dateFrom, dateTo]);

    const handleExport = () => {
        if (filtered.length === 0) return;
        const headers = "Date,Description,Category,Type,Status,Amount\n";
        const rows = filtered.map(t => `${t.date},${t.description},${t.category},${t.type},${t.status},${t.amount}`).join("\n");
        const blob = new Blob([headers + rows], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "transactions.csv";
        a.click();
    };

    const dateLabel = dateFrom && dateTo
        ? `${new Date(dateFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(dateTo).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : dateFrom ? `From ${new Date(dateFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
            : dateTo ? `Until ${new Date(dateTo).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                : "Select Dates";

    const activeFilters = (category !== "all" ? 1 : 0) + (dateFrom ? 1 : 0) + (dateTo ? 1 : 0);

    return (
        <div className="w-full mx-auto min-h-screen flex flex-col pb-20 md:pb-0">
            <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 space-y-5 sm:space-y-6">
                <Header />
                <Summary transactions={filtered} />

                <div className="space-y-3 sm:space-y-4">
                    {/* Mobile: compact header row */}
                    <div className="flex sm:hidden items-center justify-between">
                        <h2 className="text-base font-bold text-black">Recent Transactions</h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="relative flex items-center justify-center size-9 border border-gray-200 rounded-xl text-gray-500 active:scale-95 transition-all bg-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                {activeFilters > 0 && (
                                    <span className="absolute -top-1 -right-1 size-4 bg-[#3730A3] text-white text-[9px] font-bold rounded-full flex items-center justify-center">{activeFilters}</span>
                                )}
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex items-center justify-center size-9 border border-gray-200 rounded-xl text-gray-500 active:scale-95 transition-all bg-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile: search bar full width */}
                    <div className="sm:hidden relative">
                        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search transactions..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 placeholder:text-gray-400 transition-all outline-none"
                        />
                    </div>

                    {/* Mobile: expandable filter panel */}
                    <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-out ${showFilters ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3 shadow-sm">
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-black outline-none focus:border-[#7934ef]">
                                    <option value="all">All Categories</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">From</label>
                                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-black outline-none focus:border-[#7934ef]" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">To</label>
                                    <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-black outline-none focus:border-[#7934ef]" />
                                </div>
                            </div>
                            <button onClick={() => { setCategory("all"); setDateFrom(""); setDateTo(""); }} className="w-full text-xs py-2 border border-gray-200 rounded-xl text-gray-600 active:scale-[0.98] transition-all">Clear Filters</button>
                        </div>
                    </div>

                    {/* Desktop: title + filters row */}
                    <div className="hidden sm:flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl text-black font-bold whitespace-nowrap">Recent Transactions</h2>
                            {transactions.length > 0 && (
                                <button
                                    onClick={() => setShowAddTransaction(true)}
                                    className="flex outline-none border-none items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-[#3730A3] shadow-sm hover:bg-opacity-90 transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Transaction
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 placeholder:text-[#537893]/50 transition-all duration-300 outline-none w-72"
                                />
                            </div>
                            {/* Date Range */}
                            <div className="relative">
                                <button onClick={() => { setShowDatePicker(!showDatePicker); setShowCategoryDropdown(false); }} className="flex outline-none items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{dateLabel}</span>
                                </button>
                                {showDatePicker && (
                                    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20 space-y-3">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">From</label>
                                            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-[#7934ef]" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">To</label>
                                            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-[#7934ef]" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setDateFrom(""); setDateTo(""); setShowDatePicker(false); }} className="flex-1 text-xs py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Clear</button>
                                            <button onClick={() => setShowDatePicker(false)} className="flex-1 text-xs py-1.5 bg-[#3730A3] text-white rounded-lg">Apply</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Category Filter */}
                            <div className="relative">
                                <button onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowDatePicker(false); }} className="flex outline-none items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    <span>{category === "all" ? "All Categories" : category}</span>
                                </button>
                                {showCategoryDropdown && (
                                    <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-[160px]">
                                        <button onClick={() => { setCategory("all"); setShowCategoryDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${category === "all" ? "text-[#3730A3] font-semibold" : "text-gray-700"}`}>All Categories</button>
                                        {categories.map(c => (
                                            <button key={c} onClick={() => { setCategory(c); setShowCategoryDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${category === c ? "text-[#3730A3] font-semibold" : "text-gray-700"}`}>{c}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Export */}
                            <button onClick={handleExport} className="flex outline-none items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Export</span>
                            </button>
                        </div>
                    </div>

                    {/* Content area */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-10 h-10 border-4 border-[#3730A3]/20 border-t-[#3730A3] rounded-full animate-spin"></div>
                            <p className="text-sm text-gray-500">Loading transactions...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <img className="w-48 h-48 sm:w-60 sm:h-60" src="/images/no-transaction.png" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{transactions.length === 0 ? "No transactions yet" : "No matching transactions"}</h3>
                            <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">
                                {transactions.length === 0 ? "Start tracking your finances by adding your first transaction today." : "Try adjusting your search or filters."}
                            </p>
                            {transactions.length === 0 && (
                                <button
                                    onClick={() => setShowAddTransaction(true)}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-xl bg-[#3730A3] hover:bg-opacity-90 active:scale-95 transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Transaction
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Mobile: Swipeable cards */}
                            <div className="sm:hidden space-y-3">
                                {filtered.map((t, i) => {
                                    const originalIndex = transactions.indexOf(t);
                                    return (
                                        <SwipeableCard
                                            key={i}
                                            onSwipeLeft={() => setDeleting(originalIndex)}
                                            onSwipeRight={() => setEditing(t)}
                                        >
                                            <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm active:scale-[0.98] transition-all duration-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
                                                        <i className={`fas ${getCategoryIcon(t.category)} text-sm text-[#3730A3]`}></i>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-sm font-bold text-gray-900 truncate">{t.description}</p>
                                                            <p className={`text-sm font-bold flex-shrink-0 ${t.type === 'expense' ? 'text-[#e73108]' : 'text-green-600'}`}>
                                                                {t.type === 'expense' ? '-' : '+'}₹{Math.abs(t.amount)}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-1.5">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#f0f4f5] text-[#5e8a8d] font-bold uppercase">{t.category}</span>
                                                                <span className="text-[10px] text-gray-400">{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                                <span className={`flex items-center gap-1 text-[10px] font-bold uppercase ${t.status === 'completed' ? 'text-[#078832]' : 'text-yellow-600'}`}>
                                                                    <span className={`size-1.5 rounded-full ${t.status === 'completed' ? 'bg-[#078832]' : 'bg-yellow-600'}`}></span>
                                                                    {t.status}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <button onClick={(e) => { e.stopPropagation(); setEditing(t); }} className="p-1.5 rounded-lg text-gray-300 active:text-[#3730A3] active:bg-[#EEF2FF] transition-all">
                                                                    <i className="fas fa-pen-to-square text-xs"></i>
                                                                </button>
                                                                <button onClick={(e) => { e.stopPropagation(); setDeleting(originalIndex); }} className="p-1.5 rounded-lg text-gray-300 active:text-red-500 active:bg-red-50 transition-all">
                                                                    <i className="fas fa-trash-can text-xs"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwipeableCard>
                                    );
                                })}
                            </div>

                            {/* Desktop: Table */}
                            <div className="hidden sm:block bg-white rounded-xl border border-[#dae6e7] shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[1000px]">
                                        <thead className="bg-[#fafbfb] border-b border-[#f0f4f5]">
                                            <tr>
                                                <th className="px-6 py-3 text-[10px] font-bold text-[#5e8a8d] uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-[#5e8a8d] uppercase tracking-wider">Description</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-[#5e8a8d] uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-[#5e8a8d] uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-[#5e8a8d] uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-[#5e8a8d] uppercase tracking-wider text-right">Amount</th>
                                                <th className="px-6 py-3 text-[10px] font-bold text-[#5e8a8d] uppercase tracking-wider text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#f0f4f5] text-black">
                                            {filtered.map((t, i) => {
                                                const originalIndex = transactions.indexOf(t);
                                                return (
                                                    <tr key={i} className="hover:bg-indigo-50/50 transition-all duration-200 group">
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-9 rounded-full bg-[#EEF2FF] flex items-center justify-center group-hover:bg-[#3730A3]/10 transition-colors duration-200">
                                                                    <i className={`fas ${getCategoryIcon(t.category)} text-sm text-[#3730A3]`}></i>
                                                                </div>
                                                                <span className="text-sm font-bold">{t.description}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-[10px] px-2 py-1 rounded bg-[#f0f4f5] text-[#5e8a8d] font-bold uppercase tracking-tight">{t.category}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-xs font-medium text-[#5e8a8d]">{t.type}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`flex items-center gap-1.5 font-bold text-[11px] uppercase ${t.status === 'completed' ? 'text-[#078832]' : 'text-yellow-600'}`}>
                                                                <span className={`size-1.5 rounded-full ${t.status === 'completed' ? 'bg-[#078832]' : 'bg-yellow-600'}`}></span>
                                                                {t.status?.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className={`px-6 py-4 text-right text-sm font-bold ${t.type === 'expense' ? 'text-[#e73108]' : 'text-green-600'}`}>₹{Math.abs(t.amount)}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button onClick={() => setEditing(t)} className="p-2 outline-none border-none rounded-lg text-gray-400 hover:text-[#3730A3] hover:bg-[#EEF2FF] transition-all duration-200" title="Edit">
                                                                    <i className="fas fa-pen-to-square text-sm"></i>
                                                                </button>
                                                                <button onClick={() => setDeleting(originalIndex)} className="p-2 cursor-pointer rounded-lg outline-none border-none text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200" title="Delete">
                                                                    <i className="fas fa-trash-can text-sm"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="border-t border-[#f0f4f5] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-[#fafbfb]">
                                    <p className="text-xs text-[#5e8a8d]">Showing {filtered.length} of {transactions.length} transactions</p>
                                </div>
                            </div>

                            {/* Mobile footer count */}
                            <div className="sm:hidden text-center">
                                <p className="text-xs text-gray-400">Showing {filtered.length} of {transactions.length} transactions</p>
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Floating Action Button - mobile only */}
            <button
                onClick={() => setShowAddTransaction(true)}
                className="sm:hidden fixed bottom-6 right-5 z-40 w-14 h-14 bg-gradient-to-br from-[#6366f1] to-[#3730A3] text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center active:scale-90 hover:shadow-xl transition-all duration-200"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {deleting !== null && <Deleteconfirmation deleting={deleting} setTransactions={setTransactions} transactions={transactions} setDeleting={setDeleting} />}
            {(showAddTransaction || editing) &&
                <Addtransactions
                    setTransactions={setTransactions}
                    onClick={() => { setShowAddTransaction(false); setEditing(null); }}
                    refreshTransactions={getAllTransactions}
                    editing={editing}
                />
            }
        </div>
    );
}
