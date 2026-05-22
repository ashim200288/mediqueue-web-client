"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function MyBookingsPage() {
    
    const [user] = useState({ email: "student@mail.com", displayName: "Rahim Sarkar" });
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyBookings = async () => {
        if (!user?.email) return;
        try {
            const serverUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await axios.get(`${serverUrl}/my-bookings?email=${user.email}`);
            setBookings(res.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            toast.error("Failed to load your bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, [user?.email]);

    const handleCancelBooking = async (bookingId) => {
        
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this booked session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#1e6b65",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it"
        });

        if (result.isConfirmed) {
            try {
                const serverUrl = process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_SERVER_URL}`;
                
                const res = await axios.delete(`${serverUrl}/api/bookings/${bookingId}`);

                if (res.data.success) {
                    Swal.fire({
                        title: "Cancelled! 🎉",
                        text: "Your session has been cancelled and the slot is freed.",
                        icon: "success",
                        confirmButtonColor: "#1e6b65"
                    });
                    
                    setBookings(prev => prev.filter(booking => booking._id !== bookingId));
                }
            } catch (err) {
                console.error("Cancel error:", err);
                const errMsg = err.response?.data?.message || "Something went wrong.";
                toast.error(errMsg);
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-center text-slate-500 font-medium mt-20">
                🔄 Loading your booked sessions...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1e6b65]">My Booked Sessions</h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Manage and review all your upcoming appointments with tutors.
                    </p>
                </div>
                <div className="bg-[#eefcf7] border border-[#e0f7f0] px-4 py-2 rounded-xl text-right shrink-0">
                    <p className="text-xs font-bold text-[#1e6b65]">{user.displayName}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-[#fcfbf7] border border-[#f5f2e9] rounded-2xl p-12 text-center space-y-2">
                    <p className="text-slate-600 font-semibold">You haven't booked any sessions yet.</p>
                    <p className="text-xs text-slate-400">Explore tutors and lock your schedule today!</p>
                </div>
            ) : (
                <div className="overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-[#eefcf7] text-[#1e6b65] font-semibold border-b border-[#e0f7f0]">
                                <th className="p-4">Tutor Name</th>
                                <th className="p-4">Session Token</th>
                                <th className="p-4">Date & Time Slot</th>
                                <th className="p-4">Phone Number</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-medium text-slate-800">
                                        {booking.tutorName || "Unknown Tutor"}
                                    </td>
                                    
                                    <td className="p-4">
                                        <span className="bg-slate-100 px-2.5 py-1 rounded text-red-600 font-mono font-bold text-xs">
                                            {booking.sessionToken || "N/A"}
                                        </span>
                                    </td>
                                    
                                    <td className="p-4 text-slate-600 text-xs">
                                        {booking.bookedSlot 
                                            ? new Date(booking.bookedSlot).toLocaleString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                              })
                                            : "Not specified"
                                        }
                                    </td>
                                    
                                    <td className="p-4 text-slate-600 font-mono text-xs">
                                        {booking.phone || "N/A"}
                                    </td>
                                    
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            {booking.bookingStatus || "Booked"}
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}