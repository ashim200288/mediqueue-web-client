"use client";

import React from 'react';
import { FiUsers, FiBookOpen, FiCalendar, FiStar } from 'react-icons/fi';

const HeroSection = () => {
    return (
       
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-10">
            
           
            <div className="w-full bg-[#f4fbf9] dark:bg-slate-900/40 rounded-xl sm:rounded-2xl border border-emerald-100/60 dark:border-slate-800 p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-2 items-center shadow-sm">
                
                
                <div className="flex items-center gap-3 sm:justify-center border-r border-slate-200/60">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-700 dark:text-emerald-400">
                        <FiUsers size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">1,240+</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Active tutors</p>
                    </div>
                </div>

               
                <div className="flex items-center gap-3 sm:justify-center border-r-0 md:border-r border-slate-200/60 pl-2 sm:pl-0">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-700 dark:text-emerald-400">
                        <FiBookOpen size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">20+</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Subjects covered</p>
                    </div>
                </div>

                
                <div className="flex items-center gap-3 sm:justify-center border-r border-slate-200/60">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-700 dark:text-emerald-400">
                        <FiCalendar size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">8,500+</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Sessions booked</p>
                    </div>
                </div>

               
                <div className="flex items-center gap-3 sm:justify-center pl-2 sm:pl-0">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-700 dark:text-emerald-400">
                        <FiStar size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight">4.9/5</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Average rating</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default HeroSection;