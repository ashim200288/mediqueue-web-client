"use client";
import React, { useState, useEffect } from 'react';
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';

export default function BookingForm({ tutorId, tutorName, totalSlots: initialSlots, sessionStartDate }) {
    
    const [user] = useState({ email: "student@mail.com", displayName: "Rahim Sarkar" });
    
    const [currentSlots, setCurrentSlots] = useState(initialSlots);
    const [phone, setPhone] = useState("");
    const [studentName, setStudentName] = useState(user?.displayName || "");
    const [submitting, setSubmitting] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    
    useEffect(() => {
        setCurrentSlots(initialSlots);
    }, [initialSlots]);

    const currentDate = new Date();
    const sessionDate = sessionStartDate ? new Date(sessionStartDate) : null;

    
    const isSlotsZero = currentSlots <= 0;
    const isDateEarly = sessionDate ? currentDate < sessionDate : false;
    const isBookingBlocked = isSlotsZero || isDateEarly;

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (isSlotsZero) {
            toast.error("This session is fully booked. You can’t join at the moment.");
            return;
        }
        if (isDateEarly) {
            toast.error("Booking is not available yet for this tutor");
            return;
        }

        setSubmitting(true);
        try {
            
            const bookingPayload = {
                studentName,
                phone,
                tutorId: tutorId, 
                tutorName,
                studentEmail: user?.email,
                bookingStatus: "Booked", // Auto Generated
                bookedSlot: selectedDateTime.toISOString()
            };

            const serverUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            
            
            const res = await axios.post(`${serverUrl}/api/bookings`, bookingPayload);
            
            if (res.data.success) {
                
                setCurrentSlots(prev => Math.max(0, prev - 1));

                
                await Swal.fire({
                    title: "Session Booked Successfully! 🎉",
                    html: `
                        <div class="text-left space-y-2 text-sm">
                            <p><b>Tutor Name:</b> ${tutorName}</p>
                            <p><b>Token:</b> <span class="bg-slate-100 px-2 py-0.5 rounded text-red-600 font-mono font-bold">${res.data.sessionToken}</span></p>
                            <p><b>Time Slot:</b> ${selectedDateTime.toLocaleString()}</p>
                        </div>
                    `,
                    icon: "success",
                    confirmButtonColor: "#1e6b65"
                });

                setPhone("");
            }
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Booking failed. Please try again.";
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-[#fcfbf7] p-6 rounded-2xl border border-[#f5f2e9] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Book a Session
            </h3>

            
            {isSlotsZero ? (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold">
                    ❌ No available slots left. This session is fully booked. You can’t join at the moment.
                </div>
            ) : isDateEarly ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl text-xs font-bold">
                    🕒 Booking is not available yet for this tutor. (Opens after session start date)
                </div>
            ) : null}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Student Name</label>
                        <Input 
                            type="text" 
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            variant="flat"
                            required
                            disabled={isBookingBlocked}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Phone</label>
                        <Input 
                            type="tel" 
                            placeholder="+8801XXXXXXXXX" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            variant="flat"
                            required
                            disabled={isBookingBlocked}
                        />
                    </div>
                </div>

                
                <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">Select Date & Time Slot</label>
                    <DatePicker
                        selected={selectedDateTime}
                        onChange={(date) => setSelectedDateTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        disabled={isBookingBlocked}
                        minDate={new Date()}
                        className="w-full px-3 py-2 bg-[#f4f4f5] text-sm text-slate-900 rounded-xl outline-none h-10 border-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    />
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Tutor ID (auto)</label>
                        <Input 
                            type="text" 
                            value={tutorId ? `#${tutorId.slice(-6).toUpperCase()}` : "#TUT001"} 
                            readOnly
                            variant="faded"
                            className="opacity-80"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Tutor Name (auto)</label>
                        <Input 
                            type="text" 
                            value={tutorName} 
                            readOnly
                            variant="faded"
                            className="opacity-80"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 block mb-1">Student Email (auto)</label>
                        <Input 
                            type="email" 
                            value={user?.email} 
                            readOnly
                            variant="faded"
                            className="opacity-80"
                        />
                    </div>
                </div>

                
                <Link href="/my-bookings">
                <Button 
                    type="submit" 
                    isLoading={submitting}
                    disabled={isBookingBlocked}
                    className={`w-full font-bold text-sm py-3 rounded-xl transition-all shadow-sm mt-2 ${
                        isBookingBlocked 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                    {isSlotsZero 
                        ? "No Slots Available" 
                        : isDateEarly 
                        ? "Booking Not Allowed Yet" 
                        : "Confirm Booking"}
                </Button>
                </Link>
            </form>
        </div>
    );
}