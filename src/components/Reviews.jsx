"use client";

import React from 'react';
import { IoStar } from 'react-icons/io5';

const Reviews = () => {
    
    const reviewData = [
        {
            id: 1,
            name: "Rahim Sarkar",
            role: "HSC student, Dhaka",
            initials: "RS",
            avatarBg: "bg-[#1aa274]", 
            review: `"Booked my first math session within 5 minutes. The slot system is brilliant — no back-and-forth with the tutor at all."`
        },
        {
            id: 2,
            name: "Nusrat Alam",
            role: "SSC student, Sylhet",
            initials: "NA",
            avatarBg: "bg-[#1d63b8]", 
            review: `"Found a chemistry tutor in Sylhet in under a minute. The filters are spot-on. My grades improved in just 3 weeks."`
        },
        {
            id: 3,
            name: "Amin Khan",
            role: "Tutor, Chittagong",
            initials: "AK",
            avatarBg: "bg-[#784315]", 
            review: `"As a tutor, managing my schedule used to be a nightmare. MediQueue handles all of it automatically. Highly recommended."`
        },
        {
            id: 4,
            name: "Tanvir Ahmed",
            role: "Admission Examinee, Khulna",
            initials: "TA",
            avatarBg: "bg-[#e67e22]",
            review: `"Physics, Chemistry, Math — everything under one platform. Tutors are experienced, and the online sessions run smoothly without lag."`
        },
        {
            id: 5,
            name: "Fariha Islam",
            role: "Parent of Class 8 student, Rajshahi",
            initials: "FI",
            avatarBg: "bg-[#9b59b6]",
            review: `"Finding a trusted offline home tutor in Rajshahi was tough, but MediQueue verified badges made it secure and very simple for us."`
        },
        {
            id: 6,
            name: "Zeeshan Rashid",
            role: "Tutor, Barisal",
            initials: "ZR",
            avatarBg: "bg-[#2c3e50]",
            review: `"The platform helps me connect directly with students who need physics help. Secure hourly payment updates make this platform a top-tier option."`
        }
    ];

    return (
       
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-10">
            
          
            <div className="space-y-1 mb-10">
                <p className="text-xs font-semibold tracking-widest text-[#1aa274] dark:text-emerald-400 uppercase">
                    Student Reviews
                </p>
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight leading-tight text-slate-900 dark:text-white">
                    What <span className="font-serif italic text-slate-700 dark:text-emerald-200">learners</span> say
                </h2>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviewData.map((item) => (
                    <div 
                        key={item.id} 
                        className="bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col justify-between gap-6 transition-all duration-300 hover:shadow-md"
                    >
                       
                        <div className="space-y-4">
                            
                            <div className="flex items-center gap-1 text-[#f5a623]">
                                {[...Array(5)].map((_, i) => (
                                    <IoStar key={i} size={18} />
                                ))}
                            </div>
                            
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal italic leading-relaxed">
                                {item.review}
                            </p>
                        </div>

                     
                        <div className="flex items-center gap-3.5 pt-2">
                            
                            <div className={`w-11 h-11 rounded-xl ${item.avatarBg} text-white flex items-center justify-center text-sm font-bold shadow-sm select-none`}>
                                {item.initials}
                            </div>
                            <div>
                                <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                    {item.name}
                                </h4>
                                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                                    {item.role}
                                </p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Reviews;