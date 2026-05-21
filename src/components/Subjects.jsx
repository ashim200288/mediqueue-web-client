"use client";

import React from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { TbMathFunction } from 'react-icons/tb';
import { SlDrop } from 'react-icons/sl';
import { LiaDnaSolid } from 'react-icons/lia';
import { MdOutlineTranslate, MdComputer } from 'react-icons/md';
import { FiGlobe, FiPlus } from 'react-icons/fi';

const Subjects = () => {
    // ইমেজের ডেটা অনুযায়ী সাবজেক্ট লিস্ট array
    const subjectData = [
        {
            id: 1,
            title: "Mathematics",
            count: "148 tutors",
            icon: <TbMathFunction size={24} />,
            iconColor: "text-emerald-700 dark:text-emerald-400",
            bgColor: "bg-emerald-50 dark:bg-emerald-950/40"
        },
        {
            id: 2,
            title: "Physics",
            count: "96 tutors",
            // ফিক্সড: কোনো লাইব্রেরির ঝামেলা ছাড়া কাস্টম SVG Atom আইকন
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)"/>
                    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)"/>
                </svg>
            ),
            iconColor: "text-blue-700 dark:text-blue-400",
            bgColor: "bg-blue-50 dark:bg-blue-950/40"
        },
        {
            id: 3,
            title: "Chemistry",
            count: "84 tutors",
            icon: <SlDrop size={22} />,
            iconColor: "text-amber-700 dark:text-amber-400",
            bgColor: "bg-amber-50 dark:bg-amber-950/40"
        },
        {
            id: 4,
            title: "Biology",
            count: "72 tutors",
            icon: <LiaDnaSolid size={26} />,
            iconColor: "text-lime-700 dark:text-lime-400",
            bgColor: "bg-lime-50 dark:bg-lime-950/40"
        },
        {
            id: 5,
            title: "English",
            count: "210 tutors",
            icon: <MdOutlineTranslate size={24} />,
            iconColor: "text-pink-700 dark:text-pink-400",
            bgColor: "bg-pink-50 dark:bg-pink-950/40"
        },
        {
            id: 6,
            title: "ICT",
            count: "115 tutors",
            icon: <MdComputer size={24} />,
            iconColor: "text-indigo-700 dark:text-indigo-400",
            bgColor: "bg-indigo-50 dark:bg-indigo-950/40"
        },
        {
            id: 7,
            title: "Geography",
            count: "43 tutors",
            icon: <FiGlobe size={22} />,
            iconColor: "text-red-700 dark:text-red-400",
            bgColor: "bg-red-50 dark:bg-red-950/40"
        },
        {
            id: 8,
            title: "More subjects",
            count: "View all 20+",
            icon: <FiPlus size={24} />,
            iconColor: "text-teal-700 dark:text-teal-400",
            bgColor: "bg-teal-50 dark:bg-teal-950/40",
            isLink: true
        }
    ];

    return (
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-16">
            
            <div className="flex items-end justify-between mb-8">
                <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-widest text-[#1aa274] dark:text-emerald-400 uppercase">
                        Explore
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 dark:text-white">
                        Browse by subject
                    </h2>
                </div>
                
                <Link 
                    href="/subjects" 
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#1aa274] hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors group"
                >
                    All subjects 
                    <HiArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {subjectData.map((subject) => {
                    const CardContent = (
                        <div className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center justify-center gap-4 transition-all duration-300 hover:shadow-md hover:scale-[1.01] cursor-pointer h-full">
                            
                            <div className={`w-12 h-12 rounded-xl ${subject.bgColor} ${subject.iconColor} flex items-center justify-center shadow-sm`}>
                                {subject.icon}
                            </div>
                            
                            <div className="space-y-0.5">
                                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                                    {subject.title}
                                </h3>
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                    {subject.count}
                                </p>
                            </div>
                        </div>
                    );

                    return subject.isLink ? (
                        <Link href="/subjects" key={subject.id} className="block h-full">
                            {CardContent}
                        </Link>
                    ) : (
                        <div key={subject.id} className="h-full">
                            {CardContent}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Subjects;