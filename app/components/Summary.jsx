"use client"
import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ value, prefix = "₹" }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const target = parseFloat(value) || 0;
        const duration = 800;
        const start = performance.now();
        const from = display;
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(from + (target - from) * eased);
            if (progress < 1) ref.current = requestAnimationFrame(step);
        };
        ref.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(ref.current);
    }, [value]);

    return <span>{prefix}{display.toFixed(2)}</span>;
}

const Summary = ({ transactions }) => {
    const [expanded, setExpanded] = useState(null);

    let income = 0, expenses = 0;
    transactions.forEach(t => {
        const amount = parseFloat(t.amount);
        if (t.type === 'income') income += amount;
        else expenses += amount;
    });

    const balance = income - expenses;
    const incomeCount = transactions.filter(t => t.type === 'income').length;
    const expenseCount = transactions.filter(t => t.type !== 'income').length;

    const cards = [
        {
            title: "Total Balance",
            amount: balance,
            color: "from-[#6366f1] to-[#8b5cf6]",
            iconBg: "bg-white/20",
            textColor: "text-white",
            subColor: "text-white/70",
            icon: (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            detail: `${transactions.length} total transactions`,
        },
        {
            title: "Monthly Income",
            amount: income,
            color: "from-[#10b981] to-[#059669]",
            iconBg: "bg-white/20",
            textColor: "text-white",
            subColor: "text-white/70",
            icon: (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            detail: `${incomeCount} income transactions`,
        },
        {
            title: "Monthly Expenses",
            amount: expenses,
            color: "from-[#f43f5e] to-[#e11d48]",
            iconBg: "bg-white/20",
            textColor: "text-white",
            subColor: "text-white/70",
            icon: (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
            ),
            detail: `${expenseCount} expense transactions`,
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, i) => (
                <div
                    key={i}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className={`bg-gradient-to-br ${card.color} rounded-2xl p-4 sm:p-5 shadow-lg cursor-pointer
                        active:scale-[0.97] hover:shadow-xl hover:-translate-y-0.5
                        transition-all duration-300 ease-out select-none`}
                >
                    <div className="flex justify-between items-start mb-3">
                        <p className={`${card.subColor} text-xs font-semibold uppercase tracking-wide`}>{card.title}</p>
                        <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                            {card.icon}
                        </div>
                    </div>
                    <h3 className={`text-2xl sm:text-3xl font-bold ${card.textColor}`}>
                        <AnimatedCounter value={card.amount} />
                    </h3>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${expanded === i ? "max-h-16 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
                        <div className={`text-xs ${card.subColor} border-t border-white/20 pt-2`}>
                            {card.detail}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Summary;
