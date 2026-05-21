import React from "react";
import { Card, Button } from "@heroui/react";
import { MapPin, Clock, Building2, AlertCircle } from "lucide-react"; 
import Link from "next/link";
import TutorImage from "./TutorImage";

const TutorCard = async () => {
  let featuredTutors = [];

  try {
  
  const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL;
  
  const res = await fetch(`${baseURL}/tutors`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutors data");
  }

  const data = await res.json();
  
  if (Array.isArray(data)) {
    featuredTutors = data.slice(0, 3);
  }
} catch (error) {
  console.error("❌ TutorCard Fetching Error:", error.message);
}

  const getInitials = (name) => {
    if (!name) return "TR";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getBadgeStyles = (mode) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return {
          bg: "bg-[#eefcf7]",
          text: "text-[#1e6b65]",
          badgeBg: "bg-[#e0f7f0]",
          badgeText: "text-[#1e6b65]",
        };
      case "offline":
        return {
          bg: "bg-[#edf4fc]",
          text: "text-[#2b6cb0]",
          badgeBg: "bg-[#e1eefc]",
          badgeText: "text-[#2b6cb0]",
        };
      case "both":
        return {
          bg: "bg-[#fdf6ed]",
          text: "text-[#b7791f]",
          badgeBg: "bg-[#fbeed9]",
          badgeText: "text-[#b7791f]",
        };
      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-700",
          badgeBg: "bg-slate-200",
          badgeText: "text-slate-700",
        };
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1e6b65]">
            Featured Tutors
          </p>
          <h2 className="text-3xl font-bold text-slate-800 mt-1">
            Available right now
          </h2>
        </div>
        <Link href="/tutors">
          <button className="text-sm font-semibold text-[#1e6b65] hover:underline flex items-center gap-1">
            View all tutors <span className="text-lg">→</span>
          </button>
        </Link>
      </div>

      
      {featuredTutors.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
          <AlertCircle className="text-slate-400 mb-3" size={32} />
          <p className="text-sm font-semibold text-slate-600">Could not load featured tutors</p>
          <p className="text-xs text-slate-400 mt-1">Please ensure the backend server is active and running.</p>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutors.map((tutor) => {
            const styles = getBadgeStyles(tutor.teachingMode);

            return (
              <Card
                key={tutor._id}
                className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow group"
              >
                <div className={`h-48 w-full ${styles.bg} flex items-center justify-center relative overflow-hidden`}>
                  <TutorImage 
                    photoUrl={tutor.photoUrl} 
                    tutorName={tutor.tutorName} 
                    styles={styles} 
                    initials={getInitials(tutor.tutorName)} 
                  />

                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full z-20 ${styles.badgeBg} ${styles.badgeText} shadow-sm`}>
                    {tutor.teachingMode}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {tutor.tutorName}
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-[#1e6b65] bg-[#eefcf7] px-2.5 py-0.5 rounded-full">
                      {tutor.subject}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{tutor.location || "Not Specified"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400" />
                      <span>{tutor.availableSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-slate-400" />
                      <span>
                        {tutor.institution} · {tutor.experience} yrs
                      </span>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[#1e6b65] font-extrabold text-lg">
                        ৳{tutor.hourlyFee}
                        <span className="text-xs font-semibold text-slate-400">
                          /hr
                        </span>
                      </p>
                      <p className="text-[11px] font-medium text-slate-400">
                        {tutor.totalSlots} slots left
                      </p>
                    </div>
                    <Link href={`/tutors/${tutor?._id}`}>
                      <Button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs px-4 py-1.5 rounded-xl transition-all shadow-sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TutorCard;