"use client"
import { useState } from "react";
import Addtransactions from "../components/Addtransactions";
import Deleteconfirmation from "../components/Deleteconfirmation";
import Header from "../components/Header";
import Summary from "../components/Summary.jsx";

export default function Dashboard() {
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [transactions, setTransactions] = useState([])


    return (
        <div className="w-full mx-auto min-h-screen flex flex-col">

            <main className="flex-1 p-6 md:p-8 lg:p-10 space-y-6">
                <Header />
                <Summary transactions={transactions} />
                <div className="space-y-4">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl text-black font-bold whitespace-nowrap">Recent Transactions</h2>
                            {transactions.length > 0 && < button
                                onClick={() => setShowAddTransaction(true)}
                                className="flex outline-none border-none items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-[#3730A3] shadow-sm hover:bg-opacity-90 transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add Transaction</span>
                            </button>}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                                <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by recipient, category, or amount..."
                                    className="pl-10  pr-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm  focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 placeholder:text-[#537893]/50 transition-all duration-300 outline-none w-72"
                                />
                            </div>
                            <button className="flex outline-none  items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50  focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 placeholder:text-[#537893]/50 transition-all duration-300">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Oct 1 - Oct 31</span>
                            </button>
                            <button className="flex outline-none  items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50  focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 placeholder:text-[#537893]/50 transition-all duration-300">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                <span>All Categories</span>
                            </button>
                            <button className="flex outline-none  items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50  focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 placeholder:text-[#537893]/50 transition-all duration-300">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span>Export</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-[#dae6e7] shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                        {transactions.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <img className="w-60 h-60 -mt-20" src="/images/no-transaction.png" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No transactions yet</h3>
                                <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">
                                    Start tracking your finances by adding your first transaction today.
                                </p>
                                <button
                                    onClick={() => setShowAddTransaction(true)}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg bg-[#3730A3] hover:bg-opacity-90 transition-all"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Add Transaction</span>
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto flex-1">
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
                                        {transactions.map((t, i) => <tr key={i} className="hover:bg-background-light transition-colors group">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-9 rounded-full bg-[#cbe5ec] flex items-center justify-center">
                                                        <i className="fas fa-shopping-cart text-sm"></i>
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
                                            <td className={`px-6 py-4 text-right text-sm font-bold ${t.amount < 0 ? 'text-[#e73108]' : 'text-green-600'}`}>${Math.abs(t.amount).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="p-1.5 outline-none border-none rounded text-[#5e8a8d] hover:text-primary hover:bg-primary/5 transition-colors" title="Edit">
                                                        <i className="fas fa-edit text-lg"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleting(i)}
                                                        className="p-1.5 cursor-pointer rounded outline-none border-none text-[#5e8a8d] hover:text-status-red hover:bg-status-red/5 transition-colors" title="Delete">
                                                        <i className="fas fa-trash text-lg"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {transactions.length > 0 && (
                            <div className="border-t border-[#f0f4f5] px-6 py-4 flex items-center justify-between bg-[#fafbfb]">
                                <p className="text-xs text-[#5e8a8d]">Showing 8 of 244 transactions</p>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 text-xs font-medium text-[#5e8a8d] border border-gray-300 rounded hover:bg-white transition-colors outline-none border-none">Previous</button>
                                    <button className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-900 rounded hover:bg-opacity-90 transition-colors outline-none border-none">Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main >
            {deleting !== null && <Deleteconfirmation deleting={deleting} setTransactions={setTransactions} transactions={transactions} setDeleting={setDeleting} />
            }
            {
                showAddTransaction &&
                <Addtransactions
                    setTransactions={setTransactions}
                    onClick={() => setShowAddTransaction(false)}
                />
            }

        </div >
    );
}