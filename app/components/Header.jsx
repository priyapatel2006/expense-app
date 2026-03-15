"use client"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
        else router.replace("/auth/login");
    }, []);

    useEffect(() => {
        const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.replace("/auth/login");
    };

    return (
        <div className="flex items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                    <img src="/images/logo.png" className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14" />
                </div>
                <div>
                    <h1 className="text-sm sm:text-lg md:text-2xl font-bold text-black tracking-tight">Personal Finance Tracker</h1>
                    <p className="text-[#5e8a8d] text-xs md:text-sm hidden sm:block">Detailed transaction management and high-level metrics.</p>
                </div>
            </div>
            {user && (
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setOpen(!open)} className="cursor-pointer outline-none border-none bg-transparent p-0 flex-shrink-0">
                        {user.picture ? (
                            <img src={user.picture} className="size-9 sm:size-11 rounded-full object-cover ring-2 ring-[#dae6e7] hover:ring-[#7934ef] transition-all" referrerPolicy="no-referrer" />
                        ) : (
                            <div className="size-9 sm:size-11 rounded-full bg-[#7934ef] text-white font-bold text-base sm:text-lg flex items-center justify-center ring-2 ring-[#dae6e7] hover:ring-[#7934ef] transition-all">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </button>
                    <div className={`absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-[#dae6e7] z-50 origin-top-right transition-all duration-200 ${
                        open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                    }`}>
                        <div className="px-4 py-3">
                            <p className="text-sm font-semibold text-black truncate">{user.name}</p>
                            <p className="text-xs text-[#5e8a8d] truncate">{user.email}</p>
                        </div>
                        <hr className="border-[#dae6e7]" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#f65d5d] hover:bg-red-50 rounded-b-xl cursor-pointer outline-none border-none bg-transparent transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
