const Summary = ({ transactions }) => {
    let income = 0, expenses = 0;
    transactions.forEach(t => {
        const amount = parseFloat(t.amount);
        if (t.type === 'income') income += amount;
        else expenses += amount;
    });

    const overview = [
        {
            title: "Total Balance",
            amount: `$${(income - expenses).toFixed(2)}`,
            icon: (
                <svg className="w-5 h-5 text-[#8520f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
        {
            title: "Monthly Income",
            amount: `$${income.toFixed(2)}`,
            icon: (
                <svg className="w-5 h-5 text-[#13703e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
        {
            title: "Monthly Expenses",
            amount: `$${expenses.toFixed(2)}`,
            icon: (
                <svg className="w-5 h-5 text-[#d21010]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
            ),
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overview.map((allover, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md hover:border-[#7934ef] hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                        <p className="text-[#6B7280] text-xs font-semibold uppercase tracking-wide">{allover.title}</p>
                        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                            {allover.icon}
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{allover.amount}</h3>
                </div>))}

        </div>
    )
}
export default Summary;