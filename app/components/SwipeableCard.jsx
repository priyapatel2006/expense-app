"use client"
import { useRef, useState } from "react";

export default function SwipeableCard({ children, onSwipeLeft, onSwipeRight }) {
    const startX = useRef(0);
    const currentX = useRef(0);
    const [offset, setOffset] = useState(0);
    const [swiping, setSwiping] = useState(false);
    const threshold = 80;

    const handleStart = (x) => {
        startX.current = x;
        currentX.current = x;
        setSwiping(true);
    };

    const handleMove = (x) => {
        if (!swiping) return;
        currentX.current = x;
        const diff = currentX.current - startX.current;
        const clamped = Math.max(-140, Math.min(140, diff));
        setOffset(clamped);
    };

    const handleEnd = () => {
        setSwiping(false);
        if (offset < -threshold) onSwipeLeft?.();
        else if (offset > threshold) onSwipeRight?.();
        setOffset(0);
    };

    const bgColor = offset < -30 ? "bg-red-500" : offset > 30 ? "bg-blue-500" : "bg-transparent";
    const actionIcon = offset < -30 ? (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white flex items-center gap-1.5 text-xs font-semibold">
            <i className="fas fa-trash-can"></i> Delete
        </div>
    ) : offset > 30 ? (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white flex items-center gap-1.5 text-xs font-semibold">
            <i className="fas fa-pen-to-square"></i> Edit
        </div>
    ) : null;

    return (
        <div className="relative overflow-hidden rounded-2xl">
            <div className={`absolute inset-0 ${bgColor} transition-colors duration-150 rounded-2xl flex items-center`}>
                {actionIcon}
            </div>
            <div
                className="relative transition-transform duration-150 ease-out"
                style={{ transform: `translateX(${offset}px)` }}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                onTouchEnd={handleEnd}
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseMove={(e) => { if (swiping) handleMove(e.clientX); }}
                onMouseUp={handleEnd}
                onMouseLeave={() => { if (swiping) handleEnd(); }}
            >
                {children}
            </div>
        </div>
    );
}
