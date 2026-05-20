"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { IoSearchOutline, IoHelpCircleOutline, IoArrowBack, IoArrowForward, IoSchoolOutline, IoFlashOutline } from 'react-icons/io5';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

   
    const slides = [
        {
            tag: "✨ Bangladesh's top tutor booking platform",
            title: <>Learn smarter with <br /> <span className="italic font-serif font-light text-emerald-300">expert tutors</span> <br /> near you</>,
            desc: "Browse hundreds of verified tutors across 20+ subjects. Book sessions online or offline — no scheduling conflicts, ever.",
            stats: [
                { val: "1,240+", label: "Verified tutors" },
                { val: "8,500+", label: "Sessions booked" },
                { val: "20+", label: "Subjects" }
            ],
            tutor: {
                name: "Arif Rahman",
                sub: "Mathematics · Dhaka",
                price: "৳500",
                tag: "⭐ Top rated",
                days: ["Sun 5 PM", "Mon 5 PM", "Tue 5 PM", "Thu 5 PM"]
            }
        },
        {
            tag: "📚 Academic Excellence",
            title: <>Master Science & <br /> <span className="italic font-serif font-light text-blue-300">Engineering</span> <br /> masterclass</>,
            desc: "Get specialized coaching for BUET, Medical and Varsity admission from students who have already cracked the code.",
            stats: [
                { val: "450+", label: "Admission Experts" },
                { val: "98%", label: "Success Rate" },
                { val: "Admission", label: "Specialty" }
            ],
            tutor: {
                name: "Nusrat Jahan",
                sub: "Chemistry · BUET",
                price: "৳800",
                tag: "🔥 Most Popular",
                days: ["Fri 10 AM", "Sat 10 AM", "Mon 7 PM", "Wed 7 PM"]
            }
        },
        {
            tag: "💼 Skill Development",
            title: <>Build your <br /> <span className="italic font-serif font-light text-amber-300">Future Career</span> <br /> with ICT & English</>,
            desc: "From Spoken English to advanced Web Development — learn from industry professionals and university lecturers.",
            stats: [
                { val: "150+", label: "Pro Trainers" },
                { val: "12,000+", label: "Certificates" },
                { val: "ICT", label: "Focus" }
            ],
            tutor: {
                name: "S.M. Tanvir",
                sub: "ICT · Professional",
                price: "৳600",
                tag: "🏆 Certified",
                days: ["Sat 9 PM", "Sun 9 PM", "Tue 9 PM", "Wed 9 PM"]
            }
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];

    return (
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-10">
            <div className="w-full min-h-[calc(100vh-6rem)] bg-[#044e3a] text-white flex flex-col justify-between relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-500">
                
               
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-800/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-950/40 rounded-full blur-2xl pointer-events-none"></div>

               
                <div key={currentSlide} className="w-full px-6 sm:px-10 lg:px-16 pt-12 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto animate-in fade-in duration-700">
                    
                    
                    <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                        <div className="inline-flex items-center gap-2 bg-emerald-800/40 border border-emerald-700/50 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
                            <span className="text-emerald-400">⚡</span> {slide.tag}
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.15]">
                                {slide.title}
                            </h1>
                        </div>

                        <p className="text-base sm:text-lg text-emerald-100/80 max-w-xl font-light leading-relaxed">
                            {slide.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Button 
                                as={Link} href="/tutors"
                                className="bg-transparent hover:bg-emerald-800/30 text-white font-medium px-6 py-3 rounded-lg border border-emerald-600/80 flex items-center gap-2 text-sm transition-all focus:outline-none"
                            >
                                <IoSearchOutline size={18} /> Find a tutor
                            </Button>
                            <Button 
                                className="bg-transparent hover:bg-emerald-800/20 text-emerald-200 hover:text-white font-medium px-6 py-3 rounded-lg border border-transparent flex items-center gap-2 text-sm transition-all focus:outline-none"
                            >
                                <IoHelpCircleOutline size={18} /> How it works
                            </Button>
                        </div>

                        
                        <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-emerald-800/60 max-w-lg">
                            {slide.stats.map((st, i) => (
                                <div key={i} className="space-y-1">
                                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{st.val}</h3>
                                    <p className="text-xs text-emerald-200/60 uppercase tracking-wider">{st.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div className="lg:col-span-5 flex justify-center lg:justify-end w-full relative">
                        <div className="bg-white text-slate-800 w-full max-w-[340px] rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col justify-between gap-5 transition-all duration-300 hover:scale-[1.02]">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 rounded-md px-2.5 py-1 text-xs font-semibold">
                                    <span>⭐</span> {slide.tutor.tag}
                                </div>

                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{slide.tutor.name}</h2>
                                    <p className="text-xs font-medium text-slate-400">{slide.tutor.sub}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    {slide.tutor.days.map((day, i) => (
                                        <div key={i} className="border border-emerald-100 rounded-lg p-2 text-center text-xs font-semibold text-emerald-700 bg-emerald-50/30">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                                <div className="flex items-baseline">
                                    <span className="text-xl font-bold text-slate-900">{slide.tutor.price}</span>
                                    <span className="text-xs text-slate-400 font-medium">/hr</span>
                                </div>
                                <Button 
                                    as={Link} href="/tutors"
                                    className="bg-transparent hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-300 hover:border-slate-900 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all shadow-sm focus:outline-none"
                                >
                                    Book now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="w-full bg-[#033f2f]/60 backdrop-blur-sm py-4 border-t border-emerald-800/40 relative z-20">
                    <div className="px-6 sm:px-10 lg:px-16 flex items-center justify-between text-xs sm:text-sm font-medium text-emerald-200/80">
                        
                        <div>Slide {currentSlide + 1} of {slides.length}</div>

                        <div className="flex items-center gap-2">
                            {slides.map((_, i) => (
                                <span 
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`cursor-pointer rounded-full transition-all duration-300 ${currentSlide === i ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-emerald-700"}`}
                                ></span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={prevSlide} className="p-2 border border-emerald-700 rounded-lg bg-[#033f2f] hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors focus:outline-none">
                                <IoArrowBack size={16} />
                            </button>
                            <button onClick={nextSlide} className="p-2 border border-emerald-700 rounded-lg bg-[#033f2f] hover:bg-emerald-800 text-emerald-300 hover:text-white transition-colors focus:outline-none">
                                <IoArrowForward size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;