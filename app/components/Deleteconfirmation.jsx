function Deleteconfirmation({ deleting, setDeleting, setTransactions, transactions }) {

    const handleDelete = () => {
        const removed = transactions.filter((_, i) => i !== deleting)
        setTransactions(removed)
        setDeleting(null)
    }
    return (
        <div className="fixed inset-0  bg-opacity-50 bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold mb-2">Delete Transaction?</h2>

                    <p className="text-gray-600 text-center text-sm mb-6">
                        Are you sure you want to delete this transaction?<br />
                        This action cannot be undone and will immediately<br />
                        affect your budget and account balance reporting.
                    </p>

                    {/* <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium text-gray-900">{transaction?.name || 'Apple Store Subscription'}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {transaction?.date || 'OCT 24, 2023'} • {transaction?.category || 'ENTERTAINMENT'}
                                </p>
                            </div> 
                         <p className="text-red-600 font-semibold">{transaction?.amount || '-$14.99'}</p>
                        </div>
                    </div> */}

                    <div className="flex gap-3 w-full mb-4">
                        <button
                            onClick={() => setDeleting(null)}
                            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            type='button'
                            className="flex-1 cursor-pointer px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Deleteconfirmation;