"use client"
import { useState } from "react";
import axios from 'axios';

function Addtransactions({ onClick, setTransactions, refreshTransactions, editing }) {
    const [data, setData] = useState(editing ? { ...editing, date: editing.date?.split('T')[0] } : { type: 'expense' })
    const [saving, setSaving] = useState(false)

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            if (editing) {
                await axios.put(`http://localhost:5000/transactions/${editing.sno}`, data)
            } else {
                await axios.post('http://localhost:5000/transactions', data)
            }
            await refreshTransactions()
            onClick()
        } finally {
            setSaving(false)
        }
    }



    return (

        <div className="fixed z-10 inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
                <div className="bg-white rounded-t-xl sm:rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">{editing ? 'Edit Transaction' : 'Add New Transaction'}</h2>
                        <button
                            type="button"
                            onClick={onClick}
                            className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Transaction Type</label>
                            <div className="flex bg-purple-50 shadow-xl rounded-lg p-2 border">
                                <button type='button' onClick={() => setData({ ...data, type: 'expense' })}
                                    className={`flex-1 py-2 px-8 text-sm font-medium rounded-md ${data.type === 'expense' || !data.type ? 'bg-white text-gray-900 shadow-sm bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1' : "text-teal-800 font-bold"}`}>
                                    EXPENSE
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setData({ ...data, type: 'income' })}
                                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${data.type === 'income' ? 'bg-white text-gray-900 shadow-sm bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1' : "text-teal-800 font-bold"}`}>
                                    INCOME
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        required
                                        id="amount"
                                        value={data.amount || ''}
                                        onChange={handleChange}
                                        type="number"
                                        className="w-full pl-8 pr-3 bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 text-black py-3 border border-gray-300 rounded-lg"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Date</label>
                                <div className="relative">
                                    <input
                                        required
                                        onChange={handleChange}
                                        id="date"
                                        type="date"
                                        value={data.date || ''}
                                        className="w-full bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 px-3 py-3 border text-black border-gray-300 rounded-lg"
                                    // value="Jan 24, 2024"
                                    />
                                    {/* <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg> */}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <input
                                required
                                id="description" onChange={handleChange}
                                type="text"
                                value={data.description || ''}
                                className="w-full px-3 py-3 border text-black border-gray-300 rounded-lg bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1"
                                placeholder="e.g., Monthly Grocery shopping"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Category</label>
                                <select
                                    required
                                    id="category"
                                    value={data.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 border text-black border-gray-300 rounded-lg bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1">
                                    <option value="">Select category...</option>
                                    <option value="food">Food</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Groceries">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Status</label>
                                <select
                                    required
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 border bg-transparent outline-none focus:border-[#7934ef] focus:ring-2 focus:ring-[#7c3aed]/30 focus:ring-offset-1 text-black border-gray-300 rounded-lg ">
                                    <option value="" >Select status...</option>
                                    <option value="pending" >Pending</option>
                                    <option value="completed" >Completed</option>
                                    <option value="completed" >Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 p-4 sm:p-6">
                        <button
                            onClick={onClick}
                            className="px-12 rounded-md py-2 text-md border border-gray-300 font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                            Cancel
                        </button>
                        <button disabled={saving} className="px-4 sm:px-6 py-2 bg-purple-800 text-white text-sm font-medium rounded-lg hover:bg-purple-900 hover:shadow-lg hover:shadow-purple-200 transition-all duration-200 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                            {saving ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {saving ? 'Saving...' : editing ? 'Update Transaction' : 'Save Transaction'}
                        </button>
                    </div>
                </div>
            </form>
        </div >
    )
}
export default Addtransactions;