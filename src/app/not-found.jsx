"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiHome, FiSearch, FiArrowLeft } from 'react-icons/fi';

const NotfoundPage = () => {
    return (
        
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-16 flex items-center justify-center min-h-[60vh]">
            
            
            <div className="w-full max-w-2xl bg-[#f4fbf9] dark:bg-slate-900/40 rounded-2xl sm:rounded-3xl border border-emerald-100/60 dark:border-slate-800 p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
                
                
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1aa274]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#044e3a]/10 rounded-full blur-3xl pointer-events-none"></div>

                
                <div className="relative z-10 mb-6">
                    <h1 className="text-7xl sm:text-9xl font-serif italic font-extrabold text-[#044e3a] dark:text-emerald-400 select-none tracking-tighter">
                        404
                    </h1>
                    <div className="w-16 h-1 bg-[#1aa274] mx-auto mt-4 rounded-full"></div>
                </div>

               
                <div className="relative z-10 space-y-3 max-w-md mx-auto mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                        Page not found
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                        Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
                    </p>
                </div>

               
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                   
                   <Link href="/">
                    <Button
                        className="w-full sm:w-auto bg-[#1aa274] hover:bg-[#15855f] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                        <FiHome size={16} />
                        Back to home
                    </Button>
                   </Link>

                    
                    <Button
                        as={Link}
                        href="/tutors"
                        className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm transition-all flex items-center justify-center gap-2"
                    >
                        <FiSearch size={16} />
                        Find tutors
                    </Button>
                </div>

            </div>

        </div>
    );
};

export default NotfoundPage;