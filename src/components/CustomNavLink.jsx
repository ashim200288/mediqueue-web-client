"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CustomNavLink = ({ to, children, onClick }) => {
    const pathname = usePathname();
    const isActive = pathname === to;

    
    const baseStyles = "relative py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1.5";
    
   
    const activeStyles = "text-emerald-700 dark:text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-600 after:rounded-full";
    const inactiveStyles = "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400";

    return (
        <Link
            href={to}
            onClick={onClick}
            className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
        >
            {children}
        </Link>
    );
};

export default CustomNavLink;