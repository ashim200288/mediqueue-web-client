import React from 'react';
import BookingForm from "./BookingForm";

const DetailsPage = async ({ params }) => {
    
    const { id } = await params;

    const serverUrl = process.env.NEXT_PUBLIC_API_UR || "http://localhost:5000";

    const res = await fetch(`${serverUrl}/tutors/${id}`, {
        cache: 'no-store'
    });
    
    if (!res.ok) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center text-red-500 font-bold mt-20">
                ❌ Failed to load tutor details. Please check if your Express Server is running on Port 5000!
            </div>
        );
    }

    const tutor = await res.json();

    
    const { 
        _id,
        tutorName = "Tutor Name", 
        subject = "Subject", 
        teachingMode = "Online", 
        hourlyFee = 0, 
        totalSlots = 0, 
        institution = "Institution", 
        experience = 0, 
        location = "Location",
        sessionStartDate 
    } = tutor || {};


    const getInitials = (name) => {
        if (!name || name === "Tutor Name") return "TR";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            
            
            <div className="bg-[#eefcf7] p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-[#e0f7f0]">
                <div className="w-20 h-20 bg-[#a2e1cc] rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <span className="text-2xl font-black text-[#1e6b65]">
                        {getInitials(tutorName)}
                    </span>
                </div>

                <div className="space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h1 className="text-2xl font-bold text-[#1e6b65]">{tutorName}</h1>
                        <span className="text-xs font-bold text-slate-500 bg-white/80 border border-slate-200 px-3 py-1 rounded-lg">
                            🔢 Slots Left: {totalSlots}
                        </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500">
                        🏢 {institution} · {experience} yrs exp.
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                        📍 {location}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-[#1e6b65] border border-slate-100">
                            {subject}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-blue-600 border border-slate-100">
                            {teachingMode}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#fbeed9] text-[#b7791f]">
                            ৳{hourlyFee}/hr
                        </span>
                    </div>
                </div>
            </div>

          
            <BookingForm 
                tutorId={_id || id} 
                tutorName={tutorName} 
                totalSlots={totalSlots} 
                sessionStartDate={sessionStartDate}
            />

        </div>
    );
};

export default DetailsPage;