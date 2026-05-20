import React from 'react';
import { FiSearch, FiCalendar, FiBookOpen } from 'react-icons/fi';

const MediQueue = () => {
    return (
       
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-10">
            
          
            <div className="w-full bg-[#044e3a] text-white rounded-2xl sm:rounded-3xl px-6 sm:px-12 py-16 text-center relative overflow-hidden shadow-md">
                
                
                <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-emerald-800/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] bg-emerald-950/40 rounded-full blur-2xl pointer-events-none"></div>

                
                <div className="relative z-10 space-y-2 mb-16">
                    <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                        Simple Process
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-tight">
                        How <span className="font-serif italic text-emerald-200">MediQueue</span> works
                    </h2>
                </div>

                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 items-start max-w-5xl mx-auto">
                    
                    
                    <div className="flex flex-col items-center text-center space-y-4 group relative">
                        
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-emerald-600/40 bg-[#033f2f]/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                            <FiSearch size={32} className="text-emerald-300" />
                            
                            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-xs font-bold flex items-center justify-center border border-emerald-700 shadow-sm">1</span>
                        </div>
                        <div className="space-y-2 max-w-xs">
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight">Search & filter</h3>
                            <p className="text-sm text-emerald-100/70 font-light leading-relaxed">
                                Browse tutors by subject, city, price range, or teaching mode. Use our smart filters to find the perfect match.
                            </p>
                        </div>
                    </div>

                    
                    <div className="flex flex-col items-center text-center space-y-4 group relative">
                       
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-emerald-600/40 bg-[#033f2f]/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                            <FiCalendar size={32} className="text-emerald-300" />
                            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-xs font-bold flex items-center justify-center border border-emerald-700 shadow-sm">2</span>
                        </div>
                        <div className="space-y-2 max-w-xs">
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight">Book a session</h3>
                            <p className="text-sm text-emerald-100/70 font-light leading-relaxed">
                                Pick an available time slot and confirm your booking instantly. The system prevents double-bookings automatically.
                            </p>
                        </div>
                    </div>

                    
                    <div className="flex flex-col items-center text-center space-y-4 group relative">
                        
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-emerald-600/40 bg-[#033f2f]/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                            <FiBookOpen size={32} className="text-emerald-300" />
                            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-xs font-bold flex items-center justify-center border border-emerald-700 shadow-sm">3</span>
                        </div>
                        <div className="space-y-2 max-w-xs">
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight">Start learning</h3>
                            <p className="text-sm text-emerald-100/70 font-light leading-relaxed">
                                Receive your digital session token and join your class online or meet your tutor offline — your choice.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default MediQueue;