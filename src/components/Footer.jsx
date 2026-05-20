"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdOutlineMedicalServices } from 'react-icons/md';

const Footer = () => {
    return (
        
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-4 mb-10">
            
           
            <div className="w-full bg-[#1aa274] text-white rounded-t-2xl sm:rounded-t-3xl px-6 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
                        Ready to start learning?
                    </h2>
                    <p className="text-sm text-emerald-50/80 font-light">
                        Join 10,000+ students already booking smarter on MediQueue.
                    </p>
                </div>
                <Button
                    as={Link}
                    href="/register"
                    className="bg-transparent hover:bg-slate-900/10 text-slate-950 font-semibold px-6 py-2.5 rounded-xl border border-slate-950/20 text-sm transition-all focus:outline-none"
                >
                    Get started free
                </Button>
            </div>

            
            <div className="w-full bg-[#044e3a] text-white rounded-b-2xl sm:rounded-b-3xl px-6 sm:px-12 pt-16 pb-8 border-t border-emerald-800/40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/60">
                    
                    
                    <div className="md:col-span-5 space-y-5">
                        <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                            <div className="p-2 bg-[#1aa274] rounded-lg text-white flex items-center justify-center">
                                <MdOutlineMedicalServices size={20} />
                            </div>
                            <span className="font-serif">MediQueue</span>
                        </div>
                        <p className="text-sm text-emerald-100/70 font-light leading-relaxed max-w-sm">
                            Bangladesh's smartest tutor booking platform. Connecting students with expert tutors since 2025.
                        </p>
                       
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="p-2.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white rounded-lg transition-colors border border-emerald-800/40">
                                <FaFacebookF size={16} />
                            </a>
                            <a href="#" className="p-2.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white rounded-lg transition-colors border border-emerald-800/40">
                                <FaXTwitter size={16} />
                            </a>
                            <a href="#" className="p-2.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white rounded-lg transition-colors border border-emerald-800/40">
                                <FaInstagram size={16} />
                            </a>
                            <a href="#" className="p-2.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white rounded-lg transition-colors border border-emerald-800/40">
                                <FaYoutube size={16} />
                            </a>
                        </div>
                    </div>

                   
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Learning</h4>
                        <ul className="space-y-2 text-sm text-emerald-100/70 font-light">
                            <li><Link href="/tutors" className="hover:text-white transition-colors">Browse tutors</Link></li>
                            <li><Link href="/subjects" className="hover:text-white transition-colors">All subjects</Link></li>
                            <li><Link href="/online" className="hover:text-white transition-colors">Online sessions</Link></li>
                            <li><Link href="/offline" className="hover:text-white transition-colors">Offline sessions</Link></li>
                        </ul>
                    </div>

                    
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">For tutors</h4>
                        <ul className="space-y-2 text-sm text-emerald-100/70 font-light">
                            <li><Link href="/become-tutor" className="hover:text-white transition-colors">Become a tutor</Link></li>
                            <li><Link href="/profile" className="hover:text-white transition-colors">Add your profile</Link></li>
                            <li><Link href="/manage" className="hover:text-white transition-colors">Manage sessions</Link></li>
                            <li><Link href="/guidelines" className="hover:text-white transition-colors">Tutor guidelines</Link></li>
                        </ul>
                    </div>

                    
                    <div className="md:col-span-3 space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Contact</h4>
                        <ul className="space-y-2 text-sm text-emerald-100/70 font-light tracking-wide">
                            <li className="hover:text-white transition-colors break-all">support@mediqueue.app</li>
                            <li>+880 1700 000000</li>
                            <li>Dhaka, Bangladesh</li>
                        </ul>
                    </div>

                </div>

               
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-emerald-200/60">
                    <div>
                        © 2025 MediQueue. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of use</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie policy</Link>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Footer;